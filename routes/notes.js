const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile, writeToFile } = require("../fsUtils.js");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile("db/db.json")
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve notes data." });
    });
});

// GET Route for retrieving a specific note by ID
notes.get("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.status(404).json("No note with that ID");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve note data." });
    });
});

// DELETE Route for deleting a note by ID
notes.delete("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id !== noteId);
      writeToFile("./db/db.json", result);
      res.json(`Item ${noteId} has been deleted`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to delete note." });
    });
});

// POST Route for creating a new note
notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: "Title and text are required." });
  }

  const newNote = {
    note_id: uuidv4(),
    title,
    text,
  };

  readAndAppend(newNote, "db/db.json")
    .then(() => {
      res.json(`Note added sucessfully`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error in adding note." });
    });
});

module.exports = notes;
