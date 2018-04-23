console.log('starting app..');

const fs = require('fs');
const _lodash = require('lodash');
const _yargs = require('yargs');

const notes = require('./notes');

const argv = _yargs.argv;
var command = argv._[0];
// console.log('Command', command);
// console.log('Process', process.argv);
// console.log('Yargs', argv);

switch(command) {
    case 'add':
        var note = notes.setNote(argv.title, argv.body);
        if (note) {
            console.log('New note added with title: ', note.title);
        } else {
            console.log('\nThe title already exsists');
        }

        break;
    case 'list':
        var getAll = notes.getAll();
        if (getAll) {
            console.log(getAll);
        }
        break;
    case 'read':
        var getNote = notes.getNote(argv.title);
        if (getNote) {
            console.log('Title: ', getNote.title, ', Body: ', getNote.body);
        }
        break;
    case 'remove':
        var noteRemoved = notes.removeNote(argv.title);
        var message = noteRemoved ? 'note was removed' : 'Note not found';
        console.log(message);
        break;
    default:
        console.log('Command not reconized');
}