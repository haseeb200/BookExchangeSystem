<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../../Scripts/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.inputValue.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.jscroll.min.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/textboxConfig.js" type="text/javascript"></script>
    <link href="../css/comments.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .recoverPasswordLink {
            position: relative;
            left: 50px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    
        <div id ="commentform">
    <div id="respond">
        <h2>
            Log In
        </h2>
        <p>
            Please enter your username and password.
            <asp:HyperLink ID="RegisterHyperLink" runat="server" EnableViewState="false">Register</asp:HyperLink>
            if you don't have an account.
        </p>
        <asp:Login ID="LoginUser" runat="server" EnableViewState="false" RenderOuterTable="false" DestinationPageUrl="../ContentPages/MyAccount.aspx">
            <LayoutTemplate>
                <span class="failureNotification">
                    <asp:Literal ID="FailureText" runat="server"></asp:Literal>
                </span>
                <div class="fieldContainer">
                    <p class="comment-form-author">
                        <%-- <label for="author">
                        Name<span class="required">*</span></label>
                    <input id="author" name="author" type="text"  value="" size="30" aria-required="true">--%>
                        <asp:Label ID="UserNameLabel" CssClass="required" runat="server" AssociatedControlID="UserName">Username:</asp:Label>
                        <asp:TextBox ID="UserName" CssClass="usertextEntry" runat="server"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName"
                            CssClass="validationField" ErrorMessage="User Name is required." ToolTip="User Name is required."
                            ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                    <p class="comment-form-email">
                        <%--<label for="email">
                        Email<span class="required">*</span></label>
                    <input id="email" name="email" type="text" value="" size="30" aria-required="true">--%>
                        <asp:Label ID="PasswordLabel" CssClass="required" runat="server" AssociatedControlID="Password">Password:</asp:Label>
                        <asp:TextBox ID="Password" runat="server" TextMode="Password"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password"
                            CssClass="validationField" ErrorMessage="Password is required." ToolTip="Password is required."
                            ValidationGroup="LoginUserValidationGroup">*</asp:RequiredFieldValidator>
                    </p>
                    <p>
                        <asp:CheckBox ID="RememberMe" runat="server" />
                        <asp:Label ID="RememberMeLabel" runat="server" AssociatedControlID="RememberMe" CssClass="inline">Keep me logged in</asp:Label>
                        <asp:HyperLink ID="HyperLink1" runat="server" CssClass="recoverPasswordLink" NavigateUrl="../ContentPages/RecoverPassword.aspx">Forgot your password?</asp:HyperLink>
                    </p>
                    <!-- ENDS allowed tags -->
                    <p class="form-submit">
                        <%--<input name="submit" type="submit" id="submit" value="Post Comment">--%>
                        <asp:Button ID="LoginButton" runat="server" CommandName="Login" Text="Log In" 
                            ValidationGroup="LoginUserValidationGroup" onclick="LoginButton_Click" />
                    </p>
                </div>
            </LayoutTemplate>
        </asp:Login>
    </div>
    </div>
   
</asp:Content>
