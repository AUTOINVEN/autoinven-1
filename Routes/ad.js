module.exports = function (app, db) {
    const express = require('express');
    const router = express.Router();
    const ad_ReqEnroll = require('./ad_RequestEnroll');
    const ad_ReqIoT = require('./ad_RequestIoT');
    const ad_iotTest = require('./ad_iotTest');
    const ad_ReqBuy = require('./ad_RequestBuy');
    const ad_UsageHistory = require('./ad_UsageHistory');
    const ad_UsageHistoryInfo = require('./ad_UsageHistoryInfo');

    var check = (req, res, next) => {
        var type = req.session['type'];
        if (!type) res.render('Alert/needLogin');
        else if (type === 'admin') next();
        else res.render('Alert/cannotAccess');
    };
    router.use(check);

    router.get('/RequestEnroll', function (req, res, next) {
        var items = ad_ReqEnroll.RequestForEnroll(req, res, app, db);
        items = JSON.parse(items);
        res.render('User/Admin/ad_RequestEnroll', {'app': app, 'session': req.session, 'db': db, 'items': items});
    });
    router.post('/RequestEnroll', function (req, res, next) {
        ad_ReqEnroll.withAnswer(req, res, app, db);
    });
    router.get('/RequestIoT', function (req, res, next) {
        var items = ad_ReqIoT.RequestForIoT(req, res, app, db);
        items = JSON.parse(items);
        res.render('User/Admin/ad_RequestIoT', {'app': app, 'session': req.session, 'db': db, 'items': items});
    });
    router.post('/RequestIoT', function (req, res, next) {
        ad_ReqIoT.withAnswer(req, res, app, db);
    });
    router.post('/iotTest', function (req, res, next) {
        ad_iotTest.init(req, res, app, db);
    });
    router.get('/RequestBuy', function (req, res, next) {
        var items = ad_ReqBuy.RequestForBuy(req, res, app, db);
        items = JSON.parse(items);
        res.render('User/Admin/ad_RequestBuy', {'app': app, 'session': req.session, 'db': db, 'items': items});
    });
    router.get('/UsageHistory', function (req, res, next) {
        var items = ad_UsageHistory.getUsageHistory(req, res, app, db);
        items = JSON.parse(items);
        res.render('User/Admin/ad_UsageHistory', {'app': app, 'session': req.session, 'db': db, 'items': items});
    });
    router.post('/UsageHistory/INFO', function (req, res, next) {
        var WHitems = ad_UsageHistoryInfo.getWHInfo(req, res, app, db);
        var PVitems = ad_UsageHistoryInfo.getPVInfo(req, res, app, db);
        var BYitems = ad_UsageHistoryInfo.getBYInfo(req, res, app, db);
        WHitems = JSON.parse(WHitems);
        PVitems = JSON.parse(PVitems);
        BYitems = JSON.parse(BYitems);
        res.render('User/Admin/ad_UsageHistoryInfo', {'app': app, 'session': req.session, 'db': db, 'WHitems': WHitems, 'PVitems': PVitems, 'BYitems': BYitems});
    });
    router.post('/RequestBuy/Ans', function (req, res, next) {
        ad_ReqBuy.withAnswer(req, res, app, db);
    });
    router.get('/Question', function (req, res, next) {
        res.render('User/Admin/ad_Question', {'app': app, 'session': req.session, 'db': db});
    });

    return router;
};
