/** @var {int} */
const port = 3000;

/** @var {express} */
const express = require("express");

/** @var {express} */
const app = express();

/** @var {bodyParser} */
const bodyParser = require("body-parser");

/** @var {logger} */
const logger = require("./utils/logger");

/** @var {router} */
const ui = require("./routes/ui");

/** @var {router} */
const notes = require("./routes/notes");

require("./routes/webpack")(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", ui);

app.use("/", notes);

app.listen(port);

logger.log("Running pp-worknotes at port: " + port);
