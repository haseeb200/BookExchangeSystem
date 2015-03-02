<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="RecoverPassword.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../../Scripts/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.inputValue.js" type="text/javascript"></script>
    <link href="../css/comments.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        $(function () {
            $('input').css('display', 'inline');
            $('input[type=submit]').css('margin-left', '180px');
            $('#respond').css('margin-left', '300px');
            $('table td').css('font-weight', 'bold');

            $('.recovery tbody tr td table tbody tr:eq(2) td:last input').inputValue({ allow: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890' });
        });
    </script>
    <style type="text/css">
        td span
        {
            color: red;
            left: 250px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="commentform">
        <div id="respond">
            <div class="fieldContainer">
                <div class="accountInfo">
                    <asp:PasswordRecovery ID="RecoverPassword" CssClass="recovery" runat="server" OnSendingMail="RecoverPassword_SendingMail">
                        <MailDefinition From="onlinebookexchange@gmail.com" Priority="High" Subject="Password Change Notification!">
                        </MailDefinition>
                    </asp:PasswordRecovery>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
