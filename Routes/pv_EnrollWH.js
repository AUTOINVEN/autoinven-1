exports.EnrollWH = function (req, res, app, db) {
    var mysql = require('mysql');
    var connection = mysql.createConnection(require('../Module/db').info);
    connection.connect();
    var onlyNum = /^[0-9]*$/;  // 숫자만 받는 정규식
    var engishDigit = /^[a-zA-Z0-9]+$/;  // 영어 대소문자 및 숫자 받는 정규식
    var item = {
        warehouseName: req.body.warehouseName,
        enrolledDate: new Date(),
        zipcode: req.body.zipcode,
        address: req.body.address,
        latitude: req.body.lat,
        longitude: req.body.lng,
        landArea: req.body.landArea,
        floorArea: req.body.floorArea,
        useableArea: req.body.floorArea,
        price: req.body.price,
        infoComment: req.body.infoComment,
        etcComment: req.body.etcComment,
        iotStat: "N"
    }
    //예외처리를 위한 정규식
    if (onlyNum.test(item.landArea) == false) {
        res.send("errortype2");
        console.log('errortype2');
    } else if (onlyNum.test(item.floorArea) == false) {
        res.send("errortype3");
        console.log('errortype3');
    } else if (onlyNum.test(item.price) == false) {
        res.send("errortype4");
        console.log('errortype4');
    } else if ((engishDigit.test(item.warehouseName) || (engishDigit.test(item.infoComment)) || (engishDigit.test(item.etcComment))) == false) {
        res.send("errortype6");
    } else {
        let reqResult = db.query('SELECT * from RequestForEnroll ORDER BY reqID DESC');
        var reqno = 1;
        var logno = 1;
        if (reqResult.length > 0) reqno = reqResult[0].reqID + 1;
        connection.query('INSERT INTO Warehouse SET ?', item, function (error, results, fields) {
            if (error) {
                console.log("error ocurred Warehouse set error", error.message);
                res.redirect('/Provider/EnrollWH');
            } else {
                connection.query('SELECT LAST_INSERT_ID() as wid;', function (error, results, fields) {
                    if (error) {
                        console.log("error ocurred LAST_INSERT_ID() error", error);
                        res.redirect('/Provider/EnrollWH');
                    } else {
                        let upLoadFile = req.files;
                        let fileName = req.files.profile_img.name;
                        let username = req.session.username;
                        var fileExt = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
                        fileName = new Date().getTime().toString() + fileExt;
                        upLoadFile.profile_img.mv(`./Public/Upload/${username}_${fileName}`, err => {
                            if (err) {
                                res.send(err);
                                console.log('file mv error' + err);
                            } else {
                                warehouseID = results[0].wid;
                                var fileInfo = {"warehouseID": warehouseID, "filename": `${username}_${fileName}`};
                                connection.query('INSERT INTO FileInfo SET ?', fileInfo, function (error, results, fields) {
                                    if (error) {
                                        console.log("error ocurred FileInfo error", error);
                                        res.redirect('/Provider/EnrollWH');
                                    } else {
                                        var reqItem = {
                                            "reqID": reqno,
                                            "reqDate": new Date(),
                                            "reqType": "ReqEnrollPV",
                                            "providerID": req.session['memberID'],
                                            "warehouseID": warehouseID,
                                            "logID": logno
                                        };
                                        connection.query('INSERT INTO RequestForEnroll SET ?', reqItem, function (error, results, fields) {
                                            if (error) {
                                                console.log("error ocurred RequsetForEnroll error", error);
                                                res.send("errortype5");
                                            } else {
                                                res.send("errortype0");
                                            }
                                        });
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
