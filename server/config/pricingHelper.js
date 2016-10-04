const moment = require('moment-timezone');

function findCoefficients(startPrice, minPrice, auctionStartTime, eventTime) {
  const b = (Math.log(.25) / ((auctionStartTime - eventTime) / 2));
  const a = ((startPrice - minPrice) / (Math.exp(b*(eventTime - auctionStartTime))));

  return {
    a: a,
    b: b
  };
}

function calculatePrice(auctionStartTime, startPrice, a, b) {
  const now = new Date();
  const currentTime = new Date(moment.tz(now, 'America/Los_Angeles').format('YYYY-MM-DDTHH:mm:ss'));
  const timeChange = currentTime - auctionStartTime;

  return (startPrice - (a*(Math.exp(b*timeChange)))).toFixed(2);
}

module.exports = {
  findCoefficients: findCoefficients,
  calculatePrice: calculatePrice
}

console.log(findCoefficients(40, 20, new Date('2016-10-03 19:05:30+00'), new Date('2016-10-03 19:30:00+00')))
console.log(calculatePrice(new Date('2016-10-03 19:05:30+00'), 40, 1.25, 0.0000018861147770338648))
