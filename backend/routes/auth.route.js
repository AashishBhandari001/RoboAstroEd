const express = require("express");

const {
  google,
  signup,
  signin,
  passwordreset,
  forgetpassword,
  logout,
  getuserDetails,
  getSingleUser,
  updateuserRole,
  deleteUser,
} = require("../controllers/auth.controller.js");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/auth.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/passwordreset", passwordreset);
router.post("/forgetpassword/:id/:token", forgetpassword);
router.get("/logout", logout);

//get all user details -- admin
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getuserDetails);

//get single user by id -- admin
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateuserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
