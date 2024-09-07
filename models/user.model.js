// import mongoose from "mongoose";
// import { Schema } from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   role: {
//     enum: ["admin", "resident", "customer-support"],
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// export default User = new mongoose.model("User", userSchema);

import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "resident", "customer-support"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
