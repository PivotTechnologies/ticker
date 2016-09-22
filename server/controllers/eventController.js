const Event = require('../models/eventModel');

module.exports = {

    findOrMake: (req, res) => {

      Event.findOne({
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
            const newEvent = Event.create({
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
            { name: { $iLike: req.query.query } },
            { category: { $iLike: req.query.query } },
            { venue: { $iLike: req.query.query } },
          ]
        }
      }
      if(req.query.date){
        where.date = { $iLike: req.query.date };
      }
      if(req.query.city){
        where.city = { $iLike: req.query.city }
      }

      Event.findAll({
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
      res.send('sellerSearch');
    },

    fetch: (req, res) => {

    }

}
