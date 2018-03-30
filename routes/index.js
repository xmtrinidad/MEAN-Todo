const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Invalid entry point')
});

module.exports = router;