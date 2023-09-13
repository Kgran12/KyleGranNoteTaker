// const fs = require('fs');
//var data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) =>
        res.json(JSON.parse(data))
    );
});

router.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    const newPost = {
        id: uuidv4(),
        title,
        text
    };



    readAndAppend(newPost, './db/db.json');

    return res.json();
});

router.delete('/notes/:id', (req, res) => {
    console.log("I am here");
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
  
        writeToFile('./db/db.json', result);
  
        return res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });


module.exports = router;