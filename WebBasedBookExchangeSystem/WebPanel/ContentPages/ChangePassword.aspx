<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="ChangePassword.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="../css/comments.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        $(function () {
            $('input').css('display', 'inline');
            $('input[type=submit]').css({ 'position': 'relative', 'left': '70px' });
            $('.failureText').css({'position':'absolute','top':'310px'});
        });
    </script>
    <style type="text/css">
        td span
        {
            color: red;
            left: 250px;
        }
        .titleText
        {
            text-align: center;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="commentform">
        <div id="respond">
            <div class="fieldContainer">
                <div class="accountInfo">
                    <asp:ChangePassword ID="ChangePassword" runat="server" TitleTextStyle-ForeColor="Red"
                        ContinueDestinationPageUrl="~/WebPanel/ContentPages/MyAccount.aspx" FailureTextStyle-CssClass="failureText">
                        <TitleTextStyle ForeColor="Red" Font-Bold="True" Font-Size="Medium" CssClass="titleText">
                        </TitleTextStyle>
                    </asp:ChangePassword>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
