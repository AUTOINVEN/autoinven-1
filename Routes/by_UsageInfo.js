exports.PVWHInfo = function (req, res, app, db) {
    var reqID = req.body.reqID;
    let findWID = db.query(`select warehouseID from Contract where reqID=?;`, [reqID]);
    if (findWID.length > 0) {
        WID = findWID[0].warehouseID;
        var items = {};
        let results = db.query(`select * from Warehouse, Provider, Member where Warehouse.warehouseID=Provider.warehouseID and Provider.memberID=Member.memberID and Warehouse.warehouseID=?;`, [WID]);
        if (results.length > 0) {
            for (var step = 0; step < results.length; step++) {
                items[`item${step}`] = {
                    warehouseID: results[step].warehouseID,
                    warehouseName: results[step].warehouseName,
                    providerID: results[step].memberID,
                    name: results[step].name,
                    email: results[step].email,
                    national: results[step].national,
                    contactNumber: results[step].contactNumber,
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
    }
    
    return JSON.stringify(items);
}