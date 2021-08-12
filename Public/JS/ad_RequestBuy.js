function adClick(i, flag) {
    if (flag) { // flag == 1 -> Approve
        reAlert('Approve buy request?', () => {
            $.ajax({
                url: '/Admin/RequestBuy/Ans',
                dataType: 'json',
                type: 'POST',
                data: {
                    answer: "Approve",
                    buyerID: document.getElementById('buyerID' + i).innerText,
                    reqType: document.getElementById('reqType' + i).innerText,
                    warehouseID: parseInt(document.getElementById('whID' + i).innerText),
                    reqID: parseInt(document.getElementById("reqID" + i).innerText),
                    area: parseInt(document.getElementById("area" + i).innerText)
                },
                success: function (success) {
                    if (success) resultAlert('Approved');
                    else errorAlert();
                }
            });
        });
    } else { // flag == 0 -> Reject
        inputAlert('Reject buy request?', (reason) => {
            $.ajax({
                url: '/Admin/RequestBuy/Ans',
                dataType: 'json',
                type: 'POST',
                data: {
                    answer: "Reject",
                    buyerID: document.getElementById('buyerID' + i).innerText,
                    reqType: document.getElementById('reqType' + i).innerText,
                    warehouseID: parseInt(document.getElementById('whID' + i).innerText),
                    reqID: parseInt(document.getElementById("reqID" + i).innerText),
                    area: parseInt(document.getElementById("area" + i).innerText),
                    reason: reason
                },
                success: function (success) {
                    if (success) resultAlert('Rejected');
                    else errorAlert();
                }
            });
        });
    }
}
