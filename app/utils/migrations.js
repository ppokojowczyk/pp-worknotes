const migrations = [
    {
        version: 1,
        queries: [
            ['CREATE TABLE IF NOT EXISTS db_version (version INTEGER NOT NULL PRIMARY KEY)', []],
            ['INSERT INTO db_version(version) VALUES (?)', [1]],
        ]
    },
    {
        version: 2,
        queries: [
            ['INSERT INTO notes VALUES (?, ?, ?, ?, ?)', [
                0,
                "Hello",
                "It's your first note!",
                (new Date()).toUTCString(),
                1
            ]],
        ]
    }
];

module.exports = migrations;
