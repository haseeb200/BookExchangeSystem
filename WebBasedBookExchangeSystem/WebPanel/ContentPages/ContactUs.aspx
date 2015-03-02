<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="ContactUs.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../../Scripts/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.inputValue.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.jscroll.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.toastmessage.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.validate.min.js" type="text/javascript"></script>
    <link href="../styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.toastmessage.css" rel="stylesheet" type="text/css" />
    <script src="../ContentPagesScript/ContactUs.js" type="text/javascript"></script>
    <style type="text/css">
        .toast-item-wrapper
        {
            width: 500px;
        }
        .toast-item p
        {
            margin-right: 5px;
        }
        .toast-position-top-center
        {
            margin-left: -200px;
        }
        .toast-item-close
        {
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
            width: 400px;
        }
        textarea.k-textbox
        {
            height: 150px;
        }
        .k-button
        {
            width: 100px;
            height: 30px;
            margin-left: 150px;
        }
        #messageError
        {
            position: relative;
            left: 190px;
            bottom: 60px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="form">
        <form method="post" class="niceform" id="ContactUsForm">
        <fieldset class="MainField">
            <p style="text-align: center; font-size: xx-large; color: Olive; text-decoration: underline;
                font-family: Comic Sans MS; padding-top: 20px;">
                <strong>CONTACT US</strong></p>
            <br />
            <p style="margin-left: 130px; margin-top: 20px;">
                <strong style="font-weight: bold">We are very interested in hearing from you. To submit
                    your questions or comments to us, please fill out the form below.</strong></p>
            <br />
            <br />
            <div style="margin-left: 300px;">
                <dl>
                    <dt>
                        <label for="Name">
                            Your Name:</label></dt>
                    <dd>
                        <%--<input type="text" title="Name" name="nametext" id="NameTextBox" class="NameText"
                        size="54" />--%>
                        <input class="k-textbox" type="text" title="Name" name="nametext" id="NameTextBox" />
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <label for="Email">
                            Your Email:</label></dt>
                    <dd>
                        <%-- <input type="text" title="Email" name="emailtext" id="EmailTextBox" class="EmailText"
                        size="54" />--%>
                        <input class="k-textbox" type="text" title="Email" name="emailtext" id="EmailTextBox" />
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <label for="Subject">
                            Subject:</label></dt>
                    <dd>
                        <%--<input type="text" name="subject" id="SubjectTextBox" size="54" />--%>
                        <input class="k-textbox" type="text" name="subject" id="SubjectTextBox" />
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <label for="Message">
                            Message:</label></dt>
                    <dd>
                        <textarea class="k-textbox" name="message" id="MessageTextBox" rows="5" cols="36"></textarea>
                        <span id="messageError"></span>
                    </dd>
                </dl>
                <dl class="submit">
                    <%--<asp:ImageButton ID="ImageButton1" CssClass="SubmitContactForm" ImageUrl="~/WebPanel/images/submit.jpg"
                    Height="30px" runat="server" />--%>
                    <input id="SubmitContactForm" class="k-button" type="button" value="Submit" />
                </dl>
            </div>
        </fieldset>
        </form>
    </div>
</asp:Content>
