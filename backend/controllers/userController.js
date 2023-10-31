const User = require("../models/UserModel");
const Class = require("../models/ClassModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ isAdmin: -1, name: 1 });
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("name lastName email phoneNumber isAdmin")
      .orFail();
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();

    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    if (!comparePasswords(req.body.password, user.password)) {
      user.password = hashPassword(req.body.password);
    }

    await user.save();

    return res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
        notifications: user.notifications,
        notificationsCounter: user.notificationsCounter,
      },
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, lastName, email, phoneNumber, password } = req.body;
    if (!name || !lastName || !email || !phoneNumber || !password) {
      return res.status(400).send("All inputs are required!");
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).send("user exists");
    } else {
      const user = await User.create({
        name: name,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: hashPassword(password),
        notifications: [],
      });

      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.phoneNumber,
            user.isAdmin,
            user.notifications,
            user.notificationsCounter
          ),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        )
        .status(201)
        .json({
          success: "user created",
          userCreated: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            notifications: user.notifications,
            notificationsCounter: user.notificationsCounter,
          },
        });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!email || !password) {
      return res.status(400).send("All inputs are required");
    }

    const user = await User.findOne({ email: email });
    if (user && comparePasswords(password, user.password)) {
      let cookieParms = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      if (doNotLogout) {
        cookieParms = { ...cookieParms, maxAge: 1000 * 60 * 60 * 24 * 7 };
      }

      const notRead = user.notifications.reduce((sum, notification) => {
        if (notification.read === false) {
          return sum + 1;
        }
        return sum;
      }, 0);

      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.phoneNumber,
            user.isAdmin,
            user.notifications,
            user.notificationsCounter
          ),
          cookieParms
        )
        .status(201)
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            notifications: user.notifications,
            notificationsCounter: notRead,
            doNotLogout: doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();

    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.isAdmin = req.body.isAdmin;

    await user.save();

    return res.status(201).json({
      success: "user updated",
      userUpdated: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    const classes = await Class.find({ user: req.params.id });

    if (classes.length !== 0) {
      await Class.updateMany(
        { user: req.params.id },
        { $set: { user: null, reserved: false, comment: "" } }
      );
    }

    await user.remove();
    return res.send("user removed");
  } catch (error) {
    next(error);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id).orFail();

    if (user.notifications.length > 0) {
      let newNotifications = [...user.notifications];
      user.notifications = newNotifications.filter((notification) => {
        if (notification._id.toString() === id) {
          if (!notification.read) {
            user.notificationsCounter -= 1;
          }
        }
        return notification._id.toString() !== id;
      });

      await user.save();

      return res.status(201).json({
        success: "notification deleted successfully",
        userUpdated: {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          notifications: user.notifications,
          notificationsCounter: user.notificationsCounter,
        },
      });
    } else {
      res.send("You do not have any notifications");
    }
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id).orFail();

    if (user.notificationsCounter > 0) {
      user.notifications = user.notifications.map((notification) => {
        if (notification._id.toString() === id) {
          notification.read = true;
          user.notificationsCounter -= 1;
        }
        return notification;
      });

      await user.save();

      return res.status(201).json({
        success: "notification marked as read successfully",
        userUpdated: {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          notifications: user.notifications,
          notificationsCounter: user.notificationsCounter,
        },
      });
    } else {
      res.send("You already seen all notifications");
    }
  } catch (error) {
    next(error);
  }
};

const markAsUnread = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id).orFail();

    if (user.notifications.length > 0) {
      user.notifications = user.notifications.map((notification) => {
        if (notification._id.toString() === id) {
          notification.read = false;
          user.notificationsCounter += 1;
        }
        return notification;
      });

      await user.save();

      return res.status(201).json({
        success: "notification unmarked successfully",
        userUpdated: {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          notifications: user.notifications,
          notificationsCounter: user.notificationsCounter,
        },
      });
    } else {
      res.send("You do not have any notifications");
    }
  } catch (error) {
    next(error);
  }
};

const deleteAllNotification = async (req, res, next) => {
  try{
    const user = await User.findById(req.user._id).orFail();

    if(user.notifications.length > 0){

      user.notifications = [];
      user.notificationsCounter = 0;
  
      user.save();
  
      return res.status(201).json({
        success: "notifications deleted successfully",
        userUpdated: {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          notifications: user.notifications,
          notificationsCounter: user.notificationsCounter,
        },
      });
    }
    else{
      res.send("You do not have any notifications");
    }
  }catch(error){
    next(error);
  }
};

const deleteOnlyReadNotifications = async (req, res, next) => {
  try{
    const user = await User.findById(req.user._id).orFail();

    if(user.notifications.length > 0){
      user.notifications = user.notifications.filter((notification) => {
        return notification.read === false;
      });
  
      user.notificationsCounter = user.notifications.length;
  
      user.save();
  
      return res.status(201).json({
        success: "notifications deleted successfully",
        userUpdated: {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          notifications: user.notifications,
          notificationsCounter: user.notificationsCounter,
        },
      });
    }
    else{
      res.send("You do not have any notifications");
    }

  }catch(error){
    next(error);
  }
};

const markAllAsRead = async (req, res, next) => {
  try{
    const user = await User.findById(req.user._id).orFail();

    if(user.notifications.length > 0){

      user.notifications = user.notifications.map((notification) => {
        notification.read = true;
        return notification;
      });
    
      user.notificationsCounter = 0;
    
      user.save();
  
      return res.status(201).json({
        success: "notifications marked as read successfully",
        userUpdated: {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          notifications: user.notifications,
          notificationsCounter: user.notificationsCounter,
        },
      });
    }
    else{
      res.send("You do not have any notifications");
    }
  }catch(error){
    next(error);
  }

};

module.exports = {
  getUsers,
  getUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  deleteNotification,
  markAsRead,
  markAsUnread,
  deleteAllNotification,
  deleteOnlyReadNotifications,
  markAllAsRead
};
