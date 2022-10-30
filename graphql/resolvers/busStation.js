import BusStation from "../../models/BusStation.js";

const busStation = {
   Query: {
      busStations: async (_, { pickupTown, dropPointTown, limit }) => {
         try {
            const stations = await BusStation.find({
               $and: [{ pickupTown }, { dropPointTown }],
            }).limit(limit);
            return stations;
         } catch (error) {
            throw new Error(error);
         }
      },
      busStation: async (_, { busStationId }) => {
         try {
            const busStation = await BusStation.findById(busStationId);
            if (!busStation) {
               throw new Error("bus not found");
            } else {
               return busStation;
            }
         } catch (error) {
            throw new Error(error);
         }
      },
   },
   Mutation: {
      createBusStation: async (_, { input }) => {
         const {
            pickupRegion,
            pickupTown,
            dropPointRegion,
            dropPointTown,
            distance,
            duration,
            timeToLeave,
            timeToReturn,
         } = input;

         try {
            const newBusStation = new BusStation({
               pickupRegion,
               pickupTown,
               dropPointRegion,
               dropPointTown,
               distance,
               duration,
               timeToLeave,
               timeToReturn,
            });
            const busStation = await newBusStation.save();

            return busStation;
         } catch (error) {
            throw new Error(error);
         }
      },
      // updateBusStation: async (_, { busStationId }) => {
      //    try {
      //       const busStation = BusStation.findByIdAndUpdate(busStationId, {});

      //       return busStation;
      //    } catch (error) {
      //       throw new Error(error);
      //    }
      // },
      // deleteBusStation: async (_, { busStationId }) => {
      //    try {
      //       BusStation.findByIdAndDelete(busStationId);
      //       return busStation;
      //    } catch (error) {
      //       throw new Error(error);
      //    }
      // },
   },
};
export default busStation;
