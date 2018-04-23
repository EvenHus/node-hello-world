console.log('Starting notes.js..');

const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    }
    catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var setNote = (title, body) => {
    var notes  = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    var allNotes = fetchNotes();
    return allNotes;
}

var getNote = (title) => {
    var singleNotes = fetchNotes();
    var singleNote = singleNotes.filter((note) => note.title === title);
    return singleNote[0];
}

var removeNote = (title) => {
    var notes = fetchNotes();
    var removedNotes = notes.filter((note) => note.title !==  title);
    saveNotes(removedNotes);

    return notes.length !== removedNotes.length;
}

module.exports = {
    setNote,
    getAll,
    getNote,
    removeNote
};
