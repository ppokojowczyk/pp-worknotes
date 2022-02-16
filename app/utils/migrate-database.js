const logger = require('./logger');

const migrateDatabase = (database, migrations) => {

    /**
     * @var {array}
     */
    const queries = [];

    /**
     * Log message.
     * @param {*} message 
     */
    function log(message = '') {
        logger.log(message);
    };

    /**
     * Run migrations.
     * @param {int} currentVersion
     * 
     * @returns {*}
     */
    function migrate(currentVersion = 0) {

        let newVersion = currentVersion;

        migrations.forEach(migration => {
            if (currentVersion < migration.version) {
                newVersion++;
                migration.queries.forEach(query => {
                    queries.push(query);
                });
            }
        });

        if (queries.length) {
            if (newVersion !== currentVersion) {
                queries.push(['UPDATE db_version SET version = ?', [newVersion]]);
            }
            queries.forEach(query => {
                database.run(query[0], query[1]);
            });
        }

        log("Current database version: " + currentVersion);
        if (currentVersion != newVersion) {
            log("New version: " + newVersion);
        }
    }

    return database.all('SELECT version FROM db_version LIMIT 1', (err, rows) => {
        migrate((err || rows.length === 0) ? 0 : rows[0].version);
    });
};

module.exports = migrateDatabase;
