import { model, Schema } from "mongoose";

const userSchema = new Schema({
   firstName: String,
   lastName: String,
   email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },

   phone: String,
   createdAt: String,
   street: String,
   city: String,
   zip: String,
   userReservations: [
      {
         type: Schema.Types.ObjectId,
         ref: "reservations",
      },
   ],

   img: String,
});

export default model("User", userSchema);
