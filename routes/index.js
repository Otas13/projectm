const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.html');
});

router.put('/api/put', apiController.persist);
router.get('/api/list', apiController.listTests);
router.get('/api/get/:id', apiController.getRecord);

module.exports = router;
