const router = require("express").Router();
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/passwordController");

router.route("/").post(forgotPassword);
router.route("/reset/:tokenID").post(resetPassword).get(resetPassword);

module.exports = router;
