const connectDB = require('../config/db');

connectDB();

const userData = require('./users');
const classData = require('./classes');

const User = require('../models/UserModel');
const Class = require('../models/ClassModel');

const importData = async () => {
  try {
    if (process.argv[2] === "-a") { //all
      await User.collection.deleteMany({});
      await Class.collection.deleteMany({});

      await User.insertMany(userData);
      await Class.insertMany(classData);

      console.log("Seeder data imported SUCCESSFULLY!");
      process.exit();

    }
    else if(process.argv[2] === "-d"){ //delete all

      await User.collection.deleteMany({});
      await Class.collection.deleteMany({});

      console.log("Seeder data DELETED SUCCESSFULLY!");
      process.exit();
    }
    else{
      await Class.collection.deleteMany({});

      await Class.insertMany(classData);

      console.log("Seeder data for classes imported SUCCESSFULLY!");
      process.exit();

    }

  } catch (error) {
    console.log("Error while processing seeder data", error);
    process.exit(1);
  }
};

importData();