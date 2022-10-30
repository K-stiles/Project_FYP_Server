import { AuthenticationError } from "apollo-server-express";
import Reservation from "../../models/Reservation.js";
import checkUserAuth from "../../utils/checkUserAuth.js";

const reservation = {
   Query: {
      getReservation: async (_, { reservationId }) => {
         try {
            const reservation = await Reservation.findById(reservationId);
            if (!reservation) {
               throw new Error("reservation not found");
            } else {
               return reservation;
            }
         } catch (error) {
            throw new Error(error);
         }
      },
      getReservations: async () => {
         try {
            const reservations = await Reservation.find();
            return reservations;
         } catch (error) {
            throw new Error(error);
         }
      },
   },
   Mutation: {
      createReservation: async (_, { input }, context) => {
         const user = checkUserAuth(context);
         const username = user.firstName.concat(" ", user.lastName);
         // console.log("input", input);

         const {
            type,
            origin,
            destination,
            leavingDate,
            duration,
            returningDate,
            luggages,
            paymentMethod,
            groupNumber,
            adults,
            children,
            seniors,
            bus: [
               {
                  busType,
                  busStatus,
                  seatsFilled,
                  numberOfPassengers,
                  numberOfSeats,
               },
            ],
         } = input;

         try {
            const newResevation = new Reservation({
               type,
               origin,
               destination,
               leavingDate,
               returningDate,
               numberOfPassengers,
               luggages,
               userId: user.id,
               username,
               duration,
               paymentMethod,
               groupNumber,
               adults,
               children,
               seniors,

               bus: [
                  {
                     userId: user.id,
                     username,
                     busType,
                     busStatus,
                     seatsFilled,
                     busStop: "reservation resolver",
                     numberOfPassengers,
                     numberOfSeats,
                     createdAt: new Date().toISOString(),
                  },
               ],
               createdAt: new Date().toISOString(),
            });
            const resevation = await newResevation.save();

            return resevation;
         } catch (error) {
            throw new Error(error);
         }
      },
      deleteReservation: async (_, { reservationId }, context) => {
         const user = checkUserAuth(context);
         const username = user.firstName.concat(" ", user.lastName);

         try {
            const reservation = await Reservation.findById(reservationId);
            if (username === reservation.username) {
               await reservation.delete();
               return "Reservation deleted successfully";
            } else {
               throw new AuthenticationError("Action not allowed");
            }
         } catch (err) {
            throw new Error(err);
         }
      },
      updateReservation: async (_, { reservationId, input }, context) => {
         checkUserAuth(context);
         try {
            const reservation = await Reservation.findByIdAndUpdate(
               reservationId,
               input,
               { new: true }
            );
            return reservation;
         } catch (err) {
            throw new Error(err);
         }
      },
   },
};

export default reservation;
