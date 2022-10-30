import { model, Schema } from "mongoose";

const busStationSchema = new Schema(
   {
      pickupRegion: String,
      dropPointRegion: String,
      pickupTown: String,
      dropPointTown: String,
      distance: Number,
      duration: Number,
      timeToLeave: String,
      timeToReturn: String,
   },
   { timestamps: true }
);

export default model("BusStation", busStationSchema);
