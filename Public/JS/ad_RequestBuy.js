function reAlert(text, callback) {
    Swal.fire({
        title: 'Are you sure?',
        html: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2A9EDD',
        cancelButtonColor: '#66687A',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

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
                success: function (data) {
                    if (data == true) {
                        Swal.fire({
                            title: 'Accepted',
                            icon: 'success'
                        }).then(() => location.href = "/Admin/RequestBuy");
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'An error has occurred.',
                            icon: 'error'
                        }).then(() => location.href = "/Admin/RequestBuy");
                    }
                }
            });
        });
    } else { // flag == 0 -> Reject
        reAlert('Reject buy request?', () => {
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
                    area: parseInt(document.getElementById("area" + i).innerText)
                },
                success: function (data) {
                    if (data == true) {
                        Swal.fire({
                            title: 'Rejected',
                            icon: 'success'
                        }).then(() => location.href = "/Admin/RequestBuy");
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'An error has occurred.',
                            icon: 'error'
                        }).then(() => location.href = "/Admin/RequestBuy");
                    }
                }
            });
        });
    }
}
