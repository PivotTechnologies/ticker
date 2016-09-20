const User = require('../models/userModel');

module.exports = {
    signup: (req, res) => {
      res.send('signup');
    },
    signin: (req, res) => {
      res.send('signin');
    },
    fetch: (req, res) => {
      res.send('fetch');
    }
}
