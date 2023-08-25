const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const Note = require('./modules/notes');
const notesHelper = require('./modules/notes-helper');

const app = express();
const port = 3000; // You can use any desired port number.

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// Define your routes and middleware here.
app.get('/', (req, res) => {
    res.send('Simple notes backend server running!');
});

app.get('/notes', (req, res) => {
    console.log("Get all notes");

    //Read the json file
    fs.readFile('./files/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        try {
            //Parse the json file 
            console.log(data);
            const notes = JSON.parse(data);
            //Build an array with IDs, titles and content preview
            var noteItems = [];

            for (let i = 0; i < notes.length; i++) {
                var jsonItem = notes[i];
                var noteItem = new Note(jsonItem.id, jsonItem.title, jsonItem.content);
                console.log(noteItem); //testing purposes
                noteItems.push(noteItem);
            }
            //Return the array to the caller
            res.json(noteItems);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

// Route handler for a dynamic endpoint
app.get('/note/:id', (req, res) => {
    const noteId = req.params.id; // Access the 'id' parameter from the URL
    console.log(`You requested note with ID: ${noteId}`);

    //Read json file
    fs.readFile('./files/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        try {
            //Parse the json file 
            const notes = JSON.parse(data);

            //Find the item with requested ID
            const noteItem = notes.find((item) => item.id === noteId);

            //Return the array to the caller
            res.json(noteItem);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

app.post('/notes', (req, res) => {
    console.log("You sent a new note to save");
    //Leggo il contenuto della richiesta
    console.log(req.body);

    //Stacco un nuovo ID consecutivo a quelli già presenti
    fs.readFile('./files/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        try {
            //Parse the json file 
            const notes = JSON.parse(data);

            //Riempio l'ID e i campi metadata
            req.body.id = notesHelper.getNewId(notes);
            req.body.date_created = notesHelper.getModifiedDate();
            req.body.time_created = notesHelper.getModifiedTime();
            req.body.date_modified = notesHelper.getModifiedDate();
            req.body.time_modified = notesHelper.getModifiedTime();

            notes.push(req.body);

            //Scrivo il contenuto della richiesta nel DB e restituisco uno stato positivo o negativo
            fs.writeFile('./files/notes.json', JSON.stringify(notes, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return res.status(500).json({ error: 'Error writing to file' });
                } else {
                    res.send(`New item added and saved successfully with id ${req.body.id}`);
                }
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

app.put('/note/:id', (req, res) => {
    const noteId = req.params.id;
    console.log(`You sent an update to the note with ID: ${noteId}`);

    //leggo il contenuto della richiesta
    console.log(req.body);

    //recupero dal DB la nota con id req.params.id e ne aggiorno il contenuto
    fs.readFile('./files/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        try {
            //Parse the json file 
            const notes = JSON.parse(data);

            var noteItem = notes.find((item) => item.id === noteId);
            noteItem.title = req.body.title;
            noteItem.content = req.body.content;
            noteItem.date_modified = notesHelper.getModifiedDate();
            noteItem.time_modified = notesHelper.getModifiedTime();

            console.log("suca");
            console.log(notes);

            //Salvo la nota con il nuovo contenuto
            fs.writeFile('./files/notes.json', JSON.stringify(notes, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return res.status(500).json({ error: 'Error writing to file' });
                } else {
                    res.send(`Succesfully updated the note with id ${noteId}`);
                }
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

app.delete('/note/:id', (req, res) => {
    const noteId = req.params.id;
    console.log(`You want to delete the note with ID: ${noteId}`);

    //@TO-DO: recupero dal DB la nota con ID selezionato e la cancello dal DB
    fs.readFile('./files/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        try {
            //Parse the json file 
            const notes = JSON.parse(data);

            //Creo una copia dell'array senza la nota cancellata
            var noteItems = notes.filter((item) => item.id !== noteId);
            // console.log("here");
            // console.log(noteItems);

            //salvo il nuovo array nel file json
            fs.writeFile('./files/notes.json', JSON.stringify(noteItems, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return res.status(500).json({ error: 'Error writing to file' });
                } else {
                    res.send(`Succesfully deleted the note with id ${noteId}`);
                }
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

// Start the server.
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
