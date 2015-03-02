<%@ Page Title="" Language="C#" MasterPageFile="~/WebPanel/MasterPage/BookExchange.master"
    AutoEventWireup="true" CodeFile="SiteGuide.aspx.cs" Inherits="WebPanel_MasterPage_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .style1
        {
            color: #993333;
        }
        .style2
        {
            color: #000000;
        }
        .style3
        {
            text-decoration: underline;
        }
        .buyers li
        {
            list-style-type: disc;
            margin-left: 50px;
        }
        
        .sellers li
        {
            list-style-type: disc;
            margin-left: 50px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <fieldset>
        <br />
        <p class="style3">
            <strong style="font-family: Comic Sans MS; font-size: large; text-transform: uppercase;text-decoration: underline;
                color: olive; position: relative; padding-left: 430px; text-align: center;font-weight: bold">How it Works</strong></p>
        <br />
        <p style="padding-top: 20px;">
            <strong style="font-family: sans-serif; font-size: large; color: saddlebrown; font-weight: 700;padding-left: 50px;">
                Sellers or Lenders:</strong></p>
        <p style="color: #993333;padding-left: 60px;padding-top: 20px;">
            <strong style="font-weight: bold">STEPS:</strong></p>
        <ul class="sellers" style="padding-top: 20px;padding-left: 20px;">
            <li>Register a Free Account.</li>
            <li>You List a Book for Sale, Lend, or Exchange.</li>
            <li>Other Person sees your book & sends you a message through the website. If you provide
                a phone number, the buyer can call you.</li>
            <li>You receive the message at your email address & send a reply to the other person's
                email address.</li>
            <li>You meet the other person at a public place and make the transaction.</li>
        </ul>
        <p style="padding-top: 20px;">
            <span><strong style="color: #000000;font-weight: bold;padding-left: 60px;">Note: You do not pay us anything.</strong></span></p>
        <br />
        <br />
        <p>
            <strong style="font-family: sans-serif; font-size: large; color: saddlebrown; font-weight: 700;padding-left: 50px;">
                Buyers or Borrowers:</strong></p>
        <p style="color: #993333;padding-left: 60px;padding-top: 20px;">
            <strong style="font-weight: bold">STEPS:</strong></p>
        <ul class="buyers" style="padding-top: 20px;padding-left: 20px;">
            <li>Search for old books to buy, borrow, or exchange.</li>
            <li>When you find a book you like, send a message to the book owner through the website.
                Also, you can call the book owner if a phone number is provided.</li>
            <li>The message is sent to the owner's email address. Then, the owner sends a reply
                to your email address. </li>
            <li>You meet the book owner at a public place.</li>
            <li>You and the book owner make the transaction!</li>
        </ul>
        <p style="padding-top: 20px;">
            <span><strong style="color: #000000;font-weight: bold;padding-left: 60px;">Note: You do not pay us anything.</strong></span></p>
    </fieldset>
</asp:Content>
