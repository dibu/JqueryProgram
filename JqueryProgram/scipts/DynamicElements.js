var DynamicElements = {
    createEmployeeFormFields: function () {
        var html = [];
        for (var i = 0; i < 10; i++) {
            html.push('<div class="inputtext">');
            html.push('<label>Text Input ' + i.toString() + ' </label>');
            html.push('<input type="text" id="input_' + i.toString() + '"/>');
            html.push('</div>');
        }
        $("#masterdiv").html(html.join(''));

        DynamicElements.appenDropDown(5);
        DynamicElements.appendCheckBox();
    },
    getInputValues: function () {
        var output = [];
        $("#masterdiv").find('input,select').each(function (i, ele) {
            if ($(ele).val().length > 0) {
                if ($(ele).attr('type') == 'checkbox' && $(ele).is(':checked')) {
                    output.push($(ele).attr('id') + ' has value  ' + $(ele).val() + ' , ');
                } else {
                    output.push($(ele).attr('id') + ' has value  ' + $(ele).val() + ' , ');
                }
                
            }
        });
        console.log(output)
    },
    appenDropDown: function (position) {
        var dropdownOpts = [];
        for (var i = 0; i < 5; i++) {
            dropdownOpts.push('<option value=' + i.toString() + '>Element-' + i.toString() + '</option>');
        }
        $("#masterdiv").find('input[type="text"]').eq(position-1).after('<div><label>select option</label><select id="select">' + dropdownOpts.join(',') + '</select></div>');
    },
    appendCheckBox: function () {
        var checkboxes = [];
        for (var i = 0; i < 5; i++) {
            checkboxes.push('<div>');
            checkboxes.push('<label>Checkbox' + (i + 1).toString() + '</label>');
            checkboxes.push('<input type="checkbox" id="chk_' + i.toString() + '" name="checkelement" value=check-' + (i + 1).toString() + '>');
            checkboxes.push('</div>');
        }
        $("#masterdiv").find('select').after(checkboxes.join(''));
    }
}