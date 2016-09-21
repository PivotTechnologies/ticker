const User = require('../models/userModel');
const Event = require('../models/eventModel');
const Auction = require('../models/auctionModel');

var event = Event.create({
  name: 'Beyonce',
  category: 'Pop',
  venue: "Hollywood Bowl",
  city: "Los Angeles",
  time: '8:00 pm',
  date: '2016-09-25',
});

 event = Event.create({
  name: 'Goatherder',
  category: 'Metal',
  venue: "Wiltern",
  city: "Los Angeles",
  time: '9:00 pm',
  date: '2016-09-20',
});

 event = Event.create({
  name: 'Metronomy',
  category: 'Rock',
  venue: "Echo",
  city: "Los Angeles",
  time: '6:00 pm',
  date: '2016-09-12',
});

 event = Event.create({
  name: 'Pretty Lights',
  category: 'EDM',
  venue: "Paladium",
  city: "Los Angeles",
  time: '5:00 pm',
  date: '2016-09-18',
});

 event = Event.create({
  name: 'Lapalux',
  category: 'EDM',
  venue: "Orpheum",
  city: "Los Angeles",
  time: '6:00pm',
  date: '2016-09-19',
});

 event = Event.create({
  name: 'Crystal Castles',
  category: 'Pop',
  venue: "Fonda",
  city: "Los Angeles",
  time: '7:00 pm',
  date: '2016-09-20',
});

 event = Event.create({
  name: 'Anderson .Paak',
  category: 'Hip hop',
  venue: "Forum",
  city: "Los Angeles",
  time: '9:00 pm',
  date: '2016-09-20',
});
