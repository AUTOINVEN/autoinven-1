exports.showContarctInfo = function (req, res, app, db) {
    var items = {};
    var sql = `select * from Contract, Member where Contract.buyerID=Member.memberID`;
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                contractID: results[step].contractID,
                buyerID: results[step].buyerID,
                warehouseID: results[step].warehouseID,
                amounts: results[step].price,
                startDate: results[step].startDate.substring(0, 10),
                endDate: results[step].endDate.substring(0, 10),
                national: results[step].national,
                contractNumber: results[step].contractNumber,
                address: results[step].address,
                email: results[step].email,
                name: results[step].name,
                area: results[step].area
            };
        }
    }
    return JSON.stringify(items);
}
