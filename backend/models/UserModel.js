const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
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
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    notifications: [
      {
        date: { type: String, required: true },
        time: { type: String, required: true },
        person: { type: String, required: true },
        title: { type: String, required: true },
        read: { type: Boolean, required: true, default: false },
        createTime: {type: String, required: true}
      },
    ],
    notificationsCounter: { 
      type: Number, 
      required: true, 
      default: 0 
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
