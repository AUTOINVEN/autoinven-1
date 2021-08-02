function adClick(val) {
    var iotServer = $('#iotServer').val();
    if (val === 'Test') {
        $.redirect('/iot', {'iotServer': iotServer});
    }
    else if (val === 'Approve') {
        Swal.fire({
            title: 'Are you sure?',
            html: `server: <br>${iotServer}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#21C838',
            cancelButtonColor: '#D33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
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
            }
        })
    } else if (val === 'Reject') {
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
    }
}
