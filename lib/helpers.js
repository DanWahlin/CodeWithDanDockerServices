'use strict';

/**
 * Utility helper functions
 */
const helpers = {
    /**
     * Check if request is from a bot (honeypot field check)
     * @param {Object} req - Express request object
     * @returns {boolean} True if bot detected
     */
    isBot(req) {
        const bfield = req.body.bfield;
        return Boolean(bfield && bfield.length);
    },

    /**
     * Find index of item in array by property value
     * @param {Array} array - Array to search
     * @param {string} propertyName - Property name to match
     * @param {*} value - Value to find
     * @returns {number} Index of item or -1 if not found
     */
    itemExists(array, propertyName, value) {
        if (!array) return -1;
        
        if (propertyName) {
            return array.map(item => item[propertyName].toString()).indexOf(value);
        }
        return array.map(item => item.toString()).indexOf(value);
    },

    /**
     * Add days to current date
     * @param {number} days - Number of days to add
     * @returns {Date} New date with added days
     */
    addDays(days) {
        const date = new Date();
        const expDate = new Date();
        expDate.setDate(date.getDate() + days);
        expDate.setHours(0, 0, 0, 0);
        return expDate;
    },

    /**
     * Get current date as GMT Date object
     * @returns {Date} Current date
     */
    getDateTime() {
        return new Date(Date.now());
    }
};

module.exports = helpers;

