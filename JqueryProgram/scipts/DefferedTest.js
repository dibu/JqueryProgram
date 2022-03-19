$(document).ready(function () {
    //DeferredTest.createDropDown(DeferredTest.populateDropDown);
    DeferredTest.populateDynamicDropDown()
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
    isHtmlBinded: function (controlId) {
        var deffered = $.Deferred();
        var counter = setInterval(function () {
            if ($(controlId).length > 0) {
                deffered.resolve('done');
                console.log('Timer @ ' + new Date().getTime());
                clearInterval(counter);
            }
        }, 200);
        return deffered;
    },
    populateDynamicDropDown: function () {
        var response = DeferredTest.isHtmlBinded('#ddl_data1')
        var d = $.when(response)
        d.done(function (dd) {
            if (dd == 'done') {
                $.get("http://localhost:21117/api/employee/GetDesignations", function (data) {
                    if (data.length > 0) {
                        var designationsHTML = [];
                        $(data).each(function (i, v) {
                            designationsHTML.push('<option value=' + v + '>' + v + '</option>');
                        });
                        $('#ddl_data1').html(designationsHTML.join());
                    }
                });
            } 
      
        })
        
    },
    setDesignation: function (designation) {
        $('#drop-designation').val(designation);
    },
    addDropDown: function () {
        $("#container").append('<select id="ddl_data1"></select>');
    }
}