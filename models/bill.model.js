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
});

const Bill = mongoose.model("Bill", billSchema);

export default Bill;
