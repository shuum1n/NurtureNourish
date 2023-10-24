const express = require('express');
const PregnancyController = require('../controllers/pregnancyController');
const router = express.Router();

router.get('/pregnancies', PregnancyController.getPregnancy);
router.post('/pregnancies', PregnancyController.addPregnancy);


module.exports = router;