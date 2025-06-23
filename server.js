const dotenv = require("dotenv"); 
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /tickets/new
app.get("/tickets/new", (req, res) => {
   res.render("tickets/new.ejs");
});

app.post("/tickets", async (req, res) => {
  console.log(req.body);
  res.redirect("/tickets/new");
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Ticket = require("./models/ticket.js");

app.use(express.urlencoded({ extended: false }));


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
