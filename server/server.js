const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('./config/middleware')(app, express);
require('./config/routes')(app, express);

app.listen(port, () => console.log('\033[34m🎟  Ticker server listening on port: \033[0m', port) );
