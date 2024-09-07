import mongoose from "mongoose";
import { Schema } from "mongoose";

const billSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Bill", billSchema);
