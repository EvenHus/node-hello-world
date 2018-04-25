const _yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = _yargs
  .options({
    a: {
      describe: 'Address to fetch weather for',
      demand: true,
      alias: 'a',
      string: true
    }})
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    //console.log(JSON.stringify(results, undefined, 2));
    console.log(`Weather for ${results.address}`);
    weather.temperatur(results.latitude, results.longitude, (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage)
      } else {
        console.log(JSON.stringify(results, undefined, 2));
      }
    });
  }
});


