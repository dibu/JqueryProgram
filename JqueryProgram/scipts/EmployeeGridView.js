var GridView = {
    populateGridView: function () {
        $.get("http://localhost:21117/api/employee/GetAllEmployee", function (data) {
            console.log(data);
            GridView.createGridView(data);
        });
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
                html.push('<td><button type="button">Edit</button></td>');
                html.push('</tr>');
            })
            html.push('</table>');
        }
        $("#gridview").html(html.join(''));
    }
}