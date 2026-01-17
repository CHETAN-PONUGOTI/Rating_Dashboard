const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware(['owner']));
router.get('/dashboard', ownerController.getStoreDashboard);

module.exports = router;