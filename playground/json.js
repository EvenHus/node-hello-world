// var obj = {
//     name: "Even",
//     password: "test123.",
//     secret: "hkjabsdkjabs"
// };
//
// var stringObj = JSON.stringify(obj);
//
// console.log(typeof stringObj);
// console.log(stringObj);

// var personString = '{"name": "Even", "age": 24}';
//
// var person = JSON.parse(personString);
//
// console.log(typeof person);
// console.log(person);

const fs = require('fs');

var originalNote = {
    title: 'Some title',
    body: 'Some title'
};

var saveString = JSON.stringify(originalNote);

fs.writeFileSync('notes.js', saveString);

var noteString  = fs.readFileSync('notes.js');

var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);