const mongoose = require('mongoose');
const util = require('util');

const config = require('./config');

function mongoSetup() {
  const debug = require('debug')(`${config.mongo.dbName}:index`);

  const mongoUri = `${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`;
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to mongo at ${mongoUri}`);
  });

  if (config.mongooseDebug) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
  }
}

module.exports = { mongoSetup };
