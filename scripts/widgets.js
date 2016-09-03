$(document).ready(function () {

    var minDate = new Date(parseInt("2016", 10), parseInt("8", 10) - 1, parseInt("27", 10) + 1);
    var maxDate = new Date(parseInt("2016", 10), (parseInt("8", 10) - 1) + 11, parseInt("27", 10));
    //Search Engine round Trip
    $("#roundTrip").click(function () {
        $(".return").show();
        $("#liRoundTrip").addClass("active");
        $("#liOneWay").removeClass("active");
        $("#hfTripType").val("2");
    });
    //Search Engine one way
    $("#oneWay").click(function () {
        $(".return").hide();
        $("#liRoundTrip").removeClass("active");
        $("#liOneWay").addClass("active");
        $("#hfTripType").val("1");
    });
    $("#departDate").datepicker({
        changeMonth: true, changeYear: true,
        dateFormat: "mm/dd/yy",
        minDate: minDate, maxDate: maxDate,
        showButtonPanel: true,
        onClose: function () {
            var dateDepMin = $('#departDate').datepicker("getDate");
            var dateRetMin = $('#returnDate').datepicker("getDate");
            var dMin = new Date(dateDepMin.getFullYear(), dateDepMin.getMonth(), dateDepMin.getDate());
            if (dateRetMin != null) {
                $("#returnDate").datepicker("change", { minDate: new Date(dateDepMin) });
                var rMin = new Date(dateRetMin.getFullYear(), dateRetMin.getMonth(), dateRetMin.getDate());
                if (dMin > rMin) {
                    $('#returnDate').val(($('#hfTripType').val() == "2" ? $.datepicker.formatDate('mm/dd/yy', new Date(dMin)) : ""));
                    $("#returnDate").focus();
                }
            }
            else {
                $('#returnDate').val(($('#hfTripType').val() == "2" ? $.datepicker.formatDate('mm/dd/yy', new Date(dMin)) : ""));
                $("#returnDate").focus();
            }
        }
    });
    //Calender for Return
    $("#returnDate").datepicker({
        changeMonth: true, changeYear: true,
        dateFormat: "mm/dd/yy",
        minDate: minDate, maxDate: maxDate,
        showButtonPanel: true,
        onClose: function () {
            var dateDepMin = $('#departDate').datepicker("getDate");
            var dateRetMin = $('#returnDate').datepicker("getDate");
            var dMin = new Date(dateDepMin.getFullYear(), dateDepMin.getMonth(), dateDepMin.getDate());
            if (dateRetMin != null) {
                var rMin = new Date(dateRetMin.getFullYear(), dateRetMin.getMonth(), dateRetMin.getDate());
                if (dMin > rMin) {
                    alert('Returning date always equal or greater than departure date!');
                    $("#returnDate").val('');
                }
            }
        }
    });
});
function submitForm() {

    var validator = $("#flightSearch").validate({
        showErrors: function () {
            if (this.settings.highlight) {
                for (var i = 0; this.errorList[i]; ++i) {
                    this.settings.highlight.call(this, this.errorList[i].element,
                        this.settings.errorClass, this.settings.validClass);
                }
            }
            if (this.settings.unhighlight) {
                for (var i = 0, elements = this.validElements() ; elements[i]; ++i) {
                    this.settings.unhighlight.call(this, elements[i],
                        this.settings.errorClass, this.settings.validClass);
                }
            }
        },
        rules: {
            txtFrom: {
                required: true,
                minlength: 3
            },
            txtTo: {
                required: true,
                minlength: 3
            },
            departDate: {
                required: true,
            },
            returnDate: {
                required: {
                    depends: function (element) {
                        if ($('#hfTripType').val() == '2') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
                //	greaterThan: "#departDate"
            },
            adult: {
                required: true,
                range: [1, 9]

            },

        },
        errorElement: "span",
        messages: {
            txtFrom: {
                required: "Please enter a valid Origin City.",
                minlength: "Origin City must consist of at least 3 characters"
            },
            txtTo: {
                required: "Please enter a valid Destination City.",
                minlength: "Destination City must consist of at least 3 characters",

            },
            departDate: {
                required: "Please enter a valid Depart Date.",

            },
            returnDate: {
                required: "Please enter a valid Return Date.",

            },
        }
    });

    if (validator.form()) {

        var total = parseInt($("#adult").val()) + parseInt($("#child").val());
        var adults = parseInt($("#adult").val());
        var infants = parseInt($("#infant").val());
        if (infants > adults) {
            $("#error").html("<p>&raquo; Infant less than or equal to adult.</p>");
            return false;
        }


        if (total >= 10) {
            $("#error").html("<p>&raquo; Total number of Passenger should be less than or equal to 9 only.</p>");
            return false;
        }

        var startDate = new Date($('#departDate').val());
        var endDate = new Date($('#returnDate').val());
        if (startDate > endDate) {
            $("#error").html("<p>&raquo; Return date should be equal or greater than Depart date.</p>");
            return false;
        }
        if ($.trim($("#txtFrom").val()) == $.trim($("#txtTo").val()) && ($.trim($("#txtTo").val()).length > 0 || $.trim($("#txtFrom").val()).length > 0)) {
            $("#error").html("<p>&raquo; Please enter a different From and To city/ airport code!</p>");
            return false;
        }
        popup('divProgressbar', 30, 40);
        return true;
    }
    else
        return false;
}
