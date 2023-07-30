const express = require("express");

const notesRouter = require("./notes");

const app = express();
app.use("/notess", notesRouter);
module.exports = app;
