const path = require('path');
const fs = require('fs');

function loadTrips() {
  const file = path.join(__dirname, '..', 'data', 'trips.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

exports.index = (req, res) => {
  const trips = loadTrips();
  res.render('travel', {
    title: 'Travel Packages',
    trips: trips.map(t => ({ ...t, priceDisplay: `$${t.price.toLocaleString()}` }))
  });
};

exports.apiList = (req, res) => {
  res.json(loadTrips());
};
