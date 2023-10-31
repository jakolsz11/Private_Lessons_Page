const express = require("express");
const {
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
  markAllAsRead,
} = require("../controllers/userController");
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

//user
router.use(verifyIsLoggedIn);
router.get("/profile/:id", getUserProfile);
router.put("/profile", updateUserProfile);
router.delete("/notification/:id", deleteNotification);
router.patch("/notification/mark-as-read/:id", markAsRead);
router.patch("/notification/mark-as-unread/:id", markAsUnread);
router.delete("/notifications", deleteAllNotification);
router.delete("/read-notifications", deleteOnlyReadNotifications);
router.patch('/notifications/mark-as-read', markAllAsRead);

//admin
router.use(verifyIsAdmin);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
