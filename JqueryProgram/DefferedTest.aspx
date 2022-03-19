<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DefferedTest.aspx.cs" Inherits="JqueryProgram.DefferedTest" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div id="maindiv">
        </div>
        <button type="button" id="btngenerate" onclick="DeferredTest.addDropDown();">Generate</button>
        <div id="container">
           
        </div>
    </form>
  <script src="scipts/jquery-3.6.0.js"></script>
  <script src="scipts/DefferedTest.js"></script>
</body>
</html>
