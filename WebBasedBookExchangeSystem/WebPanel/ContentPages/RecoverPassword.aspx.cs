using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BooksModel;
using System.Net.Mail;
using System.Net;
using System.Web.Security;


public partial class WebPanel_MasterPage_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void RecoverPassword_SendingMail(object sender, MailMessageEventArgs e)
    {
        var user = Membership.GetUser(RecoverPassword.UserName);
        var mail = new MailMessage();
        mail.To.Add(user.Email);
    }
}