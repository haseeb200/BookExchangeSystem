<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="SellBook.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../../Scripts/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.inputValue.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.toastmessage.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.validate.min.js" type="text/javascript"></script>
    <script src="../../Scripts/kendo.all.min.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/BookScript.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/KendoFileUpload.js" type="text/javascript"></script>
    <%--<link href="../css/niceforms-default.css" rel="stylesheet" type="text/css" />--%>
    <link href="../styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.toastmessage.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .toast-item-wrapper {
            width: 500px;
        }
        .toast-item p {
            margin-right: 5px;
        }
        .toast-position-top-center {
            margin-left: -200px;
        }
        .toast-item-close {
            cursor: pointer;
        }
        label.error
        {
            bottom: 35px;
            color: red;
            left: 220px;
            position: relative;
        }
        .k-textbox
        {
            width: 300px;
        }
        
        .k-button
        {
            width: 100px;
            height: 30px;
         
        }
        .bookInfo
        {
            padding-top: 25px;
            padding-left: 50px;
        }
        .heading
        {
            position: relative;
            bottom: 20px;
            color: olivedrab;
            font-weight: bold;
            margin-top: 30px;
            text-align: center;
            text-decoration: underline;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <form method="post" class="niceform" id="SellBookForm">
    <fieldset class="MainField">
        <h1 class="heading">
            Post Your Book For Sell</h1>
        <%--<div>
                <iframe id="UploadFrame" class="myframe" src="FileUpload.aspx" width="500px" height="590px"
                    frameborder="0"></iframe>
            </div>--%>
        <div id="uploadFile" style="float: right">
            <img id="Img1" src="../images/image-not-available.gif" class="BookImage" alt="picture"
                runat="server" width="210" height="250" />
            <div id='kendoUpload'>
                <strong class="message" style="color: red">Upload Book Image:</strong>
                <input name="files" id="files" type="file" />
            </div>
        </div>
        <div class="bookInfo" style="float: left; width: 400px;">
            <dl>
                <dt>
                    <label for="email">
                        Book Title:</label></dt>
                <dd>
                    <input class="k-textbox" type="text" name="booktitle" id="TitleTextBox" size="54" /></dd>
            </dl>
            <dl>
                <dt>
                    <label for="email">
                        ISBN #:</label></dt>
                <dd>
                    <input class="k-textbox" type="text" name="isbn" id="ISBNTextBox" size="54" /></dd>
            </dl>
            <dl>
                <dt>
                    <label for="email">
                        Edition:</label></dt>
                <dd>
                    <input class="k-textbox" type="text" name="edition" id="EditionTextBox" size="54" /></dd>
            </dl>
            <dl>
                <dt>
                    <label for="email">
                        Author:</label></dt>
                <dd>
                    <input class="k-textbox" type="text" name="author" id="AuthorTextBox" size="54" /></dd>
            </dl>
            <dl>
                <dt>
                    <label for="password">
                        Publisher:</label></dt>
                <dd>
                    <input class="k-textbox" type="text" name="publisher" id="PublisherTextBox" size="54" /></dd>
            </dl>
            <dl>
                <dt>
                    <label for="password">
                        Price (Rs):</label></dt>
                <dd>
                    <%--<input class="k-textbox" type="text" name="price" id="SllingPriceTextBox" size="54" />--%>
                    <input id="numeric" type="number" value="0" min="0" max="2000" step="1" />
                </dd>
            </dl>
            <dl>
                <dt>
                    <label for="email" style="padding-top: 20px">
                        Description:</label></dt>
                <dd>
                    <%--<textarea class="k-textbox" name="comments" id="DescriptionTextBox" rows="5" cols="36"></textarea>--%>
                    <textarea id="editor" style="width: 600px; height: 320px"></textarea>
                </dd>
            </dl>
            <dl>
                <dt>
                    <label for="title" style="padding-top: 20px">
                        Select Category:</label>
                </dt>
                <dd>
                    <input id="categoryDropDown" />
                </dd>
            </dl>
            <dl>
                <dt>
                    <label for="gender" style="padding-top: 20px">
                        Condition:</label></dt>
                <dd>
                    <select id="conditionDropDown">
                        <option>Like New</option>
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Acceptable</option>
                    </select>
                </dd>
            </dl>
            <dl class="submit" >
                <%-- <a id="SubmitButton">
                    <img src="../images/images/postbook.jpg" height="40px" />
                </a>--%>
                <input id="SubmitButton" class="k-button" style="margin-top: 20px;margin-left: 250px;" type="button" value="Post Book" />
            </dl>
        </div>
    </fieldset>
    </form>
</asp:Content>
