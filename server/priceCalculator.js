function findCoefficients(startPrice, endPrice, startTime, endTime) {
  const b = (Math.log(.25) / ((startTime - endTime) / 2));
  const a = ((startPrice - endPrice) / (Math.exp(b*endTime)));

  return {
    a: a,
    b: b
  };
}

function calculatePrice(currentTime, startTime, startPrice, a, b) {
  const timeChange = currentTime - startTime;
  return startPrice - (a*(Math.exp(b*timeChange)));
}

var coef = findCoefficients(500,200,0,400);
var price = calculatePrice(50, 0, 500, coef.a, coef.b);
console.log(price)
