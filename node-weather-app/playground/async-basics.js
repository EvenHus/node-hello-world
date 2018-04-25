console.log('Starting app..');

setTimeout(() => {
  console.log('inside of callback');
}, 1);

setTimeout(() => {
  console.log('0 seconds')
}, 0);

console.log('Fhinishing up..');