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

function adClick(val) {
    var iotServer = $('#iotServer').val();
    var wid = $('#wid').val();
    if (val === 'Test') {
        $.redirect('/iot', {'iotServer': iotServer, 'wid': wid});
    }
    else if (val === 'Approve') {
        reAlert(`IoT Server: <br>${iotServer}`, () => {
            $.ajax({
                url: '/Admin/RequestIoT',
                dataType: 'json',
                type: 'POST',
                data: {
                    answer: "Approve",
                    iotServer: iotServer
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
        });
    } else if (val === 'Reject') {
        reAlert('Reject IoT Server request?', () => {
            $.ajax({
                url: '/Admin/RequestIoT',
                dataType: 'json',
                type: 'POST',
                data: {
                    answer: "Reject"
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
        });
    }
}
