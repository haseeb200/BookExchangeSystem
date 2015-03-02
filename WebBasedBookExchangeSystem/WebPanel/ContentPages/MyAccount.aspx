<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="MyAccount.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../../Scripts/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.inputValue.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.activity-indicator-1.0.0.min.js" type="text/javascript"></script>
    <script src="../../Scripts/kendo.all.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.validate.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jQuery.tmpl.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.toastmessage.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/UserProfile.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/MyWishListKendoScript.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/MyBooksKendoScript.js" type="text/javascript"></script>
    <link href="../css/comments.css" rel="stylesheet" type="text/css" />
    <link href="../styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../css/animate-custom.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.toastmessage.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        body
        {
            color: #fff;
            background: #00406c;
            padding: 60px 10px 20px 20px;
        }
        .square
        {
            width: 180px;
            height: 160px;
            /*float: left;*/
            margin: 10px;
            padding: 10px 210px;
            color: #000;
            background: #fff;
            font-family: Helvetica, Arial, Sans-Serif;
        }
        #left
        {
            margin-bottom: 20px;
        }
        input.k-textbox
        {
            display: inline;
        }
        label.error
        {
            bottom: 25px;
            color: red;
            left: 240px;
            position: relative;
        }
        .k-focusable
        {
            margin-top: 0px;
        }
        .k-grid tbody .k-button
        {
            min-width: 70px;
            margin-bottom: 12px;
        }
        .profile, .books, .wishlist, .changePassword
        {
            cursor: pointer;
        }
        .k-numerictextbox
        {
            margin-bottom: 10px;
        }
        .k-edit-label, .editor-label
        {
            position: relative;
            bottom: 3px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <form id="result" method="post">
    <div id="casing">
        <div id="left">
            <div id="busy1" class="square">
            </div>
        </div>
        <div id="right">
            <!-- Sidebar widgets -->
            <div class="sidebar">
                <ul>
                    <li class="sidebox
    widget_categories">
                        <h3 class="sidetitl">
                            User Panel</h3>
                        <ul>
                            <li class="cat-item
    cat-item-4"><a class="profile" title="View all posts filed under Interviews">My Profile</a> </li>
                            <li class="cat-item cat-item-7"><a class="books" title="View all posts filed under
    Roumors">My Books</a> </li>
                            <li class="cat-item cat-item-3"><a class="wishlist" title="View
    all posts filed under News">My Wishlist</a> </li>
                            <li class="cat-item cat-item-3"><a style="color: #3C95D5" href="../ContentPages/ChangePassword.aspx"
                                class="changePassword" title="View all posts filed under News">Change Password</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="clear">
            <div class='clear'>
            </div>
        </div>
    </div>
    </form>
</asp:Content>
