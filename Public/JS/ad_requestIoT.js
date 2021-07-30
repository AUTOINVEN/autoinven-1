function adClick(i, flag) {
    if (flag) {  // flag == 1 -> Approve
        $.ajax({
            url: '/Admin/RequestIoT',
            dataType: 'json',
            type: 'POST',
            data: {
                answer: "Approve",
                reqType: document.getElementById('reqType' + i).innerText,
                warehouseID: parseInt(document.getElementById('whID' + i).innerText)
            },
            success: function (data) {
                if (data == true) {
                    Swal.fire({
                        title: 'Accepted',
                        icon: 'success'
                    }).then(() => location.href = "/Admin/RequestIoT");
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'An error has occurred.',
                        icon: 'error'
                    }).then(() => location.href = "/Admin/RequestIoT");
                }
            }
        });
    } else {  // flag == 0 -> Reject
        $.ajax({
            url: '/Admin/RequestIoT',
            dataType: 'json',
            type: 'POST',
            data: {
                answer: "Reject",
                reqType: document.getElementById('reqType' + i).innerText,
                warehouseID: parseInt(document.getElementById('whID' + i).innerText),
            },
            success: function (data) {
                if (data == true) {
                    Swal.fire({
                        title: 'Rejected',
                        icon: 'warning'
                    }).then(() => location.href = "/Admin/RequestIoT");
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'An error has occurred.',
                        icon: 'error'
                    }).then(() => location.href = "/Admin/RequestIoT");
                }
            }
        });
    }
}
