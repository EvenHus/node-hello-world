const _request = require('request');
const _helper = require('../_helper');

var geoCodeAddress = (address) => {
  var encodedString = encodeURIComponent(address);
  var urlFromUser = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedString}`;

  return new Promise((resolve, reject) => {
    _request({
      url: urlFromUser,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to servers');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address.');
      } else if (body.status === 'INVALID_REQUEST') {
        reject('Invalid address.');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng,
        });
      }
    });
  });
};

geoCodeAddress('0196 konows gate').then((location) => {
  console.log(location);
}).catch((errorMessage) => {
  console.log(errorMessage);
});