import userResolvers from "./user.js";
import reservationResolvers from "./reservations.js";
import busResolvers from "./bus.js";
import busStationResolvers from "./busStation.js";

const resolvers = {
   Query: {
      ...userResolvers.Query,
      ...reservationResolvers.Query,
      ...busResolvers.Query,
      ...busStationResolvers.Query,
   },
   Mutation: {
      ...userResolvers.Mutation,
      ...reservationResolvers.Mutation,
      ...busResolvers.Mutation,
      ...busStationResolvers.Mutation,
   },
};

export default resolvers;
