'use strict';

const env = process.env.NODE_ENV || 'development';

console.log(`Node environment: ${env}`);
console.log(`Loading config.${env}.json`);

module.exports = require(`../config/config.${env}.json`);
