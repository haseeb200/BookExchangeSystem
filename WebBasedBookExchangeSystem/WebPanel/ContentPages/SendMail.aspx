<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="SendMail.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../../Scripts/jquery-1.7.1.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.toastmessage.js" type="text/javascript"></script>
    <script src="../../Scripts/kendo.all.min.js" type="text/javascript"></script>
    <script src="../../Scripts/rwQueryString-1.0.jquery.min.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/SendMail.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.blockUI.js" type="text/javascript"></script>
    <link href="../styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.toastmessage.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .toast-item-close
        {
            cursor: pointer;
        }
        input.k-textbox
        {
            width: 500px;
            margin-left: 50px;
        }
        .k-button
        {
            width: 100px;
            height: 30px;
            margin-left: 250px;
            margin-top: 10px;
            position: absolute;
        }
        .detail
        {
            height: 550px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="detail">
        <div id="mainDiv" style="padding-top: 50px; padding-left: 90px;">
            <div class="mail" style="padding-top: 10px;">
                <span style="padding-left: 50px; padding-top: 20px;"><strong>Send To:</strong></span>
                <span>
                    <input class="k-textbox" name="reciever" type="text" readonly="readonly" /></span>
            </div>
            <div id="example" style="padding-left: 50px;">
                <textarea id="editor" style="width: 620px; height: 320px">
    </textarea>
                <input id="Button1" class="k-button" type="button" value="Send" />
            </div>
        </div>
    </div>
</asp:Content>
