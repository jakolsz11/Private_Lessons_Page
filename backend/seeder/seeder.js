const connectDB = require('../config/db');

connectDB();

const userData = require('./users');
const classData = require('./classes');

const User = require('../models/UserModel');
const Class = require('../models/ClassModel');

const importData = async () => {
  try{
    await User.collection.deleteMany({});
    await Class.collection.deleteMany({});

    if(process.argv[2] !== "-d"){
      await User.insertMany(userData);
      await Class.insertMany(classData);

      console.log("Seeder data imported SUCCESSFULLY!");
      process.exit();
      return;
    }

    console.log("Seeder data DELETED successfully!");
    process.exit();
  }catch(error){
    console.log("Error while processing seeder data", error);
    process.exit(1);
  }
};

importData();