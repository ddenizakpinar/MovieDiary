const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const app = express();
dotenv.config();

// Middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.json());

// Enable Cors
app.options("*", cors());
app.use(cors());

const { PORT, mongoURI, NODE_ENV } = process.env;

// Routes
const movieRouter = require("./routes/movie");

app.use("/api/movie", movieRouter);

// Connect to DB
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db!")
);

app.get("/", (req, res) => res.send("Movie Diary API"));

app.use(express.static(__dirname + "/client"));

app.listen(PORT, () => {
  console.log(`Movie API listening at http://localhost:${PORT}`);
});
