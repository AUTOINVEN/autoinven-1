function adClick(i, flag) {
    if (flag) {  // flag == 1 -> Approve
        reAlert('Approve enroll request?', () => {
            $.ajax({
                url: '/Admin/RequestEnroll',
                dataType: 'json',
                type: 'POST',
                data: {
                    answer: "Approve",
                    providerID: document.getElementById('providerID' + i).innerText,
                    reqType: "ReqEnrollPV",
                    warehouseID: parseInt(document.getElementById('whID' + i).innerText),
                    reqID: parseInt(document.getElementById("reqID" + i).innerText)
                },
                success: function (success) {
                    if (success) resultAlert('Approved');
                    else errorAlert();
                }
            });
        })
    } else {  // flag == 0 -> Reject
        inputAlert('Reject enroll request?', (reason) => {
            $.ajax({
                url: '/Admin/RequestEnroll',
                dataType: 'json',
                type: 'POST',
                data: {
                    answer: "Reject",
                    reqID: parseInt(document.getElementById('reqID' + i).innerText),
                    warehouseID: parseInt(document.getElementById('whID' + i).innerText),
                    reason: reason
                },
                success: function (success) {
                    if (success) resultAlert('Rejected');
                    else errorAlert();
                }
            });
        })
    }
}
