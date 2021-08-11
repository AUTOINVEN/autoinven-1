const viewInfo = require('./viewInfo');
const date = require('../Public/JS/date.js');

exports.getWHInfo = function (req, res, app, db) {
    var warehouseID = req.body.warehouseID;
    var items = {};
    items = viewInfo.getWHInfo(db, warehouseID);
    return items;
}

exports.getPVInfo = function (req, res, app, db) {
    var warehouseID = req.body.warehouseID;
    var items = {};
    let results = db.query(`select * from Warehouse, Provider where Warehouse.warehouseID=Provider.warehouseID and Warehouse.warehouseID=` + warehouseID + `;`);
    if (results.length > 0) {
        var providerID = results[0].memberID;
        items = viewInfo.getMemberInfo(db, providerID);
    }
    return items;
}

exports.getCurUsage = function (req, res, app, db) {
    var warehouseID = req.body.warehouseID;
    var today = date.getToday();
    var items = {};
    var sql = `select * from Contract, Member where Contract.buyerID=Member.memberID and warehouseID=` + warehouseID + ` and endDate >= '` + today + `' and startDate <= '` + today + `';`
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                reqID: results[step].reqID,
                buyerID: results[step].buyerID,
                startDate: results[step].startDate.substring(0, 10),
                endDate: results[step].endDate.substring(0, 10),
                area: results[step].area,
                totalPrice: results[step].price,
                name: results[step].name,
                national: results[step].national,
                zipcode: results[step].zipcode,
                address: results[step].address,
                email: results[step].email,
                contactNumber: results[step].contactNumber,
            };
        }
    }
    return JSON.stringify(items);
}

exports.getNextUsage = function (req, res, app, db) {
    var warehouseID = req.body.warehouseID;
    var today = date.getToday();
    var items = {};
    var sql = `select * from Contract, Member where Contract.buyerID=Member.memberID and warehouseID=` + warehouseID + ` and startDate > '` + today + `';`
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                reqID: results[step].reqID,
                buyerID: results[step].buyerID,
                startDate: results[step].startDate.substring(0, 10),
                endDate: results[step].endDate.substring(0, 10),
                area: results[step].area,
                totalPrice: results[step].price,
                name: results[step].name,
                national: results[step].national,
                zipcode: results[step].zipcode,
                address: results[step].address,
                email: results[step].email,
                contactNumber: results[step].contactNumber,
            };
        }
    }
    return JSON.stringify(items);
}

exports.getPreUsage = function (req, res, app, db) {
    var warehouseID = req.body.warehouseID;
    var today = date.getToday();
    var items = {};
    var sql = `select * from Contract, Member where Contract.buyerID=Member.memberID and warehouseID=` + warehouseID + ` and endDate < '` + today + `';`
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                reqID: results[step].reqID,
                buyerID: results[step].buyerID,
                startDate: results[step].startDate.substring(0, 10),
                endDate: results[step].endDate.substring(0, 10),
                area: results[step].area,
                totalPrice: results[step].price,
                name: results[step].name,
                national: results[step].national,
                zipcode: results[step].zipcode,
                address: results[step].address,
                email: results[step].email,
                contactNumber: results[step].contactNumber,
            };
        }
    }
    return JSON.stringify(items);
}
