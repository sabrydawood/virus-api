const mongoose = require("mongoose");
const { log, success, error } = require("@helpers/logger");

module.exports = {
  async initializeMongoose() {
    log(`Connecting to MongoDb...`);

    try {
      await mongoose.connect(process.env.MONGO_CONNECTION, {
        keepAlive: true,
      });

      success("Mongoose: Database connection established");
    } catch (err) {
      error("Mongoose: Failed to connect to database", err);
      process.exit(1);
    }
  },

  schemas: {
    User: require("./schemas/User"),
  },
};