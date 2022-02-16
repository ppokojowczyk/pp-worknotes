/** @var {express} */
const express = require('express');

/** @var {router} */
const router = express.Router();

/** @var {sqlite3} */
const database = require('../factory/database-factory');

const parseJSON = () => {
    return express.json({ limit: '1mb' });
}

router.get('/notes', (request, response) => {
    database.all('SELECT * FROM notes WHERE (active IS NULL OR active = 1) ORDER BY id DESC;', (err, rows) => {
        let notes = [];
        rows.forEach((row) => {
            notes.push({
                id: row.id,
                title: row.title,
                date: row.date,
                content: row.content
            });
        })
        response.json(notes);
    });
});

router.post('/note', parseJSON(), (request, response) => {
    database.run('INSERT INTO notes(title,content,date,active) VALUES (?,?,?,?);', [
        request.body.title, request.body.content, request.body.date, 1
    ], function (err) {
        if (err) {
            response.status(400);
            return response.send();
        }
        response.status(200);
        response.json(this.lastID);
    });
});

router.patch('/note', parseJSON(), (request, response) => {
    if (request.body.id > 0) {
        database.run('UPDATE notes SET title = ?, content = ? WHERE id = ?;', [
            request.body.title, request.body.content, request.body.id
        ], (err) => {
            if (err) {
                response.status(400);
                return response.send();
            }
            response.status(200);
            response.send();
        });
    } else {
        response.status(400);
        return response.send();
    }
});

router.delete('/note/:id', (request, response) => {
    database.run('UPDATE notes SET active = 0 WHERE id = ?;', [
        request.params.id
    ], (err) => {
        if (err) {
            response.status(400);
            return response.send();
        }
        response.status(200);
        response.send();
    });
});

module.exports = router;
