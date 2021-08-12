exports.RequestForEnroll = function (req, res, app, db) {
    var items = {};
    var sql = `SELECT * from RequestForEnroll where providerID ="${req.session['memberID']}"`;
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                reqID: results[step].reqID,
                reqDate: results[step].reqDate,
                reqType: results[step].reqType,
                warehouseID: results[step].warehouseID,
                providerID: results[step].providerID
            };
        }
    }
    return JSON.stringify(items);
}

exports.RequestForBuy = function (req, res, app, db) {
    var items = {};
    var sql = "select * from RequestForBuy, Warehouse, Member where Member.memberID=RequestForBuy.buyerID and RequestForBuy.warehouseID=Warehouse.warehouseID and Warehouse.warehouseID in (SELECT warehouseID from Provider where memberID='" + req.session['memberID'] + "')";
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                reqID: results[step].reqID,
                reqDate: results[step].reqDate,
                reqType: results[step].reqType,
                warehouseID: results[step].warehouseID,
                warehouseName: results[step].warehouseName,
                address: results[step].address,
                floorArea: results[step].floorArea,
                useableArea: results[step].useableArea,
                amounts: results[step].price * results[step].area,
                startDate: results[step].startDate.substring(0, 10),
                endDate: results[step].endDate.substring(0, 10),
                buyerID: results[step].buyerID,
                name: results[step].name,
                email: results[step].email,
                contractNumber: results[step].contractNumber,
                national: results[step].national,
                area: results[step].area
            };
        }
    }
    return JSON.stringify(items);
}


exports.Mywarehouse = function (req, res, app, db) {
    var items = {};
    let sql = `SELECT * from Warehouse,Provider where Warehouse.warehouseID=Provider.warehouseID and Provider.memberID='${req.session['memberID']}' and enroll='Y'`;
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            sql = `select  distinct memberID from Buyer where warehouseID=${results[step].warehouseID}`;
            let rows = db.query(sql);
            let idList = [];
            for (row of rows) idList.push(row.memberID);
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
                infoComment: results[step].infoComment,
                etcComment: results[step].etcComment,
                iotStat: results[step].iotStat,
                enroll: results[step].enroll,
                memberList: idList
            };
        }
    }
    return JSON.stringify(items);
}

exports.ReqIoTAns = function (req, res, app, db) {
    var warehouseID = req.body.warehouseID;
    var mysql = require('mysql');
    var connection = mysql.createConnection(require('../Module/db').info);
    connection.connect();
    connection.query(`UPDATE Warehouse SET iotStat='W' WHERE warehouseID=?`, warehouseID, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(false);
            connection.end();
        } else {
            res.send(true);
            connection.end();
        }
    });
}

exports.ReqEnrollAns = function (req, res, app, db) {
    var warehouseID = req.body.whID;
    var reqID = req.body.reqID;
    var answer = req.body.answer;
    var reason = req.body.reason;
    var mysql = require('mysql');
    var connection = mysql.createConnection(require('../Module/db').info);
    connection.connect();
    if (answer == "Confirm") {
        connection.query(`DELETE FROM RequestForEnroll WHERE reqID =?`, reqID, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(false);
                connection.end();
            } else {
                res.send(true);
                connection.end();
            }
        });
    } else if (answer == "Cancel") {
        connection.query(`UPDATE RequestForEnroll SET reqType='CnlByPv', rejectCmt=? WHERE reqID =?`, [reason, reqID], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(false);
                connection.end();
            } else {
                var now = new Date(new Date().getTime() + 32400000).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                var cols = 'reqID, reqDate, reqType, providerID, warehouseID, rejectCmt';
                connection.query(`INSERT INTO DeletedEnroll (${cols}, rejectTime) (SELECT ${cols}, ? FROM RequestForEnroll WHERE reqID=?)`, [now, reqID], function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        res.send(false);
                        connection.end();
                    } else {
                        connection.query(`DELETE FROM Warehouse WHERE warehouseID=?`, warehouseID, function (error, results, fields) {
                            if (error) {
                                console.log(error);
                                res.send(false);
                                connection.end();
                            } else {
                                connection.query(`DELETE FROM FileInfo WHERE warehouseID=?`, warehouseID, function (error, results, fields) {
                                    if (error) {
                                        console.log(error);
                                        res.send(false);
                                        connection.end();
                                    } else {
                                        res.send(true);
                                        connection.end();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}

exports.ReqBuyAns = function (req, res, app, db) {
    var reqID = req.body.reqID;
    var reqType = req.body.reqType;
    var answer = req.body.answer;
    var reason = req.body.reason;
    var mysql = require('mysql');
    var connection = mysql.createConnection(require('../Module/db').info);
    connection.connect();
    if (answer == "Approve") {
        connection.query(`UPDATE RequestForBuy SET reqType='ReqPayByBuyer' WHERE reqID =${reqID}`, function (error, results, fields) {
            if (error) {
                res.send(false);
                connection.end();
            } else {
                res.send(true);
                connection.end();
            }
        });
    } else if (answer == "Cancel") {
        connection.query(`UPDATE RequestForBuy SET reqType='RejByPv', rejectCmt='${reason}' WHERE reqID =${reqID}`, function (error, results, fields) {
            if (error) {
                res.send(false);
                connection.end();
            } else {
                var now = new Date(new Date().getTime() + 32400000).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                var cols = 'reqID, reqDate, reqType, warehouseID, buyerID, area, startDate, endDate, rejectCmt';
                connection.query(`INSERT INTO DeletedBuy (${cols}, rejectTime) (SELECT ${cols}, '${now}' FROM RequestForBuy WHERE reqID=?)`, reqID, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        res.send(false);
                        connection.end();
                    } else {
                        res.send(true);
                        connection.end();
                    }
                });
            }
        });
    }
}
