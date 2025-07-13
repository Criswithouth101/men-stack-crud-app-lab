const dotenv = require("dotenv"); 
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev")); 

mongoose.connect(process.env.MONGODB_URI);

//landpage 
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// inventory
app.get("/plants", async (req, res) => {
  const allPlants = await Plant.find();
  console.log("Get works", allPlants);
  res.render("plants/index.ejs", { plants: allPlants });
});

// add a plant
app.get("/plants/new", (req, res) => {
   res.render("plants/new.ejs");
});

app.post("/plants", async (req, res) => {
  try {
    
    req.body.isHydroponic = req.body.isHydroponic === "on";

    const plantData = {
      name: req.body.name,
      species: req.body.species,
      lastWatered: new Date(req.body.lastWatered), // format 'YYYY-MM-DD'
      isHydroponic: req.body.isHydroponic,
      careLevel: req.body.careLevel,
      Notes: req.body.Notes
    };

    await Plant.create(plantData);

    console.log("New plant added!");
    res.redirect("/plants");
  } catch (error) {
    console.error("Error creating plant:", error);
    res.status(500).send("Something went wrong while creating the plant.");
  }
});

//plant details 

app.get("/plants/:plantId", async (req, res) => {
  const foundPlant = await Plant.findById(req.params.plantId);
res.render("plants/show.ejs", { plant: foundPlant});
});

// delete a plant
app.delete("/plants/:plantId", async (req, res) => {
  await Plant.findByIdAndDelete(req.params.plantId);
  res.redirect("/plants");
});

// edit a plant
app.get("/plant/:plantId/edit", async (req, res) => {
  const foundPlant = await Plant.findById(req.params.plantId);
   res.render("plants/edit.ejs", {
    plant: foundPlant,
  });
});

app.put("/plants/:plantId", async (req, res) => {
 
  if (req.body.isHydroponic === "on") {
    req.body.isHydroponic = true;
  } else {
    req.body.isHydroponic = false;
  }
  
  await Plant.findByIdAndUpdate(req.params.plantId, req.body);

  res.redirect(`/plants/${req.params.plantId}`);
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Plant = require("./models/plant.js");

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
