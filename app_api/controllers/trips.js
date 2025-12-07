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
    console.error('Error finding trip by code:', err);
    return res.status(500).json({ message: 'Error finding trip' });
  }
};

module.exports.tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    return res.status(201).json(trip);
  } catch (err) {
    console.error('Error adding trip:', err);
    return res.status(400).json({ message: 'Error adding trip' });
  }
};

module.exports.tripsUpdateTrip = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const trip = await Trip.findOneAndUpdate(
      { code: tripCode },
      req.body,
      { new: true }
    ).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error('Error updating trip:', err);
    return res.status(400).json({ message: 'Error updating trip' });
  }
};

module.exports.tripsDeleteTrip = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const result = await Trip.deleteOne({ code: tripCode }).exec();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(204).json(null);
  } catch (err) {
    console.error('Error deleting trip:', err);
    return res.status(400).json({ message: 'Error deleting trip' });
  }
};

