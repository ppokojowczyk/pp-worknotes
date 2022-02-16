/** @var {Logger} */
const logger = require('../utils/logger');

/** @var {migrateDatabase} */
const migrateDatabase = require('../utils/migrate-database');

/** @var {sqlite3} */
const sqlite3 = require('sqlite3').verbose();

/** @var {fs} */
const fs = require('fs');

/** @var {function} */
const createDatabase = require('../utils/create-database');

/** @var {array} */
const migrations = require('../utils/migrations');

/** @var {string} */
const databasePath = '../database/worknotes.db';

/**
 * Creates a new database instance.
 * @returns {sqlite3}
 */
class DatabaseFactory {
    make() {
        if (!fs.existsSync(databasePath)) {
            fs.writeFileSync(databasePath, "");
        }
        if (!fs.existsSync(databasePath)) {
            throw new Error("Database file doesn't exist.");
        }
        const database = new sqlite3.Database(databasePath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, error => {
            if (error) {
                logger.error(error.message);
                throw new Error(error.message);
            }
            logger.log('Connected to the database.');
            database.serialize(() => {
                createDatabase(database);
                migrateDatabase(database, migrations);
                logger.log('Executed migrations.');
            })
        });
        return database;
    }
}

module.exports = (new DatabaseFactory).make();
