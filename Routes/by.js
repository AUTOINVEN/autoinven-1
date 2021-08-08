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
        var curItems = usageWH.ContractInfo(req, res, app, db);
        var nextItems = usageWH.NextInfo(req, res, app, db);
        var preItems = usageWH.PreviousInfo(req, res, app, db);
        curItems = JSON.parse(curItems);
        nextItems = JSON.parse(nextItems);
        preItems = JSON.parse(preItems);
        res.render('User/Buyer/by_UsageStatus', {'app': app, 'session': req.session, 'db': db, 'curItems': curItems, 'preItems': preItems, 'nextItems': nextItems});
    });

    router.post('/UsageStatus/INFO', function (req, res, next) {
        var WHitems = usageINFO.getWHInfo(req, res, app, db);
        var PVitems = usageINFO.getPVInfo(req, res, app, db);
        WHitems = JSON.parse(WHitems);
        PVitems = JSON.parse(PVitems);
        res.render('User/Buyer/by_UsageInfo', {'app': app, 'session': req.session, 'db': db, 'WHitems': WHitems, 'PVitems': PVitems});
    });

    router.post('/RequestStatus/Buy/Ans', function (req, res, next) {
        requestWH.ReqBuyWithAnswer(req, res, app, db);
    });

    return router;
};
