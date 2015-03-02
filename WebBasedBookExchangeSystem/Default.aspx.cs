﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Page.User.Identity.IsAuthenticated)
            Label1.Text = Membership.GetUser(Page.User.Identity.Name, true).ProviderUserKey.ToString();
    }
}
