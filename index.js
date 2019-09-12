// const mongoose = require('mongoose');
// const util = require('util');

const config = require('./config/config');
const chalk = require('chalk');
const mongo = require('./config/mongo');

// const debug = require('debug')(`${config.mongo.dbName}:index`);

// const mongoUri = `${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`;
// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.on('error', () => {
//   throw new Error(`unable to connect to mongo at ${mongoUri}`);
// });

// if (config.mongooseDebug) {
//   mongoose.set('debug', (collectionName, method, query, doc) => {
//     debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
//   });
// }

const app = require('./config/express');
mongo.mongoSetup();

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.info(
    ` ${chalk.blue('server started on port', config.port)} (${chalk.green(
      config.env,
    )})`,
  );
});
