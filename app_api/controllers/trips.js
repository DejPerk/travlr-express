const Trip = require('../models/travlr');
module.exports.tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    return res.status(200).json(trips);
  } catch (err) {
    console.error('Error getting trips:', err);
    return res.status(500).json({ message: 'Error getting trips' });
  }
};
module.exports.tripsFindByCode = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const trip = await Trip.findOne({ code: tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error('Error getting trip by code:', err);
    return res.status(500).json({ message: 'Error getting trip' });
  }
};


