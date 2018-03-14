const {MongoClient} = require(`mongodb`);
const {
  DB_HOST = `mongodb://localhost:27017`,
  DB_NAME = `keksobooking`
} = process.env;
const logger = require(`../logger`);

module.exports = MongoClient.connect(DB_HOST)
    .then((client) => client.db(DB_NAME))
    .catch((e) => {
      logger.error(`Failed to connect to MongoDB`, e);
      process.exit(1);
    });
