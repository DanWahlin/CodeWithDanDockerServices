'use strict';

const mongoose = require('mongoose');
const seeder = require('./dataSeeder');

let seeded = false;

/**
 * Database module for MongoDB connection management
 */
const database = {
    /**
     * Initialize database connection
     * @param {Object} config - Database configuration
     * @returns {Promise<Connection>} Mongoose connection
     */
    async init(config) {
        console.log(`Trying to connect to ${config.host}/${config.database} MongoDB database`);
        
        const connStr = `mongodb://${encodeURIComponent(config.username)}:${encodeURIComponent(config.password)}@${config.host}:27017/${config.database}`;
        
        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });
        
        mongoose.connection.once('open', () => {
            console.log('MongoDB connection established');
            
            // Seed database only once
            if (!seeded) {
                seeded = true;
                seeder.seed();
            }
        });
        
        try {
            await mongoose.connect(connStr);
            return mongoose.connection;
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    },

    /**
     * Close database connection gracefully
     */
    close() {
        if (mongoose.connection) {
            mongoose.connection.close(() => {
                console.log('MongoDB connection closed');
                process.exit(0);
            });
        }
    }
};

module.exports = database;

