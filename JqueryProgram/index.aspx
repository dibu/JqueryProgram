<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="JqueryProgram.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div id="masterdiv">
        </div>
        <button type="button" onclick="DynamicElements.getInputValues()">Get Values</button>
    </form>
    <script src="scipts/jquery-3.6.0.js"></script>
    <script src="scipts/DynamicElements.js"></script>
    <script src="scipts/index.js"></script>
</body>
</html>
