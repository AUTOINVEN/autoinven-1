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

function reqClick(i, WID) {
    reAlert('Request IoT Server?', () => {
        $.ajax({
            url: '/Provider/MyWarehouse/IoT/Ans',
            dataType: 'json',
            type: 'POST',
            data: {
                warehouseID: parseInt(WID)
            },
            success: function (data) {
                if (data == true) {
                    Swal.fire({
                        title: 'Submitted',
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
    });
}

function pvClick(where, i, flag) {
    var text = 'Cancel enrollment?';
    var URL = '/Provider/MyWarehouse/Enroll/Ans';
    var Area = null;
    if (where) {
        text = 'Cancel buy request?'
        URL = '/Provider/MyWarehouse/Buy/Ans';
        Area = document.getElementById('area' + where + i).innerText
    }
    switch (flag) {
        case 0: // Cancel
            reAlert(text, () => {
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
                        area: Area
                        //other things will be here
                    },
                    success: function (data) {
                        if (data == true) {
                            Swal.fire({
                                title: 'Canceled',
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
            });
            break;
        case 2: // Confirm
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
                    success: function (data) {
                        if (data == true) {
                            Swal.fire({
                                title: 'Confirmed',
                                icon: 'success'
                            }).then(() => location.href = "/Provider/MyWarehouse");
                        } else {
                            Swal.fire({
                                title: 'Error',
                                text: 'An error has occurred.',
                                icon: 'error'
                            }).then(() => location.href = "/Provider/MyWarehouse");
                        }
                    }
                });
            });
            break;
    }
}
