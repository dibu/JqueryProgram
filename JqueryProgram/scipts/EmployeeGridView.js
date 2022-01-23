var GridView = {
    populateGridView: function () {
        $.get("http://localhost:21117/api/employee/GetAllEmployee", function (data) {
            console.log(data);
            GridView.createGridView(data);
        });
        GridView.getDesignations();
    },
    createGridView(data) {
        var html = [];
        if (data != null) {
            var firstElement = data[0];
            html.push('<table>');
            html.push('<tr>');
            $.each(firstElement, function (key, value) {
                html.push('<th>' + key + '</th>');
            });
            html.push('<td>Action</td>');
            html.push('</tr>');
            $(data).each(function (idx, d) {
                html.push('<tr>');
                $.each(d, function (k, v) {
                    html.push('<td>' + v + '</td>');
                }); 
                html.push('<td><button type="button" onclick="GridView.eidtClick(this,\''+ d.id + '\');">Edit</button></td>');
                html.push('</tr>');
            })
            html.push('</table>');
        }
        $("#gridview").html(html.join(''));
    },
    eidtClick: function (ref, id) {
        var btnText = $(ref).html();
        if (btnText == 'Edit') {
            var tr = $(ref).parent().parent();
            var name = $(tr).find('td:eq(2)').html();
            var email = $(tr).find('td:eq(3)').html();
            var designation = $(tr).find('td:eq(4)').html();
            var phone = $(tr).find('td:eq(5)').html();
            var designationsHTML = [];
            $(window.designations).each(function (i, v) {
                designationsHTML.push('<option value=' + v + '>' + v + '</option>');
            });
            var tds = $(ref).parent().siblings();
            $(tds).eq('2').html('<input type="text" value=' + name + '>');
            $(tds).eq('3').html('<input type="text" value=' + email + '>');
            $(tds).eq('5').html('<input type="text" value=' + phone + '>');
            $(tds).eq('4').html('<select>' + designationsHTML.join('') + '</select>');
            $(ref).html('Save');
        } else {
            var tds = $(ref).parent().siblings();
            var name = $(tds).eq('2').find('input[type="text"]').val();
            var email = $(tds).eq('3').find('input[type="text"]').val();
            var phone = $(tds).eq('5').find('input[type="text"]').val();
            var designation = $(tds).eq('4').find('select').find('option:selected').val();

            var employee = {
                'Id' : parseInt(id),
                'Name': name,
                'Email': email,
                'Designation': designation,
                'Phone': phone
            };
            console.log(JSON.stringify(employee));
            GridView.saveEmployee(employee, ref);
        }
        
    },
    getDesignations: function () {
        $.get("http://localhost:21117/api/employee/GetDesignations", function (data) {
            console.log(data);
            window.designations = data;
        });
    },
    saveEmployee: function (obj, ref) {
      //  $.post("http://localhost:21117/api/employee/SaveEmployee",JSON.stringify(obj));
        $.ajax({
            type: "POST",
            processData: false,
            contentType: 'application/json',
            crossDomain: true,
            dataType: 'json',
            data: JSON.stringify(obj),
            url: "http://localhost:21117/api/employee/SaveEmployee",
            success: function (response) {
                if (response) {
                    $(ref).html('Edit');

                    var tds = $(ref).parent().siblings();
                    $(tds).eq('2').html(obj.Name);
                    $(tds).eq('3').html(obj.Email);
                    $(tds).eq('5').html(obj.Phone);
                    $(tds).eq('4').html(obj.Designation);
                }
            },
            error: function (err) {
                alert('Error', err);
            }
        });
    }
}