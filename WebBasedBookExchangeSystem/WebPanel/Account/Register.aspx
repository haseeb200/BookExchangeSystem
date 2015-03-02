<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="Register.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="../css/comments.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.inputValue.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.jscroll.min.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/textboxConfig.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="commentform">
        <div id="respond">
            <asp:CreateUserWizard ID="RegisterUser" runat="server" EnableViewState="false" OnCreatedUser="RegisterUser_CreatedUser"
                DisableCreatedUser="True" LoginCreatedUser="False" CompleteSuccessText="Your account has been successfully created,and it is in activation proccess.it will be activated in 24 hrs."
                ContinueDestinationPageUrl="../ContentPages/Home.aspx">
                <LayoutTemplate>
                    <asp:PlaceHolder ID="wizardStepPlaceholder" runat="server"></asp:PlaceHolder>
                    <asp:PlaceHolder ID="navigationPlaceholder" runat="server"></asp:PlaceHolder>
                </LayoutTemplate>
                <CompleteSuccessTextStyle Font-Bold="True" ForeColor="#FF3300" />
                <WizardSteps>
                    <asp:CreateUserWizardStep ID="RegisterUserWizardStep" runat="server">
                        <ContentTemplate>
                            <h2>
                                Create a New Account
                            </h2>
                            <p>
                                Use the form below to create a new account.
                            </p>
                            <p>
                                Passwords are required to be a minimum of
                                <%= Membership.MinRequiredPasswordLength %>
                                characters in length.
                            </p>
                            <span class="failureNotification">
                                <asp:Literal ID="ErrorMessage" runat="server"></asp:Literal>
                            </span>
                            <asp:ValidationSummary ID="RegisterUserValidationSummary" runat="server" CssClass="failureNotification"
                                ValidationGroup="RegisterUserValidationGroup" />
                            <div class="fieldContainer">
                                <div class="accountInfo">
                                    <p>
                                        <asp:Label ID="FirstNameLabel" runat="server" AssociatedControlID="FirstName">First Name:</asp:Label>
                                        <asp:TextBox ID="FirstName" runat="server" CssClass="textEntry"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="FirstNameRequired" runat="server" ControlToValidate="FirstName"
                                            CssClass="validationField" ErrorMessage="First Name is required." ToolTip="First Name is required."
                                            ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                                    </p>
                                    <p>
                                        <asp:Label ID="LastNameLabel" runat="server" AssociatedControlID="LastName">Last Name:</asp:Label>
                                        <asp:TextBox ID="LastName" runat="server" CssClass="textEntry"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="LastNameRequired" runat="server" ControlToValidate="LastName"
                                            CssClass="validationField" ErrorMessage="Last Name is required." ToolTip="Last Name is required."
                                            ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                                    </p>
                                    <p>
                                        <asp:Label ID="GenderLabel" runat="server" AssociatedControlID="Gender">Gender:</asp:Label>
                                        <asp:RadioButtonList ID="Gender" runat="server" CssClass="textEntry">
                                            <asp:ListItem runat="server" Text="Male" Value="male" Selected="True"></asp:ListItem>
                                            <asp:ListItem runat="server" Text="Female" Value="female"></asp:ListItem>
                                        </asp:RadioButtonList>
                                    </p>
                                    <p>
                                        <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="UserName">User Name:</asp:Label>
                                        <asp:TextBox ID="UserName" runat="server" CssClass="usertextEntry"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName"
                                            CssClass="validationField" ErrorMessage="User Name is required." ToolTip="User Name is required."
                                            ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                                    </p>
                                    <p>
                                        <asp:Label ID="EmailLabel" runat="server" AssociatedControlID="Email">E-mail:</asp:Label>
                                        <asp:TextBox ID="Email" runat="server" CssClass="textEmail"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="EmailRequired" runat="server" ControlToValidate="Email"
                                            CssClass="validationField" ErrorMessage="E-mail is required." ToolTip="E-mail is required."
                                            ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                                       <%-- <asp:RegularExpressionValidator ID="EmailRequiredExpressionRequired" runat="server"
                                            ErrorMessage="E-mail is not valid" CssClass="validationField" ToolTip="E-mail is not valid."
                                            ValidationGroup="RegisterUserValidationGroup" ValidationExpression="/^([a-zA-Z0-9_\.\-])+\@+([a-zA-Z0-9\-]{2,})+\.+([a-zA-Z0-9\.]{2,6})$/"
                                             ControlToValidate="Email">*</asp:RegularExpressionValidator>--%>
                                    </p>
                                    <p>
                                        <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password">Password:</asp:Label>
                                        <asp:TextBox ID="Password" runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password"
                                            CssClass="validationField" ErrorMessage="Password is required." ToolTip="Password is required."
                                            ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                                    </p>
                                    <p>
                                        <asp:Label ID="ConfirmPasswordLabel" runat="server" AssociatedControlID="ConfirmPassword">Confirm Password:</asp:Label>
                                        <asp:TextBox ID="ConfirmPassword" runat="server" CssClass="passwordEntry" TextMode="Password"></asp:TextBox>
                                        <asp:RequiredFieldValidator ControlToValidate="ConfirmPassword" CssClass="validationField"
                                            Display="Dynamic" ErrorMessage="Confirm Password is required." ID="ConfirmPasswordRequired"
                                            runat="server" ToolTip="Confirm Password is required." ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                                        <asp:CompareValidator ID="PasswordCompare" runat="server" ControlToCompare="Password"
                                            ControlToValidate="ConfirmPassword" CssClass="validationField" Display="Dynamic"
                                            ErrorMessage="The Password and Confirmation Password must match." ValidationGroup="RegisterUserValidationGroup">*</asp:CompareValidator>
                                    </p>
                                    <p>
                                        <asp:Label ID="CountryLabel" runat="server" AssociatedControlID="Country">Country:</asp:Label>
                                        <asp:TextBox ID="Country" runat="server" CssClass="textEntry" Text="Pakistan" ReadOnly="True"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="CountryRequired" runat="server" ControlToValidate="Country"
                                            CssClass="validationField" ErrorMessage="Country is required." ToolTip="Country is required."
                                            ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                                    </p>
                                    <p>
                                        <asp:Label ID="CityLabel" runat="server" AssociatedControlID="City">City:</asp:Label>
                                        <asp:TextBox ID="City" runat="server" CssClass="textEntry" Text="Karachi" ReadOnly="True"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="CityRequired" runat="server" ControlToValidate="City"
                                            CssClass="validationField" ErrorMessage="City is required." ToolTip="City is required."
                                            ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                                    </p>
                                    <p>
                                        <asp:Label ID="CellPhoneLabel" runat="server" AssociatedControlID="CellPhone">CellPhone:</asp:Label>
                                        <asp:TextBox ID="CellPhone" runat="server" CssClass="textnumeric"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="CellPhoneRequired" runat="server" ControlToValidate="CellPhone"
                                            CssClass="validationField" ErrorMessage="CellPhone is required." ToolTip="CellPhone is required."
                                            ValidationGroup="RegisterUserValidationGroup">*</asp:RequiredFieldValidator>
                                    </p>
                                    <p class="submitButton">
                                        <asp:Button ID="CreateUserButton" runat="server" CommandName="MoveNext" Text="Create User"
                                            ValidationGroup="RegisterUserValidationGroup" />
                                    </p>
                                </div>
                            </div>
                        </ContentTemplate>
                        <CustomNavigationTemplate>
                        </CustomNavigationTemplate>
                    </asp:CreateUserWizardStep>
                    <asp:CompleteWizardStep runat="server">
                    </asp:CompleteWizardStep>
                </WizardSteps>
            </asp:CreateUserWizard>
        </div>
    </div>
</asp:Content>
