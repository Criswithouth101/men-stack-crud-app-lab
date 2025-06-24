const dotenv = require("dotenv"); 
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI);


app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /tickets index page
app.get("/tickets", async (req, res) => {
  const allTickets = await Ticket.find();
  console.log("Get works", allTickets);
  res.render("tickets/index.ejs", { tickets: allTickets });
});


// GET /tickets/new
app.get("/tickets/new", (req, res) => {
   res.render("tickets/new.ejs");
});

// POST New tickets
app.post("/tickets", async (req, res) => {
  try {
    
    req.body.allowedContact = req.body.allowedContact === "on";

    const ticketData = {
      escalationId: Number(req.body.id),
      subject: req.body.subject,
      description: req.body.description,
      priority: Number(req.body.priority),
      status: req.body.status,
      createdAt: new Date(req.body.createdAt), // format '2024-01-01'
      customerEmail: req.body.customerEmail,
      brand: req.body.brand,
      allowedContact: req.body.allowedContact,
    };

    await Ticket.create(ticketData);

    res.redirect("/tickets");
    console.log("POST works")
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).send("Something went wrong while creating the ticket.");
  }
});

app.get("/tickets/:ticketId", async (req, res) => {
  const foundTicket = await Ticket.findById(req.params.ticketId);
res.render("tickets/show.ejs", { ticket: foundTicket});
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Ticket = require("./models/ticket.js");

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
