const express = require("express");

const router = express.Router();

const app = express();

const port = 4000;

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

//EASY
app.get('/hello', (req, res) => {
    res.send('Hello World!')
})


//MEDIUM
app.get('/greet/:name?', (req, res) => {
    const name = req.params.name;

    if (name && name.trim() !== "") {
        res.send('Hello ' + name);
    } else {
        res.send('Hello!');
    }
});


//HARD

let notes = [];

app.get('/notes', (req, res) => {
    
    if(notes.length !== 0) {
       let allNotes = notes.map((note, index) => `Note ${index + 1}: ${note}`).join('\n');
       res.send(allNotes);
        
    } else {
        res.send("There are no added notes , to add a note do:  /notes/Type your note here");
    }
});

app.post('/notes/:note',(req, res) => {

    const note = req.params.note;

    if(note && note.trim() !== ""){
        notes.push(note);
        res.send("You can access you Note by doing /notes in the url")
    }else {
        res.send("You did not write a note in the path should look like this example /notes/I had a great day");
    }
});
