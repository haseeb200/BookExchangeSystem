<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="Search.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../../Scripts/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.inputValue.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.jscroll.min.js" type="text/javascript"></script>
    <script src="../../Scripts/kendo.all.min.js" type="text/javascript"></script>
    <link href="../styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../ContentPagesScript/SearchBooks.js" type="text/javascript"></script>
    <style type="text/css">
        #movies
        {
            width: 369px;
            height: 71px;
            padding: 211px 0 0 141px;
            background: url('../images/books.png') transparent no-repeat 0 0;
            margin: 30px auto;
        }
        .k-autocomplete
        {
            width: 240px;
            vertical-align: middle;
        }
        #titles-list img
        {
            border-radius: 4px 4px 4px 4px;
            box-shadow: 0 1px 2px #333333;
            float: left;
            font-size: 0.7em;
            height: 90px;
            line-height: 1em;
            margin: 10px 5px;
            width: 64px;
        }
        #titles-list h3
        {
            font-size: 1.2em;
            line-height: 1.2em;
            margin: 20px 0 0 80px;
        }
        #titles-list h3 span
        {
            display: block;
            font-size: 0.7em;
            margin-top: 10px;
        }
        .k-list
        {
            height: 100%;
        }
        .k-reset
        {
            border: 0 none;
            font-size: 100%;
            list-style: none outside none;
            margin: 0;
            outline: 0 none;
            padding: 0;
            text-decoration: none;
        }
        #titles-list .k-item
        {
            overflow: hidden;
        }
        .k-popup .k-list .k-item
        {
            line-height: 1.8em;
            padding: 1px 5px;
        }
        .k-popup .k-item
        {
            cursor: default;
        }
        .k-popup .k-list .k-state-hover, .k-popup .k-list .k-state-focused, .k-popup .k-list .k-state-selected
        {
            border-style: solid;
            border-width: 1px;
            padding: 0 4px;
        }
        .k-list .k-state-hover, .k-list .k-state-focused, .k-list .k-state-selected, .k-dropzone, .k-upload-files
        {
            border-radius: 3px 3px 3px 3px;
        }
        .k-state-hover, .k-state-hover:hover, .k-splitbar-horizontal-hover:hover, .k-splitbar-vertical-hover:hover, .k-list > .k-state-hover, .k-marquee, .k-pager-wrap .k-link:hover
        {
            background-color: #A99F9A;
            border-color: #A99F9A;
            color: #2E2E2E;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="example" class="k-content">
        <div id="movies">
            <input id="titles" />
        </div>
    </div>
</asp:Content>
