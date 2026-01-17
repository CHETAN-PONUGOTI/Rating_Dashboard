const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware(['user']));
router.get('/stores', userController.getStores);
router.post('/ratings', userController.submitRating);

module.exports = router;