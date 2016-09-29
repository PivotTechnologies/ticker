const models = require('../models/models');
const password = require('../config/passwordHelper');
const jwt = require('jsonwebtoken');

module.exports = {

    signup: (req, res) => {
      const newUser = models.User.build({
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
              const token = jwt.sign(user.dataValues , 'tickerticker');
              res.json({
                id: user.id,
                firstName: user.firstName,
                email: user.email,
                username: user.username,
                token: token,
              });
            })
            .catch( error => console.log("Password hashing error: ", error) )
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
      models.User.findOne({
          where: {
            username: req.body.username
          },
          attributes: ['id', 'firstName', 'email', 'username', 'password']
        })
        .then( user => {
          if(!user) {
            res.status(500).send('User not found.');
          }
          else {
            password.compare(req.body.password, user.password)
              .then( result => {
                console.log('\033[34mUser logged in. \033[0m');
                const token = jwt.sign(user.dataValues, 'tickerticker');
                res.json({
                  id: user.id,
                  firstName: user.firstName,
                  email: user.email,
                  username: user.username,
                  token: token,
                });
              })
              .catch( error => {
                console.log("error:", error);
                res.status(500).send('Password incorrect.');
              })
          }
        })
        .catch( err => {
          console.log('Error:', err);
          res.status(500).send('Login information incorrect.');
        });
    },

    reauthenticate: (req, res) => {
      if (!req.body.token) {
        res.status(500).send('Token not found');
      } else {
        var decoded = jwt.verify(req.body.token, 'tickerticker');
        models.User.findOne({
          where: {
            email: decoded.email,
          }
        })
          .then( user => {
            console.log('\033[34mReauthenicated. \033[0m');
            res.json({
              id: user.id,
              firstName: user.firstName,
              email: user.email,
              username: user.username,
              token: req.body.token,
            });
          })
          .catch( err => {
            console.log('Error:', err);
          });
      }
    },

    fetchUserActivity: (req, res) => {
      const userId = parseInt(req.query.userId);

      const results = {
        buyerActivity: [],
        sellerActivity: {
          on_sale: [],
          sold: [],
          expired: [],
        },
      };

      models.Auction.findAll({
        where: {
          $or: [
            {
              buyerId: userId,
            },
            {
              sellerId: userId,
            }
          ]
        }
      })
      .then( auctions => {
        auctions.forEach( auction => {
          if (auction.dataValues.buyerId === userId) {
            results.buyerActivity.push(auction.dataValues);
          }
          if (auction.dataValues.sellerId === userId) {
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
