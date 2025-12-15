const express = require('express');
const router = express.Router();

const { expressjwt: jwt } = require('express-jwt');

// middleware to protect routes
const auth = jwt({
  secret: 'MY_SECRET_KEY',
  algorithms: ['HS256'],
  userProperty: 'payload'
});

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');

// authentication routes
router.post('/users/register', ctrlAuth.register);
router.post('/users/login', ctrlAuth.login);

// trip routes
router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(auth, ctrlTrips.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(ctrlTrips.tripsFindByCode)
  .put(auth, ctrlTrips.tripsUpdateTrip)
  .delete(auth, ctrlTrips.tripsDeleteTrip);

module.exports = router;
