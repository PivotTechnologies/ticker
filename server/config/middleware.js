const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const middleware = (app, express) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use('/', express.static('./client'));
  app.use(morgan('dev'));
};

module.exports = middleware;
