<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="BooksLibrary.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../../Scripts/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.inputValue.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.toastmessage.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-ui-1.8.18.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.jscroll.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jQuery.tmpl.min.js" type="text/javascript"></script>
    <script src="../../Scripts/kendo.all.min.js" type="text/javascript"></script>
    <script src="../../Scripts/moment.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.blockUI.js" type="text/javascript"></script>
    <script src="../../Scripts/rwQueryString-1.0.jquery.min.js" type="text/javascript"></script>
    <%-- <link href="../css/dark-hive/jquery-ui-1.8.18.custom.css" rel="stylesheet" type="text/css" />--%>
    <%--<link href="../css/humanity/jquery-ui-1.8.17.custom.css" rel="stylesheet" type="text/css" />--%>
    <link href="../css/custom-theme/jquery-ui-1.8.23.custom.css" rel="stylesheet" type="text/css" />
    <link href="../styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../css/animate-custom.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.toastmessage.css" rel="stylesheet" type="text/css" />
    <%--<link href="../css/BookDetail.css" rel="stylesheet" type="text/css" />--%>
    <script src="../ContentPagesScript/BooksLibrary.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/BookDetail.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/BookReviews.js" type="text/javascript"></script>
    <script type="text/x-kendo-tmpl" id="template">
        
        <ul id="vid">
                <li class="panel"><a>

                    <img width="150" height="200" src="../../BookImages/${BookImageName}"
                    class="v-image wp-post-image" /></a>

                    <button id="ViewDetail" class="k-button" title="ViewDetail" type="${Book_Id}">
                    Have a Look</button>
                </li>
        </ul>   
    
    </script>
    <script type="text/x-jquery-tmpl" id="TemplateDetail">
      
        <div id="left">
            <div class="post" id="post-52">
                <p class="aligncenter">
                </p>
                <div class="title">
                    <h2>
                        <a rel="bookmark" title="Permanent Link to ${Title}">
                            ${Title}</a></h2>
                    <div class="postmeta">
                        <span>Posted by <a href="../ContentPages/BooksLibrary.aspx?uid=${User_Id}" title="Posts by ${User}"
                            rel="author">${User}</a></span> | <span class="DateTime"></span>
                    </div>
                    
                </div>

                <div class="entry">
                    <img width="150" height="200" src="../../BookImages/${BookImageName}" class="vs-image wp-post-image"
                        />
                    <p class="bookDescription">
                    </p>
                    <div class="clear">
                    </div>
                </div>
                <div style="margin-top:15px;">
                    <h2>
                        Product Details</h2>
                    <ul class="detailspace">
                        <li class="space"><strong><span>ISBN: </span></strong><span>${ISBN} </span></li>
                        <li class="space"><strong><span>Author: </span></strong><span>${Author}</span> </li>
                        <li class="space"><strong><span>Publisher: </span></strong><span>${Publisher}</span>
                        </li>
                        <li class="space"><strong><span>Edition: </span></strong><span>${Edition}</span>
                        </li>
                        <li class="space"><strong><span>Condition: </span></strong><span>${Condition}</span>
                        </li>
                        <li class="space"><strong><span>Price: </span></strong><span>${Price}</span> </li>
                        <li class="space"><strong><span>Contact: </span></strong><span>${CellPhone}</span>
                        </li>
                    </ul>
                    <button class="k-button" title="MyWish" type="${Book_Id}" style="margin-left: 0px;
                        margin-top: 20px; width: 120px;">
                        Add To Wishlist</button>
                    <button id="BuyButton" class="k-button" type="${Book_Id}" title="email" name="${EmailAddress}"
                        style="margin-left: 0px; margin-top: 20px; width: 120px">
                        Email me</button>
                    <table class="RatingTable" style="width: 100%; padding-left: 10px; table-layout: auto;">
                        <tr>
                            <td class="style1">
                                <p style="font-size: x-large; font-family: Arial; margin-bottom: 100px;">
                                    Customer Reviews
                                    <br />
                                    <span style="font-size: medium;"><strong>Average Customer Review</strong> </span>
                                    <br />
                                    <br />
                                    <span class="star" id="${Book_Id}" style="font-size: medium; padding-left: 30px;">
                                    </span>
                                </p>
                            </td>
                            <td class="style2">
                                <br />
                                <ul class="insidebars" style="padding-left: 45px;">
                                    <li><a>5 stars</a></li>
                                    <li><a>4 stars</a></li>
                                    <li><a>3 stars</a></li>
                                    <li><a>2 stars</a></li>
                                    <li><a>1 stars</a></li>
                                </ul>
                            </td>
                            <td class="style3">
                                <ul class="bars">
                                    <li class="progress1"></li>
                                    <li class="progress2"></li>
                                    <li class="progress3"></li>
                                    <li class="progress4"></li>
                                    <li class="progress5"></li>
                                </ul>
                            </td>
                            <td>
                                <br />
                                <ul class="outsidebars">
                                </ul>
                            </td>
                        </tr>
                    </table>
                    <div class="commentSection">
                        <!-- <fieldset style="width: 450px;">-->
                        <div class="header">
                            <h3 class="commentsHeader" style="color: olive; padding-left: 30px; padding-top: 5px;
                                margin-bottom: 10px">
                                Comments</h3>
                        </div>
                        <div>
                            <table style="table-layout: auto; position: relative; right: 20px;">
                                <tr>
                                    <td>
                                        <p class="ReviewsContainer">
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            <!--<p class="ReviewsContainer">
                            </p>-->
                            <div class="commentbox">
                                <img class="AddComment" src="../images/add_comment.png" style="height: 52px; width: 57px" />
                                <h2 style="color: Olive;">
                                    <strong>Add a Comment</strong>
                                </h2>
                                <textarea class="k-textbox" id="MessageTextBox" name="reviews" cols="20" rows="2" style="height: 190px;
                                    width: 520px; margin-top: 25px"></textarea>
                                <br />
                                <button title="SubmitReviews" class="k-button" style="margin-left: 195px; margin-top: 0px">
                                    Submit</button>
                            </div>
                        </div>
                        <!--  </fieldset>-->
                    </div>
                </div>
            </div>
        </div>
        <div id="right">
            <!-- Sidebar widgets -->
            <div class="sidebar">
                <ul>
                    <li class="sidebox widget_categories">
                        <h3 class="sidetitl">
                            Categories</h3>
                        <ul class="categories">
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="clear">
            </div>
             
        </div>
        <div class='clear'>
        </div>
    </script>
    <script type="text/x-jquery-tmpl" id="TemplateCategory">
        <li class="cat-item cat-item-4"><a type="categories" class="${Category_Id}"
         title="View all posts filed under ${CategoryName}">${CategoryName}</a> </li>
    </script>
    <style type="text/css">
        .k-button
        {
            height: 30px;
            margin-bottom: 10px;
            margin-left: 35px;
            margin-top: 5px;
            width: 100px;
        }
        
        a:hover
        {
            cursor: pointer;
        }
        #pageContent
        {
            overflow: hidden;
        }
        .ui-accordion-header, .ui-accordion-content
        {
            background: #FFFFFF;
        }
        .entry {
            border-bottom: 1px dotted #DDDDDD;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="pageContent">
    </div>
</asp:Content>
