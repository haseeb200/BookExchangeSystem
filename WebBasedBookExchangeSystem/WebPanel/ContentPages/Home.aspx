<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="Home.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    
    <script src="../../Scripts/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.jscroll.min.js" type="text/javascript"></script>
    <script src="../js/custom.js" type="text/javascript"></script>
    <script src="../js/jquery.carouFredSel-5.5.0.js" type="text/javascript"></script>
    <script src="../js/jquery.flexslider-min.js" type="text/javascript"></script>
    <script src="../js/superfish.js" type="text/javascript"></script>
    <script src="../js/html5.js" type="text/javascript"></script>
    <script src="../../Scripts/moment.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.raty.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jQuery.tmpl.min.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/slider.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/RecentPost.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/RecentReviews.js" type="text/javascript"></script>
    <script src="../ContentPagesScript/TopPosts.js" type="text/javascript"></script>
   
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="casing">
        
        <div id="feature">
        </div>
        <!-- end feature -->
        <div id="videoslide">
            <div id="timer1" class="timer">
            </div>
            <ul id="carousel">
                <!--Slider content -->
            </ul>
        </div>
        <!-- end videoslide -->
        <div id="home-content">
            <h2 class="sectionhead">
                Latest Posts</h2>
            <!--Recent Post Content -->
            <div id="navigation" class="clearfix">
            </div>
        </div>
        <!-- end story section
        -->
        <div id="homeright">
            <div class="latest-review">
                <h2 class="sectionhead">
                    Latest Comments</h2>
                <ul class="siderevs">
                    <!-- Latest Comments Content -->
                </ul>
            </div>
            <div class="latest-review">
                <h2 class="sectionhead">
                    Top Rated Books</h2>
                <ul class="sidetops">
                    <!--Top Rated Books-->
                </ul>
            </div>
        </div>
        <div class='clear'>
        </div>
    </div>
   
</asp:Content>
