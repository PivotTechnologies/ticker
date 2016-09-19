const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('./config/middleware')(app, express);
require('./config/routes')(app, express);

app.listen(port, () => {
  console.log('🎟  Ticker server listening on port: ', port);
});
