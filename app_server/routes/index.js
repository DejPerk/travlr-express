const express = require('express');
const router = express.Router();

const homeCtrl = require('../controllers/home');
const travelCtrl = require('../controllers/travel');

router.get('/', homeCtrl.index);
router.get('/travel', travelCtrl.index);

module.exports = router;
