import { gql } from "apollo-server-express";

const typeDefs = gql`
   type User {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      street: String
      city: String
      zip: String
      createdAt: String!
      userReservations: [String]
      img: String
   }

   type AuthPayload {
      user: User
      token: String!
   }

   input RegistrationInput {
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      phone: String!
   }
   input LoginInput {
      email: String!
      password: String!
   }

   type BusStation {
      id: ID!
      pickupRegion: String
      dropPointRegion: String
      pickupTown: String
      dropPointTown: String
      distance: Int
      duration: Int
      timeToLeave: String
      timeToReturn: String
      createdAt: String
   }
   input BusStationInput {
      pickupRegion: String
      pickupTown: String
      dropPointRegion: String
      dropPointTown: String
      distance: Int
      duration: Int
      timeToLeave: String
      timeToReturn: String
   }

   type Bus {
      id: ID!
      busType: String
      busStatus: String
      createdAt: String
      seatsFilled: Int
      busStop: String
      numberOfPassengers: Int
      numberOfSeats: Int
      userId: ID!
      username: String
   }
   input BusInput {
      busType: String
      busStatus: String
      numberOfPassengers: Int
      numberOfSeats: Int
      seatsFilled: Int
   }

   type Reservation {
      id: ID!
      type: String
      origin: String
      destination: String
      duration: String
      leavingDate: String
      returningDate: String
      luggages: Int

      paymentMethod: String
      groupNumber: Int
      adults: Int
      children: Int
      seniors: Int

      userId: String
      username: String
      bus: [Bus]
      createdAt: String
   }

   input ReservationInput {
      type: String
      origin: String
      destination: String
      duration: Int
      leavingDate: String
      returningDate: String
      luggages: Int

      paymentMethod: String
      groupNumber: Int
      adults: Int
      children: Int
      seniors: Int

      bus: [BusInput]
   }

   type Query {
      user(userId: ID!): User
      users: [User]!
      getReservation(reservationId: ID!): Reservation!
      getReservations: [Reservation]!
      getBus(busId: ID!): Bus
      getBuses: [Bus]

      busStation(busStationId: ID!): BusStation
      busStations(
         pickupTown: String
         dropPointTown: String
         limit: Int
      ): [BusStation]
   }

   type Mutation {
      # USER
      createUser(input: RegistrationInput): User!
      loginUser(input: LoginInput): AuthPayload!
      # updateUser(userId:ID!):User!
      # deleteUser(userId:ID!):User!

      #  RESERVATIONS
      createReservation(input: ReservationInput): Reservation!
      updateReservation(
         reservationId: ID!
         input: ReservationInput
      ): Reservation!
      deleteReservation(reservationId: ID!): Reservation!

      #  BUS
      createBus(input: BusInput): Bus!

      #  BUS STATION
      createBusStation(input: BusStationInput): BusStation!
      updateBusStation(busStationId: ID!): BusStation!
      deleteBusStation(busStationId: ID!): BusStation!
   }
`;

export default typeDefs;
