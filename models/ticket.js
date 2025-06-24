const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  escalationId: Number,
  subject: String,
  description: String,
  priority: Number,
  status: String,
  createdAt: Date,
  customerEmail: String,
  brand: String,
  allowedContact: Boolean,
});

const Ticket = mongoose.model("Ticket", ticketSchema); 

module.exports = Ticket;