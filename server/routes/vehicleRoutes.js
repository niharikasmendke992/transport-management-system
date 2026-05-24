const express = require("express");

const router = express.Router();

const Vehicle = require("../models/Vehicle");




// GET ALL VEHICLES
router.get("/", async (req, res) => {

  try {

    const vehicles = await Vehicle.find();

    res.json(vehicles);

  } catch (error) {

    console.log(error);

  }
});




// ADD VEHICLE
router.post("/add", async (req, res) => {

  try {

    const newVehicle = new Vehicle(req.body);

    await newVehicle.save();

    res.json(newVehicle);

  } catch (error) {

    console.log(error);

  }
});




// UPDATE VEHICLE
router.put("/:id", async (req, res) => {

  try {

    const updatedVehicle =
      await Vehicle.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedVehicle);

  } catch (error) {

    console.log(error);

  }
});




// DELETE VEHICLE
router.delete("/:id", async (req, res) => {

  try {

    await Vehicle.findByIdAndDelete(req.params.id);

    res.json({
      message: "Vehicle Deleted",
    });

  } catch (error) {

    console.log(error);

  }
});



module.exports = router;