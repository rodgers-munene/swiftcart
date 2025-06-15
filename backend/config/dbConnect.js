const mongoose = require("mongoose");

const dbConnector = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://rodgers:zAF2sVAbl52BOqqF@swiftcartcluster.qwtvxgc.mongodb.net/swiftcartdb");
    console.log(
      "Database Connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnector;
