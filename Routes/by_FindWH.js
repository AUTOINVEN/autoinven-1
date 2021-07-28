exports.findWH = function (req, res, app, db) {
    var items = {};
    let results = db.query(`SELECT * from Warehouse where enroll='Y'`);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                warehouseID: results[step].warehouseID,
                warehouseName: results[step].warehouseName,
                enrolledDate: results[step].enrolledDate,
                address: results[step].address,
                latitude: results[step].latitude,
                longitude: results[step].longitude,
                landArea: results[step].landArea,
                floorArea: results[step].floorArea,
                useableArea: results[step].useableArea,
                price: results[step].price,
                infoComment: results[step].infoComment,
                etcComment: results[step].etcComment,
                zipcode: results[step].zipcode,
                iotStat: results[step].iotStat,
                enroll: results[step].enroll
            };
        }
    }
    return JSON.stringify(items);
}

exports.findImage = function (req, res, app, db) {
    var items = {};
    let results = db.query(`SELECT * from FileInfo where warehouseID=${req.body.warehouseID}`);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`image${step}`] = {
                title: results[step].filename,
                url: `../../Public/Upload/${results[step].filename}`
            };
        }
    }
    return JSON.stringify(items);
}

exports.inquireWH = function (req, res, app, db) {
    var mysql = require('mysql');
    var connection = mysql.createConnection(require('../Module/db').info);
    connection.connect();
    let reqResult = db.query('SELECT * from RequestForBuy ORDER BY reqID DESC');
    var reqno = 1;
    if (reqResult.length > 0)
        reqno = reqResult[0].reqID + 1;
    var reqItem = {
        reqID: reqno,
        reqDate: new Date(),
        reqType: "ReqByBuyer",
        buyerID: req.session['memberID'],
        warehouseID: parseInt(req.body.warehouseID),
        area: parseInt(req.body.area),
        startDate: req.body.startDate,
        endDate: req.body.endDate
    };
    connection.query('INSERT INTO RequestForBuy SET ?', reqItem, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(false);
            connection.end();
        } else {
            res.send(true);
            connection.end();
        }
    })
}

exports.RequestWH = function (req, res, app, db) {
    var mysql = require('mysql');
    var connection = mysql.createConnection(require('../Module/db').info);
    connection.connect();
    let reqResult = db.query('SELECT * from RequestForBuy ORDER BY reqID DESC');
    var reqno = 1;
    if (reqResult.length > 0)
        reqno = reqResult[0].reqID + 1;

    var reqBuy = {
        reqID: reqno,
        reqDate: CURRENT_TIMESTAMP(),
        reqType: "RequestBuy_byBuyer",
        warehouseID: req.body.warehouseID,
        buyerID: req.body.buyerID,
        area: req.body.area,
    };
    connection.query('INSERT INTO RequestForBuy SET ?', reqBuy, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send(false);
        } else {
            var logitem = {
                logType: "RequestBuy_byBuyer",
                logDate: CURRENT_TIMESTAMP(),
                logComment: `${req.body.buyerID}가 ${req.body.warehouseID}를 창고공유요청함`
            }
            connection.query('INSERT INTO Log SET ?', logitem, function (error, results, fields) {
                if (error) {
                    console.log("error ocurred", error);
                    res.send(false);
                } else {
                    res.send(true);
                }
            });
        }
    });
    connection.end()
}
