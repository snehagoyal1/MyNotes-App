require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoutes");
const noteRoutes = require("./Routes/noteRoutes");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log("Some error occured"));

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(5000, () => {
  console.log("Working....");
});
