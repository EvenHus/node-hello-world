const _request = require('request');
const _helper = require('../_helper');

var temperatur = (lat, lng, callback) => {
  _request({
    url: _helper.darkskyurl+`${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        Temperature: ((body.currently.temperature-32)*5/9) + '°C',
        Summary: body.currently.summary,
        Humidity: body.currently.humidity,
        Windspeed: body.currently.windSpeed
      });
    } else {
      callback('Unable to fetch weather');
    }
  });
};

module.exports = {
  temperatur
};