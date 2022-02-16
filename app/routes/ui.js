/** @var {express} */
const express = require('express');

/** @var {router} */
const router = express.Router();

/** @var {path} */
const path = require('path');

/**
 * Handle sending of file.
 * @param {Response} response
 * @param {File} file 
 */
function sendFile(response, file) {
    response.sendFile(path.join(__dirname + '/../' + file));
}

/* Favicon */
router.get('/favicon.png', (req, res) => {
    sendFile(res, '/ui/favicon/favicon-32x32.png');
});

/* Main single page. */
router.get('/', (req, res) => {
    sendFile(res, '/index.html');
});

module.exports = router;
