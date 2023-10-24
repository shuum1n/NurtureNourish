const express = require('express')
const router = express.Router()
const ProfileController = require('../controllers/profileController');

router.get('/profiles', ProfileController.getProfile);
router.put('/profiles', ProfileController.updateProfile);


module.exports = router;