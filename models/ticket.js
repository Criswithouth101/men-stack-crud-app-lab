const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  id: Number,
  subject: String,
  description: String,
  priority: String,
  status: String
  createdAt: Date,
  customerEmail: String,
  Brand: String,
  updatedAt: Date,
});

const Ticket = mongoose.model("Ticket", ticketSchema); 