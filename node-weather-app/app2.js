const _yargs = require('yargs');
const _axios = require('axios');
const _helper = require('./_helper');

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


var encodedString = encodeURIComponent(argv.a);
var geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedString}`;

_axios.get(geoCodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = _helper.darkskyurl + `${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return _axios.get(weatherUrl);
}).then((response) => {
  var teperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var summary = response.data.currently.summary;
  var humidity = response.data.currently.humidity;
  var windspeed = response.data.currently.windSpeed;

  console.log('Temp: ', parseFloat((teperature-32)*5/9) + '°C');
  console.log('Apparent temp: ', parseFloat((apparentTemperature-32)*5/9) + '°C');
  console.log('Summary: ', summary);
  console.log('Humidity: ', humidity);
  console.log('Windspeed: ', windspeed);

}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('Unable to connect to api servers');
  } else {
    console.log(error.message);
  }
});