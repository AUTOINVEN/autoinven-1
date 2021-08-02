exports.ContractInfo = function (req, res, app, db) {
    var items = {};
    var sql = `select * from Contract, Warehouse where Warehouse.warehouseID=Contract.warehouseID and buyerID='` + req.session['memberID'] + "'";
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            results[step].price = results[step].price * results[step].area;
            items[`item${step}`] = {
                reqID: results[step].reqID,
                buyerID: results[step].buyerID,
                warehouseID: results[step].warehouseID,
                warehouseName: results[step].warehouseName,
                startDate: results[step].startDate.substring(0, 10),
                endDate: results[step].endDate.substring(0, 10),
                area: results[step].area,
                price: results[step].price
            };
        }
    }
    return JSON.stringify(items);
}