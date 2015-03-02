<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="AboutUs.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .buyers li
        {
            list-style-type: disc;
            margin-left: 25px;
            
        }
        .buyers {
            padding-top: 20px;
            padding-left: 30px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <fieldset style="padding-top: 20px;">
        <h1>
            <span style="text-align: center; font-size: x-large; color: Olive; font-family: Comic Sans MS;
                text-decoration: underline; font-weight: bold; padding-left: 430px;">About Us</span>
        </h1>
        <br />
        <p style="text-align: justify; padding-left: 45px; width: 900px">
            Exchange books to save money and Planet. Why pay full prices for a college/school
            textbook you'll only use for one year or part of year or semester? You can save
            money (typically 40 - 80% off the new price) and trees by opting to exchange textbooks.
            It's easy, fast, and sure to save you money! It is one site that sells used textbooks.
            We also offer new books, non-text books, and even you can give your books free if
            you believe that these books are not in your use you can donate books here people
            need them will contact you by them self.
        </p>
        <br />
        <ul class="buyers">
            <li>You Can sell your old books here </li>
            <li>You Can donate your old books (Set price as 0.00) </li>
            <li>You Can sell New books </li>
        </ul>
        <br />
        <br />
        <br />
        <h1>
            <span style="text-align: center; color: Olive; font-size: x-large; font-family: Comic Sans MS;
                text-decoration: underline; font-weight: bold; padding-left: 430px;">Our Policy</span>
        </h1>
        <br />
        <ul class="buyers">
            <li>We are solely offers the service of connecting a buyer and a seller of a book.
            </li>
            <li>We are not responsible for the actual exchange of the book. </li>
            <li>We are not responsible for condition of the book</li>
            <li>We are not responsible for determining if an edition of a book is still in use.
                It is the buyer's responsibility to determine if the book is the correct edition/volume/version
                that they need based on the title, edition number, author, or other means they find
                possible.</li>
            <li>By registering an account with this site, you are confirming your contact information
                provided is correct and agreeing to the above terms of service. </li>
        </ul>
    </fieldset>
</asp:Content>
