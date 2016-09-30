function findCoefficients(startPrice, minPrice, auctionStartTime, eventTime) {
  const b = (Math.log(.25) / ((auctionStartTime - eventTime) / 2));
  const a = ((startPrice - minPrice) / (Math.exp(b*(eventTime - auctionStartTime))));

  return {
    a: a,
    b: b
  };
}

function calculatePrice(auctionStartTime, startPrice, a, b) {
  const currentTime = new Date();
  const timeChange = currentTime - auctionStartTime;

  return (startPrice - (a*(Math.exp(b*timeChange)))).toFixed(2);
}

module.exports = {
  findCoefficients: findCoefficients,
  calculatePrice: calculatePrice
}
