const _request = require('request');
const _helper = require('../_helper');

console.log(_helper.darkskyurl);

var geocodeAddress = (address, callback) => {
  var encodedString = encodeURIComponent(address);
  var urlFromUser = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedString}`;

  _request({
    url: urlFromUser,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to servers');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'INVALID_REQUEST') {
      callback('Invalid address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
      });
    }
  });
};

module.exports = {
  geocodeAddress
};