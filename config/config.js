const Joi = require('@hapi/joi');

require('dotenv').config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('development'),
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT token required to loged in'),
  MONGO_HOST: Joi.string()
    .required()
    .description('MongoDB Url "mongodb:"'),
  MONGO_PORT: Joi.number().default(27017),
  MONGO_DB_NAME: Joi.string().required(),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
})
  .unknown()
  .required();
const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation errors: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
    dbName: envVars.MONGO_DB_NAME,
  },
};

module.exports = config;
