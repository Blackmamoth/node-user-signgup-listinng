const router = require("express").Router();

const {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

const { protectedRoute } = require("../middleware/authMiddleware");

router.route("/").get(protectedRoute, getUsers).post(addUser);

router.route("/login").post(loginUser);

router
  .route("/:id")
  .get(protectedRoute, getUser)
  .patch(protectedRoute, updateUser)
  .delete(protectedRoute, deleteUser);

module.exports = router;
