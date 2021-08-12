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
                success: function (success) {
                    if (success) resultAlert('Approved');
                    else errorAlert();
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
                success: function (success) {
                    if (success) resultAlert('Rejected');
                    else errorAlert();
                }
            });
        });
    }
}
