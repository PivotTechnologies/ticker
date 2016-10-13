# ticker

[ticker](http://www.ticker.herokuapp.com/) is a ticket resale platform based on the Dutch auction system, a method of selling in which the price is reduced until a buyer is found. Our app simplifies and automates the selling process for the ticket holder, while providing last minute deals on tickets for buyers.

![Screenshot](/client/assets/images/ticker.png?raw=true "Optional Title")

###Prerequisites
* Need to have Node installed
* Need to have a SQL compatible database

### To Install or Contribute to ticker:

* Fork the repo
* Clone down locally to your machine
* Navigate into project root folder

```
npm install
```

* Rename the .sample-env file to .env and fill out the required keys

* Run the server from project root folder

```
npm start
```

* Visit localhost 3000 to see application

### Front-end

ticker is built with React with Redux and styled with Material-UI.

### Back-end

ticker utilizes a custom built RESTful API built with Node and Express that handles file uploading/serving, authentication, and routing for other API calls (PayPal, SeatGeek, Google Maps). Data is handled by Sequelize and PostgresSQL.

### Tools Used:

* [React](https://facebook.github.io/react/)
* [React-Redux](https://github.com/reactjs/redux)
* [Webpack](https://webpack.github.io/)
* [Babel](https://babeljs.io/)
* [React-Router](https://github.com/rackt/react-router)
* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Material-UI](http://www.material-ui.com/#/)
* [Sequelize](http://docs.sequelizejs.com/en/v3/)
* [PostgresSQL](https://www.postgresql.org/)
* [JSON Web Tokens](https://jwt.io/)

## Pivot Technologies

* [Eugene Row](https://github.com/eugenerow)
* [Carling Sugarman](https://github.com/carsugar)
* [Kinjal Chatterjee](https://github.com/kinjalch)
