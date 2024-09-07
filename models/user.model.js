const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      enum: ["admin", "resident", "customer-support"],
      required: true,
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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
