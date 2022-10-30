import { model, Schema } from "mongoose";

const tripSchema = new Schema({
   destination: String,
   arrival: String,
   duration: String,
   luggage: String,
});

export default model("Trip", tripSchema);
