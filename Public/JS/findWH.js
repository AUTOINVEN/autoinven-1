var map;
var i = 0;
var markers = [];
var today = new Date();
today.setHours(0, 0, 0, 0);

function createImage(objImageInfo) {
    var strDOM = "";
    for (image in objImageInfo) {
        strDOM += `<div class  = "image_panel">`;
        strDOM += `<img src="${objImageInfo[image]["url"]}">`;
        strDOM += `</div>`
    }
    document.getElementById("image_container").innerHTML = strDOM;
}

function initMap() {
    var daegu = {lat: 35.87222, lng: 128.60250};
    var items = JSON.parse(document.getElementById("items").innerText);
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 12,
            center: daegu
        });
    for (key in items) {
        markers[i] = new google.maps.Marker({
            position: {lat: items[key].latitude, lng: items[key].longitude},
            map: map,
        });
        markers[i].addListener('click', function () {
            var k = 'item' + markers.indexOf(this);
            $.ajax({
                url: '/Buyer/FindWH/FindImage',
                type: 'POST',
                data: {'warehouseID': items[k].warehouseID},
                dataType: 'json',
                success: function (data) {
                    createImage(data)
                }
            })
            map.setCenter(this.getPosition());
            $("#whID").html(items[k]['warehouseID']);
            $("#whName").html(items[k]['warehouseName']);
            $("#whAddress").html(items[k]['address']);
            $("#whFloorArea").html(items[k]['floorArea']);
            $("#whUseableArea").html(items[k]['useableArea']);
            $("#whEmail").html(items[k]['warehouseEmail']);
            $("#whPhone").html(items[k]['warehouseTel']);
            $("#whPrice").html(items[k]['price']);
            $("#whInfoComment").html(items[k]['infoComment']);
        });
        i++;
    }
}

$(function () {

    $('#bu').click(function () {
        let warehouseID = $('#whID').text();
        let useableArea = parseInt($('#whUseableArea').text());
        let wantArea = parseInt($('#area').val());
        let startDate = $('#startDate').text();
        let endDate = $('#endDate').text();

        if (!useableArea) {
            Swal.fire({
                title: 'Error',
                text: 'Please select the warehouse.',
                icon: 'error'
            });
            return;
        }
        else if (!wantArea) {
            Swal.fire({
                title: 'Error',
                text: 'Please enter the area.',
                icon: 'error'
            });
            return;
        }
        else if (useableArea < wantArea) {
            Swal.fire({
                title: 'Error',
                text: 'Please enter the area smaller than usable area.',
                icon: 'error'
            });
            return;
        }
        else if (!startDate) {
            Swal.fire({
                title: 'Error',
                text: 'Please enter the start date.',
                icon: 'error'
            });
            return;
        }
        else if (!endDate) {
            Swal.fire({
                title: 'Error',
                text: 'Please enter the end date.',
                icon: 'error'
            });
            return;
        }

        $.ajax({
            url: '/Buyer/FindWH/Inquire',
            dataType: 'json',
            type: 'POST',
            data: {
                warehouseID: warehouseID,
                area: wantArea,
                startDate: startDate,
                endDate: endDate
            },
            success: function (data) {
                if (data === true) {
                    Swal.fire({
                        title: 'Submitted',
                        icon: 'success'
                    }).then(() => location.href = "/Buyer/MyWarehouse");
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'An error has occurred.',
                        icon: 'error'
                    }).then(() => location.href = "/Buyer/FindWH");
                }
            }
        });
    });

    let dp1 = $("#datetimepicker1");
    let dp2 = $("#datetimepicker2");

    dp1.datetimepicker({
        date: '',
        minDate: today,
        format: 'L'
    });
    dp2.datetimepicker({
        date: '',
        format: 'L',
        useCurrent: false
    });
    dp1.on("change.datetimepicker", function (e) {
        dp2.datetimepicker('minDate', e.date);
        var sdate = $('#sDate').val();
        var newdate = sdate.substring(6, 10) + '-' + sdate.substring(0, 2) + '-' + sdate.substring(3, 5);
        $('#startDate').text(newdate);
    });
    dp2.on("change.datetimepicker", function (e) {
        dp1.datetimepicker('maxDate', e.date);
        var edate = $('#eDate').val();
        var newdate = edate.substring(6, 10) + '-' + edate.substring(0, 2) + '-' + edate.substring(3, 5);
        $('#endDate').text(newdate);
    });
});
