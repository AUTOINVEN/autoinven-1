module.exports = function (app, db) {
    const express = require('express');
    const router = express.Router();
    const ad_ReqEnroll = require('./ad_RequestEnroll');
    const ad_ReqIoT = require('./ad_RequestIoT');
    const ad_iotTest = require('./ad_iotTest');
    const ad_ReqBuy = require('./ad_RequestBuy');
    const ad_WarehouseList = require('./ad_WarehouseList');
    const WHinfo = require('./WHinfo');
    const ad_ContractInfo = require('./ad_ContractInfo');
    const ad_ContractInfoView = require('./ad_ContractInfoView');

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
    router.get('/WarehouseList', function (req, res, next) {
        var WHList = ad_WarehouseList.getWHList(req, res, app, db);
        WHList = JSON.parse(WHList);
        res.render('User/Admin/ad_WarehouseList', {'app': app, 'session': req.session, 'db': db, 'WHList': WHList});
    });
    router.post('/WHinfo', function (req, res, next) {
        var WHitems = WHinfo.getWHInfo(req, res, app, db);
        var PVitems = WHinfo.getPVInfo(req, res, app, db);
        var curItems = WHinfo.getCurUsage(req, res, app, db);
        var nextItems = WHinfo.getNextUsage(req, res, app, db);
        var preItems = WHinfo.getPreUsage(req, res, app, db);
        WHitems = JSON.parse(WHitems);
        PVitems = JSON.parse(PVitems);
        curItems = JSON.parse(curItems);
        nextItems = JSON.parse(nextItems);
        preItems = JSON.parse(preItems);
        res.render('User/WHinfo', {'req': req, 'app': app, 'session': req.session, 'db': db, 'WHitems': WHitems, 'PVitems': PVitems, 'curItems': curItems, 'preItems': preItems, 'nextItems': nextItems});
    });
    router.get('/ContractInfo', function (req, res, next) {
        var items = ad_ContractInfo.showContarctInfo(req, res, app, db);
        items = JSON.parse(items);
        res.render('User/Admin/ad_ContractInfo', {'app': app, 'session': req.session, 'db': db, 'items': items});
    });
    router.post('/ContractInfo/INFO', function (req, res, next) {
        var WHitems = ad_ContractInfoView.getWHInfo(req, res, app, db);
        var PVitems = ad_ContractInfoView.getPVInfo(req, res, app, db);
        var BYitems = ad_ContractInfoView.getBYInfo(req, res, app, db);
        WHitems = JSON.parse(WHitems);
        PVitems = JSON.parse(PVitems);
        BYitems = JSON.parse(BYitems);
        res.render('User/Admin/ad_ContractInfoView', {'app': app, 'session': req.session, 'db': db, 'WHitems': WHitems, 'PVitems': PVitems, 'BYitems': BYitems});
    });
    router.post('/RequestBuy/Ans', function (req, res, next) {
        ad_ReqBuy.withAnswer(req, res, app, db);
    });
    router.get('/Question', function (req, res, next) {
        res.render('User/Admin/ad_Question', {'app': app, 'session': req.session, 'db': db});
    });

    return router;
};
