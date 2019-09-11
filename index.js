const config = require('./config/config');
const chalk = require('chalk');

const app = require('./config/express');

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.info(
    ` ${chalk.blue('server started on port', config.port)} (${chalk.green(
      config.env,
    )})`,
  );
});
