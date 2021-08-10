(function ($) {
    "use strict"; // Start of use strict
    $(document).ready(function () {

        //send sign up data to server
        $("#enrollForm").submit(function (evt) {
            evt.preventDefault();

            var whEmail = $("#warehouseEmail").val();
            var whTel = $("#warehouseTel").val();
            var landArea = $("#landArea").val();
            var floorArea = $("#floorArea").val();
            var useableArea = $("#useableArea").val();
            var price = $("#price").val();

            //check wemailis not null
            if (!whEmail) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: 'You have to insert your warehouse contact email'
                })
            }
            //check wphone is not null
            else if (!whTel) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: 'You have to insert your warehouse contact telephone number'
                })
            }
            //check email is not null
            else if (!landArea) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: 'You have to insert your warehouse land area'
                })
            } else if (!floorArea) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: "You have to insert your warehouse floor area"
                })
            } else if (!useableArea) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: "You have to insert your warehouse usable area"
                })
            } else if (!price) {
                Swal.fire({
                    icon: 'error',
                    title: 'Fail',
                    text: "You have to insert your warehouse price"
                })
            }
            //finish all test
            else {
                var formData = new FormData(document.getElementById('enrollForm'));
                $.ajax({
                    url: $(this).attr('action'),
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data == "errortype2") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text: 'Please enter only numbers in the Land Area field.'
                            })
                        } else if (data == "errortype3") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text: 'Please enter only numbers in the Floor Area field.'
                            })
                        } else if (data == "errortype4") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text: 'Please enter only numbers in the price field.'
                            })
                        } else if (data == "errortype9") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text: 'Please enter the email in the correct format.'
                            })
                        } else if (data == "errortype10") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text: 'Please enter the telephone number in the correct format.'
                            })
                        } else if (data == "errortype11") {
                            Swal.fire({
                                icon: 'error',
                                title: 'fail',
                                text: 'Please enter only numbers in the Useable Area field.'
                            })
                        } else if (data == "success") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success'
                            }).then(() => {
                                location.href = "/Provider/MyWarehouse";
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Fail',
                                text: 'An error was occurred.'
                            })
                        }
                    },
                    error: function (request, status, error) {
                        Swal.fire({
                            title: 'Error',
                            html: `code: ${request.status}<br>message: ${request.responseText}<br>error: ${error}`,
                            icon: 'error'
                        });
                    }
                })
            }
        })
    })
})(jQuery);
