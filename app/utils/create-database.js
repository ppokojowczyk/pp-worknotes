const createDatabase = (database) => {
    database.run('CREATE TABLE IF NOT EXISTS notes (id INTEGER NOT NULL PRIMARY KEY, title TEXT, content TEXT, date TEXT, active INTEGER)');
    database.run('CREATE TABLE IF NOT EXISTS db_version (version INTEGER NOT NULL PRIMARY KEY)');
    return database;
};

module.exports = createDatabase;
