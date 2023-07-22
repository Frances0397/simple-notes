const express = require('express');
const app = express();
const port = 3000; // You can use any desired port number.

// Define your routes and middleware here.
app.get('/', (req, res) => {
    res.send('Simple notes backend server running!');
});

app.get('/notes', (req, res) => {
    res.send("API in costruzione: get all notes");

    //@TO-DO: restituire titolo e anteprima di tutte le note salvate
});

// Route handler for a dynamic endpoint
app.get('/note/:id', (req, res) => {
    const noteId = req.params.id; // Access the 'id' parameter from the URL
    res.send(`You requested note with ID: ${noteId}`);

    //@TO-DO: restituire titolo, metadata e l'intero contenuto della nota
});

app.post('/notes', (req, res) => {
    //@TO-DO: leggo il contenuto della richiesta
    //@TO-DO: scrivo il contenuto della richiesta nel DB e restituisco uno stato positivo o negativo
    res.send('You sent a new note to save');
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
