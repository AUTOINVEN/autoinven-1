module.exports = function (app, db) {
    var express = require('express');
    var router = express.Router();
    var main_Home = require('./main_Home');

    router.get('/', function (req, res, next) {
        var items = main_Home.searchWH(req, res, app, db);
        res.render('main_Home', {'app': app, 'session': req.session, 'db': db, 'items': items});
    });

    return router;
};
