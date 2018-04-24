var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hey. It worked!');
    reject('Ohh no. It did not work.');
  }, 2500);
});

somePromise.then((message) => {
  console.log(message);
}, (errorMessage) => {
  console.log(errorMessage);
});