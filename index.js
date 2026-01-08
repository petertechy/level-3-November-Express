const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config()
const adminRoute = require("./routes/admin.route")
const PORT = process.env.PORT || 5500;

app.use(cors())
app.use(express.json({limit: "50mb"}))
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/", adminRoute)

const URI = process.env.MONGO_DB_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Mongodb has connected successfully");
  })
  .catch((error) => {
    console.log("Mongodb iyaf refuse to start");
    console.log(error);
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//dotenv