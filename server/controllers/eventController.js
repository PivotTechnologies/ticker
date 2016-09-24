const models = require('../models/models');
const seatgeek = require('../config/seatgeekHelper');
const moment = require('moment');
module.exports = {

    findOrMake: (req, res) => {

      models.Event.findOne({
          where: {
            name: {
              $iLike: req.body.event.name
            },
            venue: {
              $iLike: req.body.event.venue
            },
            date: {
              $iLike: req.body.event.date
            },
          }
        })
        .then( event => {
          if(!event){
            const newEvent = models.Event.create({
              name: req.body.event.name,
              venue: req.body.event.venue,
              city: req.body.event.city,
              time: req.body.event.time,
              category: req.body.event.category,
              date: req.body.event.date
            })
            .then( (event) => {
              console.log('New event created: ', event.dataValues);
              res.send(event.dataValues);
            })
            .catch( err => console.log('Error:', err) );
          }
          else {
            console.log('found it!');
            res.send(event.dataValues);
          }
        })
        .catch( err => console.log('Error:', err) );
    },

    buyerSearch: (req, res) => {
      const results = [];

      where = {};
      if(req.query.query){
        where = {
          $or: [
            { name: { $iLike: '%'+req.query.query+'%' } },
            { category: { $iLike: '%'+req.query.query+'%' } },
            { venue: { $iLike: '%'+req.query.query+'%' } },
          ]
        }
      }
      if(req.query.date){
        const momentObj = moment(req.query.date, "YYYY-MM-DD");
        const dateStart = momentObj.format('YYYY-MM-DDTHH:mm:ss');
        const dateEnd = momentObj.add(24, 'hours').format('YYYY-MM-DD HH:mm:ss');
        console.log('dateStart = ', dateStart);
        console.log('dateEnd = ', dateEnd);
        where = {
          datetime_local: {
            $gte: dateStart,
            $lte: dateEnd
          }
        };
      }
      if(req.query.location){
        var city, state;
        if(req.query.location.includes(',')) {
          let arr = req.query.location.split(',');
          city = arr[0]; console.log('city = ', city);
          state = arr[1]; console.log('state', state);
          where = {
            $or: [
              { city: { $iLike: '%'+city+'%' } },
              { state: { $iLike: '%'+state+'%' } }
            ]
          }
        }
        else {
          where = {
            $or: [
              { city: { $iLike: '%'+req.query.location+'%' } },
              { state: { $iLike: '%'+req.query.location+'%' } }
            ]
          }
        }
      }

      models.Event.findAll({
        where
      })
      .then( events => {
        events.forEach( event => results.push(event.dataValues) );
        console.log('\033[34mSending data: \033[0m');
        console.log(results);
        res.json(results);
      })
      .catch( err => {
        console.log('Error:', err.message);
        res.send(err.message);
      });

    },

    sellerSearch: (req, res) => {
      // make a call to seatgeekAPI
      //console.log("req.query.query", req.query.query);
      seatgeek.getEvents(req.query.query)
        .then(function(results) {
        //console.log("results :", results);
      res.json(results);
      });
    },

    fetch: (req, res) => {
      models.Event
        .findOne({
          where: {
            id: req.query.eventId
          }
        })
        .then( event => {
          if(event) {
            res.json(event.dataValues);
          }
          else {
            res.send("Event not found.");
          }
        })
        .catch( err => console.log(err) )
    }

}
