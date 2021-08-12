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

function byClick(i, flag) {
    switch (flag) {
        case 0:  // Cancel
            reAlert('Cancel buy request?', () => {
                $.ajax({
                    url: '/Buyer/RequestStatus/Buy/Ans',
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        answer: "Cancel",
                        reqID: document.getElementById('reqID' + i).innerText,
                        whID: document.getElementById('whID' + i).innerText,
                        reqType: document.getElementById('reqType' + i).innerText,
                        buyerID: document.getElementById('buyerID' + i).innerText,
                        area: document.getElementById('area' + i).innerText
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
        case 1:  // Pay
            reAlert('Pay test?', () => {
                $.ajax({
                    url: '/Buyer/RequestStatus/Buy/Ans',
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        answer: "Accept",
                        reqID: document.getElementById('reqID' + i).innerText,
                        whID: document.getElementById('whID' + i).innerText,
                        reqType: document.getElementById('reqType' + i).innerText,
                        buyerID: document.getElementById('buyerID' + i).innerText,
                        area: document.getElementById('area' + i).innerText,
                        startDate: document.getElementById('startDate' + i).innerText,
                        endDate: document.getElementById('endDate' + i).innerText
                        //other things will be here
                    },
                    success: function (data) {
                        if (data == true) {
                            Swal.fire({
                                title: 'Success',
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
        case 2:  // Confirm
            reAlert('Delete from table?', () => {
                $.ajax({
                    url: '/Buyer/RequestStatus/Buy/Ans',
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        answer: "Confirm",
                        reqID: document.getElementById('reqID' + i).innerText,
                        whID: document.getElementById('whID' + i).innerText,
                        reqType: document.getElementById('reqType' + i).innerText,
                        buyerID: document.getElementById('buyerID' + i).innerText,
                        area: document.getElementById('area' + i).innerText
                        //other things will be here
                    },
                    success: function (data) {
                        if (data == true) {
                            Swal.fire({
                                title: 'Deleted',
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
    }
}

function getAmounts() {
    $.ajax({
        url: '/Buyer/RequestStatus/Buy/Ans',
        dataType: 'json',
        type: 'POST',
        data: {
            answer: "Confirm",
            reqID: document.getElementById('reqID' + i).innerText,
            whID: document.getElementById('whID' + i).innerText,
            reqType: document.getElementById('reqType' + i).innerText,
            buyerID: document.getElementById('buyerID' + i).innerText,
            area: document.getElementById('area' + i).innerText
            //other things will be here
        },
        success: function (data) {
            if (data == true) {
                Swal.fire({
                    title: 'Confirmed',
                    icon: 'success'
                }).then(() => location.href = "/Buyer/RequestStatus");
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'An error has occurred.',
                    icon: 'error'
                }).then(() => location.href = "/Buyer/RequestStatus");
            }
        }
    });
}

if (document.getElementById("payFlag").innerText == 'T') {
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency: "USD",
                        value: document.getElementById('totalMoney').innerText
                    },
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                var index = makeIndex();

                for (var i = 0; i < index.length; i++) {
                    byClick(Number(index[i]), 1);
                }
            });
        }
    }).render('#paypal-button-container');
}

function getCheckboxValue(event) {
    let result = 0;
    if (event.target.checked) {
        result = event.target.value;
        result *= 1; // 형변환
        makeIndex(); //
    } else {
        result -= event.target.value;
    }
    var a = document.getElementById('totalMoney').innerText;
    a *= 1;
    document.getElementById('totalMoney').innerText = (result + a);
}

function countNumofElement() {
    var payByBuyerCount = 0;
    var otherCount = 0;
    var result = 1;
    var i = 0;
    var index = [];
    while (result != null) {
        result = document.getElementById('count' + i);
        if (result == null) {
            continue;
        } else {
            index.push(result.innerText);
        }
        i++;
    }
    return payByBuyerCount, otherCount;
}

function countNumofElement() {
    var count = 0;
    var i = 0;
    result = 1;
    while (result != null) {
        result = document.getElementById('reqType' + i);
        if (result == null) {
            break;
        } else {
            count++;
        }
        i++;
    }
    return count;
}

function makeIndex() {
    var result = 1;
    var index = [];
    var limit = countNumofElement();
    for (var i = 0; i < limit; i++) {
        result = document.getElementById('count' + i);
        if (result == null) {} else {
            index.push(result.innerText);
        }
    }
    return index;
}
