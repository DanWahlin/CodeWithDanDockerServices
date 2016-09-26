'use strict';
var dataInitializer = require('./lib/dataSeeder'),
    config = require('./config/config.development.json'),
    db = require('./lib/database');

db.init(config.databaseConfig);

console.log('Initializing Data');
dataInitializer.initializeProductData(function(err) {
  if (!err) {
    console.log('Seed data loaded!');
  } else {
    console.log(err);
  }
});


