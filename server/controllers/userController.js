const User = require('../models/userModel');
const Auction = require('../models/auctionModel');
const password = require('../config/passwordHelper');

module.exports = {

    signup: (req, res) => {
      const newUser = User.build({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        username: req.body.username
      });

      newUser
        .save()
        .then( user => {
          password.hash(req.body.password)
            .then( hash => {
              newUser.update({ password: hash });
              console.log("\033[34mNew user created. \033[0m");
              res.send('New user created.');
            })
            .catch( error => console.log("Password hashing error: ", erorr) )
        })
        .catch( err => {
          console.log(err);
          res.status(500).send(err);
        });
    },

    signin: (req, res) => {
      if (!req.body.username) {
        res.status(500).send('Username required.');
      }
      if (!req.body.password) {
        res.status(500).send('Password required.');
      }
      User.findOne({
          where: {
            username: req.body.username
          },
          attributes: ['id', 'email', 'username', 'password']
        })
        .then( user => {
          if(!user) {
            res.status(500).send('User not found.');
          }
          else {
            password.compare(req.body.password, user.password)
              .then( result => {
                console.log('\033[34mUser logged in. \033[0m');
                res.send('Logged in.');
              })
              .catch( error => {
                res.status(500).send('Password incorrect.');
              })
          }
        })
        .catch( err => {
          console.log('Error:', err);
          res.status(500).send('Login information incorrect.');
        });
    },

    fetchUserActivity: (req, res) => {
      const results = {
        buyerActivity: [],
        sellerActivity: {
          on_sale: [],
          sold: [],
          expired: [],
        },
      };

      Auction.findAll({
        where: {
          $or: [
            {
              buyerId: req.query.userID,
            },
            {
              sellerId: req.query.userID,
            }
          ]
        }
      })
      .then( auctions => {
        auctions.forEach( auction => {
          if (auction.dataValues.buyerID === req.query.userID) {
            results.buyerActivity.push(auction.dataValues);
          }
          if (auction.dataValues.sellerID === req.query.userID) {
            if (auction.dataValues.status === 'On Sale') {
              results.sellerActivity.on_sale.push(auction.dataValues);
            }
            if (auction.dataValues.status === 'Sold') {
              results.sellerActivity.sold.push(auction.dataValues);
            }
            if (auction.dataValues.status === 'Expired') {
              results.sellerActivity.expired.push(auction.dataValues);
            }
          }
        });
        res.json(results);
      })
      .catch( err => {
        console.log('Error:', err.message);
        res.send(err.message);
      });
    }
}
