const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: String,
  species: String,
  lastWatered: Date,
  isHydroponic: Boolean,
  careLevel: String,
  notes: String,
});

const Plant = mongoose.model("Plant", plantSchema); 

module.exports = Plant;