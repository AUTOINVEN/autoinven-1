exports.getWHInfo = function (req, res, app, db) {
    var reqID = req.body.reqID;
    var items = {};
    let results = db.query(`select * from Contract, Warehouse where Contract.warehouseID=Warehouse.warehouseID and reqID=` + [reqID] + `;`);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                warehouseID: results[step].warehouseID,
                warehouseName: results[step].warehouseName,
                address: results[step].address,
                addressDetail: results[step].addressDetail,
                zipcode: results[step].zipcode,
                warehouseEmail: results[step].warehouseEmail,
                warehouseTEL: results[step].warehouseTEL,
                landArea: results[step].landArea,
                floorArea: results[step].floorArea,
                useableArea: results[step].useableArea,
                enrolledDate: results[step].enrolledDate.substring(0, 10),
                perprice: results[step].price,
                infoComment: results[step].infoComment,
                etcComment: results[step].etcComment,
            };
        }
    }
    return JSON.stringify(items);
}

exports.getPVInfo = function (req, res, app, db) {
    var reqID = req.body.reqID;
    var items = {};
    let results = db.query(`select * from Contract, Warehouse, Provider, Member where Contract.warehouseID=Warehouse.warehouseID and Warehouse.warehouseID=Provider.warehouseID and Provider.memberID=Member.memberID and reqID=` + [reqID] + `;`);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                providerID: results[step].memberID,
                name: results[step].name,
                national: results[step].national,
                email: results[step].email,
                contactNumber: results[step].contactNumber,
                address: results[step].address,
                zipcode: results[step].zipcode,
            };
        }
    }
    return JSON.stringify(items);
}
