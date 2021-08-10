exports.getWHInfo = function (db, WID) {
    var items = {};
    console.log("viewInfo : " + WID);
    let results = db.query(`select * from Warehouse where warehouseID=` + WID + `;`);
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

exports.getMemberInfo = function (db, memID) {
    var items = {};
    let results = db.query(`select * from Member where memberID="` + [memID] + `";`);
    if (results.length > 0) {
        for (var step = 0; step < results.length; step++) {
            items[`item${step}`] = {
                memberID: results[step].memberID,
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