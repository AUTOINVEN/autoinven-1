exports.showContarctInfo = function (req, res, app, db) {
    var items = {};
    var sql = `select * from Contract, Member where Contract.buyerID=Member.memberID`;
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                reqID: results[step].reqID,
                buyerID: results[step].buyerID,
                warehouseID: results[step].warehouseID,
                price: results[step].price,
                startDate: results[step].startDate.substring(0, 10),
                endDate: results[step].endDate.substring(0, 10),
                area: results[step].area
            };
        }
    }
    return JSON.stringify(items);
}
