exports.ContractInfo = function (req, res, app, db) {
    var items = {};
    var sql = `select *, Contract.price as totalPrice, Warehouse.price as oriPrice from Contract, Warehouse, Provider, Member where Warehouse.warehouseID=Contract.warehouseID and Warehouse.warehouseID=Provider.warehouseID and Provider.memberID=Member.memberID and buyerID='` + req.session['memberID'] + "'";
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
                iotStat: results[step].iotStat,
                providerID: results[step].memberID,
                name: results[step].name,
                email: results[step].email,
                national: results[step].national,
                contactNumber: results[step].contactNumber,
                address: results[step].address,
                zipcode: results[step].zipcode,
                warehouseEmail: results[step].warehouseEmail,
                warehouseTEL: results[step].warehouseTEL,
                landArea: results[step].landArea,
                floorArea: results[step].floorArea,
                useableArea: results[step].useableArea,
                enrolledDate: results[step].enrolledDate,
                perprice: results[step].oriPrice,
                infoComment: results[step].infoComment,
                etcComment: results[step].etcComment,
            };
        }
    }
    return JSON.stringify(items);
}