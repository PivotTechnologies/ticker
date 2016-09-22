const request = require('request');
require('dotenv').config();

function getEvents(query) {
  return new Promise(function(resolve, reject) {
    request({
      url: process.env.api_url,
      qs: {
        'client_id': process.env.api_clientId,
        'client_secret': process.env.api_Secret,
        'q' : query
      },
      method: 'GET',
    }, function(error, response, body){
      if (body) {
        var body = JSON.parse(body);
        var filteredBody = [];
        body.events.forEach(function(event){
          filteredBody.push({
            name: event.title,
            category: event.taxonomies[0].name,
            image: event.performers[0].image,
            datetime_local: event.datetime_local,
            timezone: event.venue.timezone,
            venue: event.venue.name,
            address: event.venue.address,
            city: event.venue.city,
            state: event.venue.state,
            zip: event.venue.postal_code,
            latitude: event.venue.location.lat,
            longitude: event.venue.location.lon
          });
        });
        console.log(filteredBody);
        resolve(filteredBody);
      } else {
        console.log(error);
        reject(error);
      }
    });
  });
}

module.exports = {
  getEvents: getEvents
}
