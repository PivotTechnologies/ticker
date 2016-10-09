const models = require('../models/models');
const seatgeek = require('../config/seatgeekHelper');
const moment = require('moment');

module.exports = {

    buyerSearch: (req, res) => {
      const results = [];
      let keywordQuery, dateQuery, locationQuery;

      if (req.query.query){
        keywordQuery = {
          $or: [
            { name: { $iLike: '%'+req.query.query+'%' } },
            { category: { $iLike: '%'+req.query.query+'%' } },
            { venue: { $iLike: '%'+req.query.query+'%' } },
          ]
        }
      }

      if (req.query.date){
        const momentObj = moment(req.query.date, "YYYY-MM-DD");
        const dateStart = momentObj.format('YYYY-MM-DDTHH:mm:ss');
        const dateEnd = momentObj.add(24, 'hours').format('YYYY-MM-DD HH:mm:ss');
        dateQuery = {
          eventDate: {
            $gte: dateStart,
            $lte: dateEnd
          }
        };
      }

      if (req.query.location){
        var city, state;
        if(req.query.location.includes(',')) {
          let arr = req.query.location.split(',');
          city = arr[0]; console.log('city = ', city);
          state = arr[1]; console.log('state', state);
          locationQuery = {
            $or: [
              { city: { $iLike: '%'+city+'%' } },
              { state: { $iLike: '%'+state+'%' } }
            ]
          }
        }
        else {
          locationQuery = {
            $or: [
              { city: { $iLike: '%'+req.query.location+'%' } },
              { state: { $iLike: '%'+req.query.location+'%' } }
            ]
          }
        }
      }

      models.Event.findAll({
        where: {
          $and: [
            keywordQuery,
            dateQuery,
            locationQuery,
            { numAuctions: { $gt: 0 } }
          ]
        }
      })
      .then( events => {
        events.forEach( event => {
          var convertedEventTime = moment(event.dataValues.eventDate).tz(event.dataValues.timezone).add(7, 'h').format('YYYY-MM-DDTHH:mm:ss');
          event.dataValues.eventDate = convertedEventTime;
          results.push(event.dataValues);
        });
        console.log('\033[34mSending data: \033[0m');
        // console.log(results);
        res.json(results);
      })
      .catch( err => {
        console.log('Error:', err.message);
        res.send(err.message);
      });

    },

    sellerSearch: (req, res) => {
      seatgeek.getEvents(req.query.query)
      .then(function(results) {
        res.json(results);
      });
    },

    fetchById: (req, res) => {
      models.Event
        .findOne({
          where: {
            id: req.query.eventId
          }
        })
        .then( event => {
          if (event) {
            res.json(event.dataValues);
          }
          else {
            res.send("Event not found.");
          }
        })
        .catch( err => console.log(err) )
    }

}
