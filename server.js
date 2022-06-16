// Setup empty JS object to act as endpoint for all routes
let projectData = {}; // the data holder

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;

const server = app.listen(port, () => {
  console.log("Server Is running");
});
// get route to retrive data
app.get("/getdata", (req, res) => {
  console.log('data');
  if (projectData[objectNewData] != undefined) {
    res.send(projectData[objectNewData]);
  } else {
    res.send("Some Thing Went Wrong");
  }
});
// post route to store data
let counter = 1;
let objectNewData = "weatheData" + 1;
app.post("/add", (req, res) => {
  console.log('add');
  projectData[objectNewData] = req.body;
});
