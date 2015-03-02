using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

public partial class AdminPanel_MasterPage_WebAdmin : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Page.User.Identity.IsAuthenticated)
            GetLastLoginDate();

    }

    private void GetLastLoginDate()
    {
        string loginName = Page.User.Identity.Name;
        MembershipUser user = Membership.GetUser(loginName, true);
        LastLoginDateLabel.Text = user.LastActivityDate.ToString();
    }
}
