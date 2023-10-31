const mongoose = require('mongoose');
const User = require('./UserModel');

const classSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  reserved: {
    type: Boolean,
    required: true,
    default: false,
  },
  comment: {
    type: String,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
}, {
  timestamps: true,
});

const Class = mongoose.model("Class", classSchema);

User.watch().on("change", (data) => {
  if(data.operationType === "update"){
    io.emit("reload redux");
  }
})

module.exports = Class;