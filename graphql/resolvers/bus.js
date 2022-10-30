import Bus from "../../models/Bus.js";

const bus = {
   Query: {
      getBuses: async () => {
         try {
            const bus = await Bus.find();
            return bus;
         } catch (error) {
            throw new Error(error);
         }
      },
      getBus: async (_, { busId }) => {
         try {
            const bus = await Bus.findById(busId);
            if (!bus) {
               throw new Error("bus not found");
            } else {
               return bus;
            }
         } catch (error) {
            throw new Error(error);
         }
      },
   },
   Mutation: {
      createBus: async (_, { input }) => {
         const { type, status, numberOfPassengers, numberOfSeats } = input;
         try {
            const newBus = new Bus({
               type,
               status,
               numberOfPassengers,
               numberOfSeats,
               createdAt: new Date().toISOString(),
            });
            const bus = await newBus.save();

            return bus;
         } catch (error) {
            throw new Error(error);
         }
      },
   },
};
export default bus;
