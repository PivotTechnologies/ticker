const bcrypt = require('bcrypt');

/*
* Password Helper Functions: Promisify bcrypt's hash() and compare()
*/

function hash(param) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(param, 10, function(error, hash) {
      if (error) {
        reject(error);
      } else {
        resolve(hash);
      }
    });
  });
}

function compare(param, hash) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(param, hash, function(error, result) {
      if (result) {
        resolve(result);
      }
      reject(error)
    });
  });
}

module.exports = {
  hash: hash,
  compare: compare
}
