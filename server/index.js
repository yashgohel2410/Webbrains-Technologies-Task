require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const employeeRoute = require("./routes/employee-route");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(morgan("tiny"));

app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

process.on("uncaughtException", (err) => {
  console.log(err);
});


// Configure Express to parse JSON requests
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://test:admin@cluster0.322qg.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.use("/api", employeeRoute);
    app.use("/api", employeeRoute);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
