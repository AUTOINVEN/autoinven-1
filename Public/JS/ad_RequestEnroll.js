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
                success: function (data) {
                    if (data == true) {
                        Swal.fire({
                            title: 'Accepted',
                            icon: 'success'
                        }).then(() => location.reload());
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'An error has occurred.',
                            icon: 'error'
                        }).then(() => location.reload());
                    }
                }
            });
        })
    } else {  // flag == 0 -> Reject
        reAlert('Reject enroll request?', () => {
            $.ajax({
                url: '/Admin/RequestEnroll',
                dataType: 'json',
                type: 'POST',
                data: {
                    answer: "Reject",
                    reqID: parseInt(document.getElementById('reqID' + i).innerText),
                    warehouseID: parseInt(document.getElementById('whID' + i).innerText),
                },
                success: function (data) {
                    if (data == true) {
                        Swal.fire({
                            title: 'Rejected',
                            icon: 'success'
                        }).then(() => location.reload());
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'An error has occurred.',
                            icon: 'error'
                        }).then(() => location.reload());
                    }
                }
            });
        })
    }
}
