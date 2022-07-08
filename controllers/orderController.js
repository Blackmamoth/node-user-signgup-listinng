const Razorpay = require("razorpay");
const asyncHandler = require("express-async-handler");

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
    throw new Error("All fields are required");
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
    callback_url: "http://localhost:5000/users",
    callback_method: "get",
  };
  try {
    const paymentLink = await razorpay.paymentLink.create(params);
    // await PaymenLinkModel.create(paymentLink);
    res.json(paymentLink);
  } catch (error) {
    res.status(400).json({
      message: "An error occured while generating the link",
      error: error,
    });
    throw new Error(error.error.description);
  }
});

const getPaymentLinks = asyncHandler(async (req, res) => {
  try {
    const paymentLinks = await razorpay.paymentLink.all();
    res.json(paymentLinks);
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
});

module.exports = { generatePaymentLink, getPaymentLinks };
