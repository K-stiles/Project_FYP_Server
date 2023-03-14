import { model, Schema } from "mongoose";

const BusSchema = new Schema({
  userId: String,
  username: String,
  busType: String,
  busStatus: { type: String, default: "loading" },
  seatsFilled: Number,
  createdAt: String,
  busStop: String,
  numberOfPassengers: Number,
  numberOfSeats: { type: Number, default: 100 },
});

const reservationSchema = new Schema({
  type: String,
  origin: String,
  destination: String,
  duration: Number,
  leavingDate: String,
  returningDate: String,
  luggages: Number,

  paymentMethod: String,
  groupNumber: Number,
  adults: Number,
  children: Number,
  seniors: Number,

  userId: String,
  username: String,

  bus: [BusSchema],
  user: { type: Schema.Types.ObjectId, ref: "User" },

  createdAt: String,
});

export default model("Reservation", reservationSchema);
