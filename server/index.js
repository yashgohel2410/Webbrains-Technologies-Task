const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const employeeRoute = require("./routes/employee-route");
const bodyParser = require('body-parser');

//Connection with mongoDB
mongoose
  .connect("mongodb+srv://test:admin@cluster0.322qg.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

  const app = express();
  // Configure Express to parse JSON requests
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use("/api", employeeRoute);

app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
