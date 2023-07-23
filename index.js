const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const note = require('./modules/notes');
const Note = require('./modules/notes');

const app = express();
const port = 3000; // You can use any desired port number.

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// Define your routes and middleware here.
app.get('/', (req, res) => {
    res.send('Simple notes backend server running!');
});

app.get('/notes', (req, res) => {
    console.log("API in costruzione: get all notes");

    //Read the json file
    fs.readFile('./files/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        try {
            //Parse the json file 
            const jsonData = JSON.parse(data);
            const notes = jsonData.notes;
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
            const jsonData = JSON.parse(data);
            const notes = jsonData.notes;

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

    var newID = 0;

    //Stacco un nuovo ID consecutivo a quelli già presenti
    fs.readFile('./files/notes.json', 'utf8', (err, data) => { //questa funzione sta diventando un po' lunga, controllare se si può modularizzare
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        try {
            //Parse the json file 
            const jsonData = JSON.parse(data);
            const notes = jsonData.notes;

            //Find the last item
            let lastItem = notes[notes.length - 1];
            console.log(lastItem); //testing purposes

            let lastID = lastItem.id;
            newID = parseInt(lastID) + 1;
            console.log(newID); //testing purposes
            req.body.id = newID.toString();
            console.log(req.body); //testing purposes

            jsonData.notes.push(req.body);

            //Scrivo il contenuto della richiesta nel DB e restituisco uno stato positivo o negativo
            fs.writeFile('./files/notes.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return res.status(500).json({ error: 'Error writing to file' });
                } else {
                    res.send(`New item added and saved successfully with id ${newID.toString()}`);
                }
            });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

app.put('/note/:id', (req, res) => {
    //@TO-DO: leggo il contenuto della richiesta
    //@TO-DO: recupero dal DB la nota con id req.params.id e ne aggiorno il contenuto
    //@TO-DO: restituisco lo stato di avvenuto o non avvenuto aggiornamento
    const noteId = req.params.id;
    res.send(`You updated the note with ID: ${noteId}`);
});

app.delete('/note/:id', (req, res) => {
    //@TO-DO: recupero dal DB la nota con ID selezionato e la cancello dal DB
    //@TO-DO: resituisco lo stato dell'operazione effettuata
    const noteId = req.params.id;
    res.send(`You deleted the note with ID: ${noteId}`);
});

// Start the server.
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
