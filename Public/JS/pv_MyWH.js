function reqClick(i, WID) {
    reAlert('Request IoT Server?', () => {
        $.ajax({
            url: '/Provider/MyWarehouse/IoT/Ans',
            dataType: 'json',
            type: 'POST',
            data: {
                warehouseID: parseInt(WID)
            },
            success: function (success) {
                if (success) resultAlert('Submitted');
                else errorAlert();
            }
        });
    });
}

function pvClick(where, i, flag) {
    var text = 'Input the reason for cancellation to submit.';
    var URL = '/Provider/MyWarehouse/Enroll/Ans';
    var resTitle = 'Canceled';
    var Area = null;
    if (where) {
        text = 'Input the reason for rejection to submit.';
        URL = '/Provider/MyWarehouse/Buy/Ans';
        resTitle = 'Rejected';
        Area = document.getElementById('area' + where + i).innerText;
    }
    switch (flag) {
    case 0: // Cancel
        inputAlert(rejTitle, (reason) => {
            $.ajax({
                url: URL,
                dataType: 'json',
                type: 'POST',
                data: {
                    answer: "Cancel",
                    reqID: document.getElementById('reqID' + where + i).innerText,
                    whID: document.getElementById('whID' + where + i).innerText,
                    reqType: document.getElementById('reqType' + where + i).innerText,
                    memberID: document.getElementById('memberID' + where + i).innerText,
                    area: Area,
                    reason: reason
                    //other things will be here
                },
                success: function (success) {
                    if (success) resultAlert(resTitle);
                    else errorAlert();
                }
            });
        });
        break;
    case 1: // Approve
        reAlert('Approve buy request?', () => {
            $.ajax({
                url: URL,
                dataType: 'json',
                type: 'POST',
                data: {
                    answer: "Approve",
                    reqID: document.getElementById('reqID' + where + i).innerText,
                    whID: document.getElementById('whID' + where + i).innerText,
                    reqType: document.getElementById('reqType' + where + i).innerText,
                    memberID: document.getElementById('memberID' + where + i).innerText,
                    area: Area
                    //other things will be here
                },
                success: function (success) {
                    if (success) resultAlert('Approved');
                    else errorAlert();
                }
            });
        });
        break;
    case 2:  // Confirm
        var rejectCmt = $(`#rejectCmt${i}`).text();
        rejectedAlert('Canceled By Buyer', rejectCmt, () => {
            reAlert('Delete from table?', () => {
                $.ajax({
                    url: URL,
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        answer: "Confirm",
                        reqID: document.getElementById('reqID' + where + i).innerText,
                        whID: document.getElementById('whID' + where + i).innerText,
                        reqType: document.getElementById('reqType' + where + i).innerText,
                        memberID: document.getElementById('memberID' + where + i).innerText,
                        area: Area
                        //other things will be here
                    },
                    success: function (success) {
                        if (success) resultAlert('Deleted');
                        else errorAlert();
                    }
                });
            })
        });
        break;
    }
}
