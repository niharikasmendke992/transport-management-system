const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/vehicles", vehicleRoutes);



// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running");
});



// CONNECT DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });



// START SERVER
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});