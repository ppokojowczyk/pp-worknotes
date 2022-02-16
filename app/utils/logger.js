class Logger {
    /**
     * Log message.
     * @param {*} message 
     */
    log(message) {
        console.log(message);
    }

    /**
     * Log error.
     * @param {*} message 
     */
    error(message) {
        console.error(message);
    }
};

module.exports = new Logger;