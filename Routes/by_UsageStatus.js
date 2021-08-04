var date = require('../Public/JS/date.js');

exports.ContractInfo = function (req, res, app, db) {
    var today = date.getToday();
    var items = {};
    var sql = `select *, Contract.price as totalPrice from Contract, Warehouse where Warehouse.warehouseID=Contract.warehouseID and buyerID='` + req.session['memberID'] + `' and endDate >= '` + [today] + `' and startDate <= '` + [today] + `';`
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                reqID: results[step].reqID,
                warehouseID: results[step].warehouseID,
                warehouseName: results[step].warehouseName,
                startDate: results[step].startDate.substring(0, 10),
                endDate: results[step].endDate.substring(0, 10),
                area: results[step].area,
                totalPrice: results[step].totalPrice,
                iotStat: results[step].iotStat
            };
        }
    }
    return JSON.stringify(items);
}

exports.NextInfo = function (req, res, app, db) {
    var today = date.getToday();
    var items = {};
    var sql = `select *, Contract.price as totalPrice from Contract, Warehouse where Warehouse.warehouseID=Contract.warehouseID and buyerID='` + req.session['memberID'] + `' and startDate > '` + [today] + `';`
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                reqID: results[step].reqID,
                warehouseID: results[step].warehouseID,
                warehouseName: results[step].warehouseName,
                startDate: results[step].startDate.substring(0, 10),
                endDate: results[step].endDate.substring(0, 10),
                area: results[step].area,
                totalPrice: results[step].totalPrice,
                iotStat: results[step].iotStat
            };
        }
    }
    return JSON.stringify(items);
}

exports.PreviousInfo = function (req, res, app, db) {
    var today = date.getToday();
    var items = {};
    var sql = `select *, Contract.price as totalPrice from Contract, Warehouse where Warehouse.warehouseID=Contract.warehouseID and buyerID='` + req.session['memberID'] + `' and endDate < '` + [today] + `';`
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                reqID: results[step].reqID,
                warehouseID: results[step].warehouseID,
                warehouseName: results[step].warehouseName,
                startDate: results[step].startDate.substring(0, 10),
                endDate: results[step].endDate.substring(0, 10),
                area: results[step].area,
                totalPrice: results[step].totalPrice,
                iotStat: results[step].iotStat
            };
        }
    }
    return JSON.stringify(items);
}