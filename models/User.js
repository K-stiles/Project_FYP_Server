import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    street: String,
    city: String,
    zip: String,
    userReservations: [],

    profile: String,
    role: {
      type: Number,
      default: 2000,
      enum: [3000, 2500, 2000],
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

export default model("User", userSchema);
