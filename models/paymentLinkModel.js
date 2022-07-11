const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  accept_partial: {
    type: Boolean,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  amount_paid: {
    type: Number,
    required: true,
  },
  callback_method: {
    type: String,
    required: true,
  },
  callback_url: {
    type: String,
    required: true,
    default: "http://localhost:5000/users",
  },
  cancelled_at: {
    type: Number,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  customer: {
    type: Object,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expire_by: {
    type: String,
    required: true,
  },
  expired_at: {
    type: String,
    required: true,
  },
  first_min_partial_amount: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  notes: {
    type: Object,
  },
  notify: {
    type: Object,
    required: true,
  },
  payments: {
    type: Array,
    default: [],
  },
  reference_id: {
    type: String,
    required: true,
  },
  reminder_enable: {
    type: Boolean,
    required: true,
  },
  reminders: {
    type: Array,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  updated_at: {
    type: Number,
    required: true,
  },
  upi_link: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: String,
  },
});

module.exports = mongoose.model("payment_link", linkSchema);
