const router = require("express").Router();
const {
  generatePaymentLink,
  getPaymentLinks,
  verifyPayment,
} = require("../controllers/orderController");
const { protectedRoute } = require("../middleware/authMiddleware");

router
  .route("/paymentLinks")
  .post(protectedRoute, generatePaymentLink)
  .get(protectedRoute, getPaymentLinks);

router.route("/paymentLinks/verify").post(protectedRoute, verifyPayment);

module.exports = router;
