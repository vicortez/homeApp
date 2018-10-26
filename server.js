const express = require("express");
const bodyParser = require("body-parser");

const todoTask = require("./routes/todoTask.route"); // Imports routes for the Shopping list items
const notice = require("./routes/notice.route"); // Imports routes for the notices

// Set up mongoose connection
const Database = require("./models/Database");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use("/todoTasks", todoTask);
app.use("/notices", notice);

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: `YOUR EXPRESS BACKEND IS CONNECTED TO REACT :${port}` });
});
