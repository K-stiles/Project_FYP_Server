import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server-express";

import User from "../../models/User.js";
import {
   validateRegisterInput,
   validateLoginInput,
} from "../../utils/validators.js";

function generateToken(user) {
   return jwt.sign(
      {
         id: user.id,
         email: user.email,
         firstName: user.firstName,
         lastName: user.lastName,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
   );
}

const user = {
   Query: {
      users: async () => {
         try {
            const user = await User.find().sort({ createdAt: -1 });
            // console.log(user);
            return user;
         } catch (err) {
            throw new Error(err);
         }
      },
      user: async (_, { userId }) => {
         try {
            // console.log(userId);
            const user = await User.findById(userId);
            // console.log(user);
            if (user) {
               return user;
            } else {
               throw new Error("User not found");
            }
         } catch (err) {
            throw new Error(err);
         }
      },
   },
   Mutation: {
      loginUser: async (_, { input: { email, password } }) => {
         //validating user input data
         const { errors, valid } = validateLoginInput(email, password);
         if (!valid) {
            throw new UserInputError("Errors", { errors });
         }

         //finding user in DB
         const user = await User.findOne({ email });
         // console.log(user);
         if (!user) {
            errors.general = "User not found";
            throw new UserInputError("User not found", { errors });
         }

         // comparing passwords
         const match = bcrypt.compareSync(password, user.password);
         if (!match) {
            errors.general = "Wrong crendetials";
            throw new UserInputError("Wrong crendetials", { errors });
         }

         const token = generateToken(user);

         return {
            user,
            token,
         };
      },
      createUser: async (_, { input }) => {
         const { firstName, lastName, email, password, phone } = input;
         // Validate user data
         const { valid, errors } = validateRegisterInput(
            firstName,
            lastName,
            email,
            password,
            phone
         );

         if (!valid) {
            throw new UserInputError("Errors", { errors });
         }
         //Make sure user doesnt already exist
         const existingUser = await User.findOne({ email });
         if (existingUser) {
            throw new UserInputError("Email is taken", {
               errors: {
                  email: "This Email is taken",
               },
            });
         }
         // hash password and create an auth token
         const salt = bcrypt.genSaltSync(10);
         const hashedPassword = bcrypt.hashSync(password, salt);

         //Save user to DB
         const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            createdAt: new Date().toISOString(),
            street: null,
            city: null,
            zip: null,
         });

         const user = await newUser.save();

         const token = generateToken(user);

         return {
            ...user._doc,
            id: user._id,
            token,
         };
      },
      // updateUser: (_, { userId }) => {
      //      // const{}=input
      //      //validate user input data
      //      //finding user in DB
      //      //update
      //      //save to DB
      //      //return to User
      // },
      // deleteUser: (_, { userId }) => {
      //      // const{}=input
      //      //validate user input data
      //      //finding user in DB
      //      //update
      //      //save to DB
      //      //return to User
      // },
   },
};

export default user;
