const User = require('../models/userModel');
const password = require('../config/passwordHelper');

module.exports = {

    signup: (req, res) => {
      const newUser = User.build({
        //username
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
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
      if (!req.body.email) {
        res.status(500).send('Email address required.');
      }
      if (!req.body.password) {
        res.status(500).send('Password required.');
      }
      User.findOne({
          where: {
            email: req.body.email
          },
          attributes: ['id', 'email', 'password']
        })
        .then( user => {
          password.compare(req.body.password, user.password)
            .then( result => {
              console.log('\033[34mUser logged in. \033[0m');
              res.send('Logged in.');
            })
            .catch( error => {
              res.status(500).send('Password incorrect.');
            })
        })
        .catch( err => {
          console.log('Error:', err);
          res.status(500).send('Login information incorrect.');
        });
    },

    fetch: (req, res) => {
      res.send('fetch');
    }
}
