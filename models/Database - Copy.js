let mongoose = require("mongoose");

const server = "YOUR_USERNAME:YOUR_PASSWORD@ds163769.mlab.com:63769"; // REPLACE WITH YOUR DB SERVER
const database = "homeserverdb"; // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
        console.log(err);
      });
  }
}

module.exports = new Database();