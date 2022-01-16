<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="JqueryProgram.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style>
        table, th, td {
         border: 1px solid black;
         border-collapse: collapse;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="masterdiv">
        </div>
        <button type="button" onclick="DynamicElements.getInputValues()">Get Values</button>
    </form>
    <div id="gridview"></div>
    <script src="scipts/jquery-3.6.0.js"></script>
    <script src="scipts/DynamicElements.js"></script>
    <script src="scipts/EmployeeGridView.js"></script>
    <script src="scipts/index.js"></script>
</body>
</html>
