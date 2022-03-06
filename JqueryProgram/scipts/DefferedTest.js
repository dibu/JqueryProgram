$(document).ready(function () {
    DeferredTest.createDropDown(DeferredTest.populateDropDown);
});

var DeferredTest = {
    createDropDown: function (callback) {
        $('#maindiv').append('<select id="drop-designation"></select>');
        if (callback) {
            callback();
        }
    },
    populateDropDown: function () {
        var deffered = $.Deferred();
        $.get("http://localhost:21117/api/employee/GetDesignations", function (data) {
            if (data.length > 0) {
                var designationsHTML = [];
                $(data).each(function (i, v) {
                    designationsHTML.push('<option value=' + v + '>' + v + '</option>');
                });
                $('#drop-designation').html(designationsHTML.join());
                setTimeout(function () {
                    deffered.resolve(DeferredTest.setDesignation('Tester'));
                }, 10000)
               
            }           
        });
     
    },

    setDesignation: function (designation) {
        $('#drop-designation').val(designation);
    }
}