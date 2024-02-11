const express = require("express");

const {
  google,
  signup,
  verifyEmail,
  signin,
  passwordreset,
  forgetpassword,
  changepassword,
  logout,
  getuserDetails,
  getSingleUser,
  updateUser,
  deleteUser,
  addToPlaylist,
  removeFromPlaylist,
} = require("../controllers/auth.controller.js");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth.js");

const router = express.Router();

router.post("/signup", signup);
router.get("/verify-email", verifyEmail); // Add the verify-email route here
router.post("/signin", signin);
router.post("/google", google);
router.post("/passwordreset", passwordreset);
router.post("/forgetpassword/:id/:token", forgetpassword);
router.get("/logout", logout);

//change password
router.put("/change-password/:id", isAuthenticatedUser, changepassword);

//get all user details -- admin
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getuserDetails);

//get single user by id -- admin
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

//get tutor by id
router
  .route("/addtoplaylist")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addToPlaylist);

router
  .route("/removefromplaylist")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), removeFromPlaylist);
module.exports = router;
