<%@ Page Language="C#" AutoEventWireup="true" CodeFile="admin_login.aspx.cs" Inherits="AdminPanel_MasterPage_admin_login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/style.css" rel="stylesheet" type="text/css" />
    
</head>
<body>
    <div id="login_container">
        <div id="header">
            <div id="logo">
                <h1>
                    <a href="/">AdmintPanel</a></h1>
            </div>
        </div>
        <!-- end header -->
        <form id="Form1" runat="server">
        <h1 class=loginHead style="color: aliceblue">Login</h1>
        <asp:Login ID="Login1" runat="server" EnableViewState="False" RenderOuterTable="False" DestinationPageUrl="admin.aspx">
            <LayoutTemplate>
                <div id="login" class="section">
                    <div id="fail" class="info_div">
                        <span class="ico_cancel">
                            <asp:Literal ID="FailureText" runat="server"></asp:Literal></span></div>
                    <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="UserName">Username:</asp:Label>
                    <asp:TextBox ID="UserName" runat="server" CssClass="input"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName"
                        CssClass="failureNotification" ErrorMessage="User Name is required." ToolTip="User Name is required."
                        ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password">Password:</asp:Label>
                    <asp:TextBox ID="Password" runat="server" CssClass="input" TextMode="Password"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password"
                        CssClass="failureNotification" ErrorMessage="Password is required." ToolTip="Password is required."
                        ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    <asp:CheckBox ID="RememberMe" runat="server" />
                    <asp:Label ID="RememberMeLabel" runat="server" AssociatedControlID="RememberMe" CssClass="input noborder">Keep me logged in</asp:Label>
                    <asp:Button ID="LoginButton" CssClass="loginbutton" runat="server" CommandName="Login"
                        Text="Log In" ValidationGroup="LoginUserValidationGroup" 
                        />
                </div>
            </LayoutTemplate>
        </asp:Login>
        </form>
    </div>
</body>
</html>
