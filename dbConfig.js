const dbEngine = process.env.DB_ENVIRONMENT || 'development';
const config = require('./knexfile')[dbEngine] //dbEngine se pasa a config

module.exports = require('knex')(config);
