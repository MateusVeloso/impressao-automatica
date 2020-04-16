// Another example of logging out within the child process
var log = require('electron-log');
log.transports.console.level = 'info';
log.transports.file.level = 'info';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    log.info('serving impression page...');
    res.render('impression', { title: 'Impressão Automática' });
});

module.exports = router;