import userResolvers from "./user.js";

const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
};

export default resolvers;
