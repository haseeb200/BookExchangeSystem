<%@ Page Title="" Language="C#" MasterPageFile="~/AdminPanel/MasterPage/WebAdmin.master"
    AutoEventWireup="true" CodeFile="admin.aspx.cs" Inherits="AdminPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="../css/style.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-1.7.1.min.js" type="text/javascript"></script>
    <%-- <script src="../js/jquery-ui-1.7.1.custom.min.js" type="text/javascript"></script>--%>
    <link href="../css/template.css" rel="stylesheet" type="text/css" />
    <%--<script src="../js/glow/1.7.0/core/core.js" type="text/javascript"></script>
    <link href="../js/glow/1.7.0/widgets/widgets.css" rel="stylesheet" type="text/css" />--%>
    <%--  <script src="../js/glow/1.7.0/widgets/widgets.js" type="text/javascript"></script>--%>
    <link href="../css/colour.css" rel="stylesheet" type="text/css" />
    <link href="../css/960.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.tablePagination.0.5.min.js" type="text/javascript"></script>
    <%--script src="../markitup/jquery.markitup.pack.js" type="text/javascript"></script>
    <script src="../js/custom.js" type="text/javascript"></script>--%>
    <script src="../../Scripts/jQuery.tmpl.min.js" type="text/javascript"></script>
    <script src="../../Scripts/json2.min.js" type="text/javascript"></script>
    <script src="../AdminScripts/Comments.js" type="text/javascript"></script>
    <script src="../AdminScripts/Glance.js" type="text/javascript"></script>
    <link href="../../WebPanel/css/animate-custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/kendo.all.min.js" type="text/javascript"></script>
    <link href="../../WebPanel/styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../WebPanel/styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../AdminScripts/AllPost.js" type="text/javascript"></script>
    <script src="../AdminScripts/Others.js" type="text/javascript"></script>
    <script src="../AdminScripts/AllUsers.js" type="text/javascript"></script>
    <script type="text/javascript">
        // initialise plugins

        //       
        //        glow.ready(function () {
        //            new glow.widgets.Sortable(
        //					'#content .grid_5, #content .grid_6',
        //					{
        //					    draggableOptions: {
        //					        handle: 'h2'
        //					    }
        //					}
        //				);
        //        });
        //        

    </script>
    <script id="AllPostTemplate" type="text/x-kendo-tmpl">
                <tr >
                    <td>
                        <img src="../../BookImages/${ BookImageName }" width="150px" height="190px" />
                    </td>
                    <td>
                        ${ Title }
                    </td>
                    <td>
                        ${ Poster }
                    </td>
                    <td>
                    <a class="k-button k-button-icontext k-viewpost-grid" data-id="#= Book_Id #">
                        
                            View Post
                            
                    </a>
                    <br />
                    <a class="k-button k-button-icontext k-grid-delete" data-id="#= Book_Id #">
                        
                            Delete
                            <span class="k-icon k-delete"></span>
                    </a>
                    
                    </td>
                </tr>
    </script>
    <script id="PendingPostTemplate" type="text/x-kendo-tmpl">
                <tr >
                    <td>
                        <img src="../../BookImages/${ BookImageName }" width="150px" height="190px" />
                    </td>
                    <td>
                        ${ Title }
                    </td>
                    <td>
                        ${ Poster }
                    </td>
                    <td>
                    <a class="k-button k-button-icontext k-viewpost-grid" data-id="#= Book_Id #">
                        
                            View Post
                            
                    </a>
                    <br />
                    <a class="k-button k-button-icontext k-publish-grid" data-id="#= Book_Id #">
                        
                            Publish
                            
                    </a>
                    <br />
                    <a class="k-button k-button-icontext k-grid-delete" data-id="#= Book_Id #">
                        
                            Delete
                            <span class="k-icon k-delete"></span>
                    </a>
                    
                    </td>
                </tr>
    </script>
    <style type="text/css">
        span a
        {
            padding-left: 15px;
        }
        .comments
        {
            border-bottom: 1px solid;
            border-color: #DDDDDD;
        }
        #tablePagination_rowsPerPage
        {
            width: 60px;
        }
        #tablePagination_currPage
        {
            width: 20px;
        }
        #tablePagination_paginater
        {
            padding-left: 85px;
        }
        #tablePagination_firstPage
        {
            padding-right: 3px;
        }
        #tablePagination_prevPage
        {
            padding-right: 3px;
        }
        #tablePagination_lastPage
        {
            padding-left: 3px;
        }
        #tablePagination_nextPage
        {
            padding-left: 3px;
        }
        
        #glance td
        {
            padding-left: 5px;
            width: 70%;
        }
        #glanceBox
        {
            margin-top: 400px; /*310px*/
        }
        .k-grid td
        {
            width: 70px;
        }
        .ViewAllPost, .PendingPost, .ViewAllUsers, .PendingUsers, .Comments, .Category:hover
        {
            cursor: pointer;
        }
        .countPost, .countUser
        {
            display: inline;
            position: relative;
            left: 5px;
            font-weight: normal;
        }
        
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="Server">
    <div id="content" class="container_16 clearfix">
        <div class="grid_5">
            <div class="box">
                <h2>
                    Quick Post</h2>
                <div id="sidebar" class="right">
                    <ul id="menu">
                        <li><a class="ico_posts">Posts</a>
                            <ul>
                                <li><a class="ViewAllPost">View All Post</a></li>
                                <li><a class="PendingPost">Pending Post<label class="countPost"></label></a></li>
                            </ul>
                            <a class="ico_user">Users</a>
                            <ul>
                                <li><a class="ViewAllUsers">View All Users</a></li>
                                <li><a class="PendingUsers">Users Waiting for Approval<label class="countUser"></label></a></li>
                            </ul>
                            <a class="ico_page">Others</a>
                            <ul>
                                <li><a class="Comments">Latest Comments</a></li>
                                <li><a class="Category">Manage Books Categories</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="box" id="glanceBox">
                <h2>
                    At a Glance</h2>
                <table id="glance" style="table-layout: auto;">
                </table>
            </div>
        </div>
        <div class="grid_6">
            <img class="loadingCommentImage" src="../img/loading.gif" style="position: relative;
                top: 220px; left: 290px" />
            <div id="contentContainer">
            </div>
        </div>
    </div>
</asp:Content>
