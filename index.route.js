const express = require('express');
const authRoutes = require('./server/auth/auth.route');
const cors = require('cors');
const router = express.Router();

router.get('/health-check', (req, res) => res.send('OK'));
router.options('/', cors());
router.use('/auth', authRoutes);

module.exports = router;
