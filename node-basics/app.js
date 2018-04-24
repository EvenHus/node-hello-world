const fs = require('fs');
const _lodash = require('lodash');
const _yargs = require('yargs');

const notes = require('./notes');

var titleOptions = {
  describe: 'Ttile of note',
  demand: true,
  alias: 't'
};

var bodyOptions = {
  describe: 'Add the body of the note',
  demand: true,
  alias: 'b'
};

const argv = _yargs
  .command('add', 'Add new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all the notes')
  .command('read', 'List note based on title', {
    title: titleOptions
  })
  .command('remove', 'Remove note based on title', {
    title: titleOptions
  })
  .help()
  .argv;

var command = argv._[0];
console.log(command);


switch (command) {
  case 'add':
    var note = notes.setNote(argv.title, argv.body);
    if (note) {
      notes.logNote(note);
    } else {
      console.log('\nThe title already exsists');
    }

    break;
  case 'list':
    var getAll = notes.getAll();
    console.log(`Printing ${getAll.length} note(s).`);
    getAll.forEach((note) => notes.logNote(note));
    break;
  case 'read':
    var getNote = notes.getNote(argv.title);
    if (getNote) {
      notes.logNote(getNote);
    } else {
      console.log('Note not found');
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