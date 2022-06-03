const router = require("express").Router();

const {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getUsers).post(addUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
