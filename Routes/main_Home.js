exports.searchWH = function (req, res, app, db) {
    var items = {};
    let results = db.query(`SELECT * from Warehouse where enroll='Y'`);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                warehouseName: results[step].warehouseName,
                address: results[step].address,
                latitude: results[step].latitude,
                longitude: results[step].longitude,
                landArea: results[step].landArea,
            };
        }
    }
    return JSON.stringify(items);
}