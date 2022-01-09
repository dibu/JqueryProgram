var DynamicElements = {
    createEmployeeFormFields: function () {
        var html = [];
        for (var i = 0; i < 10; i++) {
            html.push('<div class="inputtext" id="text-div">');
            html.push('<label>Text Input ' + i.toString() + ' </label>');
            html.push('<input type="text" id="input_' + i.toString() + '"/>');
            html.push('</div>');
        }
        $("#masterdiv").html(html.join(''));

        DynamicElements.appenDropDown(5);
        DynamicElements.appendCheckBox();
        DynamicElements.appendRadioButtons();
    },
    getInputValues: function () {
        var output = [];
        $("#masterdiv").find('input,select').each(function (i, ele) {
            if ($(ele).val().length > 0) {
                if ($(ele).attr('type') == 'checkbox' && $(ele).is(':checked')) {
                    output.push($(ele).attr('id') + ' has value  ' + $(ele).val());
                } else if ($(ele).attr("type") == "text") {
                    output.push($(ele).attr('id') + ' has value  ' + $(ele).val());
                } else if ($(ele).is('select')) {
                    output.push($(ele).attr('id') + ' has value  ' + $(ele).find('option:selected').val());
                } else if ($(ele).attr('type') == 'radio' && $(ele).is(':checked')) {
                    output.push($(ele).attr('id') + ' has value  ' + $(ele).val());
                }
                
            }
        });
        console.log(output)
    },
    appenDropDown: function (position) {
        var dropdownOpts = [];
        dropdownOpts.push('<option value="">Select Value</option>');
        for (var i = 0; i < 5; i++) {
            dropdownOpts.push('<option value=' + i.toString() + '>Element-' + i.toString() + '</option>');
        }
        $("#masterdiv").find('input[type="text"]').eq(position - 1).after('<div id="select-div"><label>select option</label><select id="select" onchange="DynamicElements.dropDownOnchange(this);">' + dropdownOpts.join(',') + '</select></div>');
    },
    appendCheckBox: function () {
        var checkboxes = [];
        checkboxes.push('<div id="check-div">');
        for (var i = 0; i < 5; i++) {
            checkboxes.push('<div id="check-element">');
            checkboxes.push('<label>Checkbox' + (i + 1).toString() + '</label>');
            checkboxes.push('<input type="checkbox" id="chk_' + i.toString() + '" name="checkelement" value=check-' + (i + 1).toString() + '>');
            checkboxes.push('</div>');
        }
        checkboxes.push('</div>');
        $("#masterdiv").find('select').after(checkboxes.join(''));
    },
    appendRadioButtons: function () {
        var radioButtons = [];
        radioButtons.push('<div id="radio-div">');
        for (var i = 0; i < 9; i++) {
            radioButtons.push('<div id="radio-element">');
            radioButtons.push('<input type="radio" onchange="DynamicElements.changeBodyColor(\'' + (i + 1).toString() + '\')" id="radio' + i.toString() + '" name="fav" value="' + (i + 1).toString() + '"><label for="radio' + i.toString() + '">Radio ' + (i + 1).toString() + '</label>');
            radioButtons.push('<div>');
         }
        radioButtons.push('<div>');
        $("#masterdiv").find('select').before(radioButtons.join(''));
    },
    changeBodyColor: function (selectedValue) {
        switch (selectedValue) {
            // 0 to f RGB CMY
            case '1':
                $('body').css('background-color', '#f00');
                break;
            case '2':
                $('body').css('background-color', '#0f0');
                break;
            case '3':
                $('body').css('background-color', '#00f');
                break;
            case '4':
                $('body').css('background-color', '#0ff');
                break;
            case '5':
                $('body').css('background-color', '#f0f');
                break;
            case '6':
                $('body').css('background-color', '#ff0');
                break;
            case '7':
                $('body').css('background-color', '#fff');
                break;
            case '8':
                $('body').css('background-color', '#000');
                break;
            case '9':
                $('body').css('background-color', '#EEE');
                break;
        }
    },
    dropDownOnchange: function (ref) {
        var option = $(ref).find('option:selected').val();
        switch (option) {
            case '0':
                DynamicElements.changePositionOfCheckBox('extreme-top-check');
                break;
            case '1':
                DynamicElements.changePositionOfCheckBox('extreme-bottom-check');
                break;
            case '2':
                DynamicElements.changePositionOfRadioButton('extreme-top-radio');
                break;
            case '3':
                DynamicElements.changePositionOfRadioButton('extreme-bottom-radio');
                break;
        }
    },
    changePositionOfCheckBox: function (position) {
        var checkBoxDivHTML = $("#check-div").prop('outerHTML');
        console.log(checkBoxDivHTML);
        $("#check-div").remove();
        switch (position) {
            case 'extreme-top-check':
                $("#masterdiv").children().first().before(checkBoxDivHTML);
                break;
            case 'extreme-bottom-check':
                $("#masterdiv").children().last().after(checkBoxDivHTML);
                break;
        }
    },
    changePositionOfRadioButton: function (position) {
        var radioButtonDivHTML = $("#radio-div").prop('outerHTML');
        console.log(radioButtonDivHTML);
        $("#radio-div").remove();
        switch (position) {
            case 'extreme-top-radio':
                $("#masterdiv").children().first().before(radioButtonDivHTML);
                break;
            case 'extreme-bottom-radio':
                $("#masterdiv").children().last().after(radioButtonDivHTML);
                break;
        }
    }
}