const Trip = require('../models/travlr');

exports.index = async (req, res) => {
  try {
    const trips = await Trip.find().sort('start').exec();

    res.render('travel', {
      title: 'Travel Packages',
      trips: trips.map(t => ({
        name: t.name,
        priceDisplay: t.price ? `$${t.price.toLocaleString()}` : t.perPerson,
        start: t.start.toISOString().substring(0, 10),
        nights: t.nights || t.length
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading trips');
  }
};

exports.apiList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error loading trips' });
  }
};
