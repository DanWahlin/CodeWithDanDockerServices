/**
 * Express Handlebars helper functions
 */
const helpers = {
    /**
     * Format a number as currency
     * @param {any} value - Value to format
     * @param {any} _options - Handlebars options
     * @returns {string} Formatted currency string
     */
    formatCurrency(value: any, _options: any): string {
        let currencyString = '$0.00';

        if (value && !isNaN(value)) {
            currencyString = '$' + parseFloat(value).toFixed(2);
        }

        return currencyString;
    },

    /**
     * Format price with discount display
     * @param {any} regularPrice - Regular price
     * @param {any} discountPrice - Discount price
     * @param {any} _options - Handlebars options
     * @returns {string} HTML string with formatted prices
     */
    formatPrice(regularPrice: any, discountPrice: any, _options: any): string {
        let priceString = '';

        if (discountPrice) {
            priceString = '<span class="regularPriceBeforeDiscount"> $' + regularPrice + '</span> ' +
                ' <span class="discountPrice">$' + discountPrice + '</span> ';
        } else {
            priceString = '<span class="">$' + regularPrice + '</span> ';
        }

        return priceString;
    }
};

export default helpers;
