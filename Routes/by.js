module.exports = function (app, db) {
    var express = require('express');
    var router = express.Router();
    var findWH = require('./by_FindWH');
    var requestWH = require('./by_RequestStatus');
    var usageWH = require('./by_UsageStatus');
    var usageINFO = require('./by_UsageInfo');

    var check = (req, res, next) => {
        var type = req.session['type'];
        if (!type) res.render('Alert/needLogin');
        else if (type === 'buyer') next();
        else res.render('Alert/cannotAccess');
    };
    router.use(check);

    router.get('/', function (req, res, next) {
        res.render('User/Buyer/by_FindWH', {'app': app, 'session': req.session, 'db': db});
    });
    router.post('/FindWH/FindImage', function (req, res, next) {
        var items = findWH.findImage(req, res, app, db);
        res.send(JSON.parse(items));
    });
    router.post('/FindWH/Inquire', function (req, res, next) {
        findWH.inquireWH(req, res, app, db);
    });
    router.get('/FindWH', function (req, res, next) {
        var items = findWH.findWH(req, res, app, db);
        res.render('User/Buyer/by_FindWH', {'app': app, 'session': req.session, 'db': db, 'items': items});
    });

    router.get('/RequestStatus', function (req, res, next) {
        var items = requestWH.RequestForBuy(req, res, app, db);
        items = JSON.parse(items);
        res.render('User/Buyer/by_RequestStatus', {'app': app, 'session': req.session, 'db': db, 'items': items});
    });

    router.get('/UsageStatus', function (req, res, next) {
        var items = usageWH.ContractInfo(req, res, app, db);
        items = JSON.parse(items);
        res.render('User/Buyer/by_UsageStatus', {'app': app, 'session': req.session, 'db': db, 'items': items});
    });

    router.post('/UsageStatus/INFO', function (req, res, next) {
        var reqID = req.body.reqID;
        var items = usageINFO.PVWHInfo(req, res, app, db);
        console.log(items);
        items = JSON.parse(items);
        res.render('User/Buyer/by_UsageINFO', {'app': app, 'session': req.session, 'db': db, 'items': items});
    });

    router.post('/RequestStatus/Buy/Ans', function (req, res, next) {
        requestWH.ReqBuyWithAnswer(req, res, app, db);
    });

    return router;
};
