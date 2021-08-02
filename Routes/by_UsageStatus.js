exports.ContractInfo = function (req, res, app, db) {
    var items = {};
    var sql = `select * from Contract, Warehouse, Buyer where Warehouse.warehouseID=Contract.warehouseID and buyerID='` + req.session['memberID'] + "'";
    let results = db.query(sql);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            results[step].price = results[step].price * results[step].area;
            items[`item${step}`] = {
                reqID: results[step].reqID,
                reqDate: results[step].reqDate,
                reqType: results[step].reqType,
                warehouseID: results[step].warehouseID,
                warehouseName: results[step].warehouseName,
                buyerID: results[step].buyerID,
                area: results[step].area,
                amounts: results[step].price,
                startDate: results[step].startDate.substring(0, 10),
                endDate: results[step].endDate.substring(0, 10)
            };
        }
    }
    return JSON.stringify(items);
}