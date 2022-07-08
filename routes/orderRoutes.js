const router = require("express").Router();
const {
  generatePaymentLink,
  getPaymentLinks,
} = require("../controllers/orderController");
const { protectedRoute } = require("../middleware/authMiddleware");

router
  .route("/PaymentLinks")
  .post(protectedRoute, generatePaymentLink)
  .get(protectedRoute, getPaymentLinks);

module.exports = router;
