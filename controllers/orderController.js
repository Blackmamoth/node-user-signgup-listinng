const Razorpay = require("razorpay");
const asyncHandler = require("express-async-handler");
const PaymentLinkModel = require("../models/paymentLinkModel");
const crypto = require("crypto");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");

const razorpay = new Razorpay({
  key_id: process.env.API_KEY,
  key_secret: process.env.API_SECRET,
});

const generatePaymentLink = asyncHandler(async (req, res) => {
  if (
    !req.body.amount ||
    !req.body.currency ||
    !req.body.description ||
    !req.body.name ||
    !req.body.email ||
    !req.body.contact
  ) {
    throw new Error("All fields are required ()");
  }
  let date = new Date();
  date = date.setDate(date.getDate() + 5);
  const params = {
    amount: req.body.amount,
    currency: req.body.currency,
    accept_partial: false,
    first_min_partial_amount: 100,
    expire_by: date,
    reference_id: Date.now().toString(),
    description: req.body.description,
    customer: {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
    },
    notify: {
      sms: true,
      email: true,
    },
    reminder_enable: true,
    callback_url: `https://dev.nourishgenie.in/users`,
    callback_method: "get",
  };
  try {
    const paymentLink = await razorpay.paymentLink.create(params);
    await PaymentLinkModel.create({ ...paymentLink, user_id: req.user._id });
    res.json(paymentLink);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "An error occured while generating the link",
      error: error,
    });
    throw new Error(error);
  }
});

const getPaymentLinks = asyncHandler(async (req, res) => {
  try {
    const paymentLinks = await PaymentLinkModel.find({ user_id: req.user._id });
    res.json(paymentLinks);
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
});

const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_payment_link_reference_id,
    razorpay_payment_link_id,
    razorpay_payment_link_status,
    razorpay_signature,
  } = req.body;
  if (!razorpay_payment_id) {
    res.status(200);
    return;
  }
  const validate = await validatePaymentVerification(
    {
      payment_link_id: razorpay_payment_link_id,
      payment_id: razorpay_payment_id,
      payment_link_reference_id: razorpay_payment_link_reference_id,
      payment_link_status: razorpay_payment_link_status,
    },
    razorpay_signature,
    process.env.API_SECRET
  );
  if (validate) {
    res.status(200).json({ success: true, message: "Signature is authentic" });
    await PaymentLinkModel.updateOne(
      { id: razorpay_payment_link_id },
      { status: razorpay_payment_link_status }
    );
  } else {
    res
      .status(400)
      .json({ success: false, message: "Signature is not authentic" });
    throw new Error("Signature is not authentic");
  }
});

module.exports = { generatePaymentLink, getPaymentLinks, verifyPayment };
