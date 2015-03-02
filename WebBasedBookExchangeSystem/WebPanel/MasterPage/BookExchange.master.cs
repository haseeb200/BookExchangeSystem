using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

public partial class WebPanel_MasterPage_BookExchange : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Page.User.Identity.IsAuthenticated)
        {
                GetValues();
        }

    }

    private void GetValues()
    {
        var user = Membership.GetUser(Page.User.Identity.Name, true);
        if (user == null)
        {
            HttpContext.Current.Session.Abandon();
            FormsAuthentication.SignOut();
            FormsAuthentication.RedirectToLoginPage("~/WebPanel/Account/Login.aspx");
            Response.Cookies[FormsAuthentication.FormsCookieName].Expires=DateTime.Now.AddYears(-1);
           
        }

        else if (user.IsApproved && user != null)
        {
            var lastLoginDateLabel = (Label)HeadLoginView.FindControl("LastLoginDateLabel");
            lastLoginDateLabel.Text = user.LastLoginDate.ToString();
            userLabel.Value = user.UserName;
        }

    }
}
