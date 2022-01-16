/// <reference path="dynamicelements.js" />
/// <reference path="employeegridview.js" />

$(document).ready(function () {
    DynamicElements.createEmployeeFormFields();
    GridView.populateGridView();
})