const config = require('./config/config');
const chalk = require('chalk');
const mongo = require('./config/mongo');

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
