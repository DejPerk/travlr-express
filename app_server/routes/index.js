const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlTraveler = require('../controllers/traveler');

router.get('/', ctrlMain.index);
router.get('/travel', ctrlTraveler.list);

module.exports = router;
