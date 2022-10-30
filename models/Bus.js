import { model, Schema } from "mongoose";

const busSchema = new Schema({
   type: String,
   status: String,
   numberOfPassengers: Number,
   numberOfSeats: Number,
   createdAt: String,
   //  origin: String,
   //  destination: String,
   //  duration: String,
   //  leavingDate: String,
   //  returningDate: String,
});

export default model("Bus", busSchema);
