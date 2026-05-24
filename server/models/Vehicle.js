const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({

  vehicleNumber: String,

  driverName: String,

  route: String,

  status: String,

  capacity: Number,

  deliveryDate: String,

});

module.exports = mongoose.model(
  "Vehicle",
  vehicleSchema
);