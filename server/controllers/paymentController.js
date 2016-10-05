const braintree = require('braintree');
const request   = require('request');

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "yhthgck3p6q25b7z", // move these to .env file
  publicKey: "54szbjxs9j7d7fb8",
  privateKey: "f0039ca71804124cb64e8cdc4c3efd3a"
});

// const gateway = braintree.connect({
//   accessToken: 'access_token$sandbox$rj2j597ky38jpzxw$a989259230886a8673902efb50950d14'
// });

module.exports.client_token = function(req, res) {
  gateway.clientToken.generate({}, function(err, response) {
    res.send(response.clientToken);
  });
}

module.exports.checkout = function(req, res) {
  //var nonceFromTheClient = req.body.payment_method_nonce;
  var nonceFromTheClient = 'fake-valid-nonce';
  console.log('/checkout -> nonceFromTheClient = ', nonceFromTheClient);
  gateway.transaction.sale({
    amount: "110.00", // change to req.body.amount
    paymentMethodNonce: nonceFromTheClient,
    //options: { submitForSettlement: true }
  }, function(err, result) {
    console.log('/checkout - > result = ', result );
  });
}

module.exports.payout = function(req, res){
  var clientToken;
  /* Create request to get client token */
  var tokenOptions = {
    method: 'POST',
    url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
    headers: {
      'Content-Type'  : 'application/x-www-form-urlencoded',
       'Authorization': 'Basic QVdwVUlpSmFfZS02TnlVNFl6d1dSZTNlLVI0ZS1zdktUVXRTd3FWLW9sd29aMk1QV2l2MHd0WG1iOGNXbmJSNmpRQ0s4eU1WZHR4Y0JvakU6RURVNGdlMUJfLVdFR2kxX082OUI3ekFza3JBSE1Fbm1UU3BQSHo1UzZrVkJrYU5YWFk1bWZObVZYcHBhcmo5YVdUZFJoRGlLZ1E4QXE1WVc='
     },
    form: { grant_type: 'client_credentials' }
  };
  /* Perform request, save token */
  request(tokenOptions, function (error, response, body) {
    if (error) throw new Error(error);
    if(response){
      body = JSON.parse(body);
      clientToken = body.access_token;
      console.log('/payout -> token: ', body.access_token);
      performPayout();
    }
  });

  function performPayout(){
    /* POST request to paypal to perform payout */
    var payoutOptions = {
      method: 'POST',
      url: 'https://api.sandbox.paypal.com/v1/payments/payouts',
      //qs: { sync_mode: 'true' },
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + clientToken,
      },
      body: {
        sender_batch_header: { email_subject: 'You have a payment' },
        items: [
          { recipient_type: 'EMAIL',
            amount        : { value: 12.34, currency: 'USD' }, // replace with req.body.value
            receiver      : 'kinjalchatterjee-buyer@gmail.com',
            note          : 'Payment for recent T-Shirt delivery',
            sender_item_id: 'A123'
          }
        ]
      },
      json: true
    };
    request(payoutOptions, function (error, response, body) {
      if (error) throw new Error(error);
      else console.log('/payout -> payout status: ', body);
    });
  }

}

/*
accepting payment:
  - get client token via braintree/api/client_token, on login?
  - user enters payment info in drop-in ui component
  - post to /checkout using token & recieve nonce
    - perform gateway.transaction.Sale

pay seller:
  - generate paypal token
  - perform post to paypal.com/v1/payments/payouts
    - post.body should contain seller email addrress
  - OR: save payment info into database, perform post after 48 hours


client side drop in component:
braintree.setup(clientToken, "dropin", {
  container: "payment-form"
});

succesful token generation response:
{
  "scope": "https://uri.paypal.com/services/subscriptions https://api.paypal.com/v1/payments/.* https://api.paypal.com/v1/vault/credit-card https://uri.paypal.com/services/applications/webhooks openid https://uri.paypal.com/payments/payouts https://api.paypal.com/v1/vault/credit-card/.*",
  "nonce": "2016-10-04T02:19:00ZBzmMuZVFUsxzc4M67E2JGv1dBt1PYTyaovCyKVDBs8I",
  "access_token": "A101.c0W34ED5cYw1GDExKAZ6LjP6cDvVqd3vVFcLt5-0xr0RSFCGghl4Jr49NORzD9Z1.NMSNJeqzf-8IcWmOKXxjRLf8xiS",
  "token_type": "Bearer",
  "app_id": "APP-80W284485P519543T",
  "expires_in": 31607
}

succesful payout response:
{
  "batch_header": {
    "payout_batch_id": "YD956JTYMGPAE",
    "batch_status": "PENDING",
    "sender_batch_header": {
      "email_subject": "You have a payment"
    }
  },
  "links": [
    {
      "href": "https://api.sandbox.paypal.com/v1/payments/payouts/YD956JTYMGPAE",
      "rel": "self",
      "method": "GET"
    }
  ]
}

*/
