const express = require('express');
const authRoutes = require('./server/auth/auth.route');
const router = express.Router();

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);

module.exports = router;
