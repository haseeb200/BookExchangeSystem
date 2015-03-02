using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using BooksModel;

public partial class WebPanel_MasterPage_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }

    protected void RegisterUser_CreatedUser(object sender, EventArgs e)
    {
        CreateUser();
    }

    private void CreateUser()
    {
        using (var ctx = new BooksEntities())
        {
            var rc = new RegisterClass();
            rc.UserRegister(GetTextBoxValues());
        }
    }

    public RegisterClass GetTextBoxValues()
    {
        var register = new RegisterClass
                           {
                               FirstName = (TextBox)RegisterUserWizardStep.ContentTemplateContainer.FindControl("FirstName"),
                               LastName = (TextBox)RegisterUserWizardStep.ContentTemplateContainer.FindControl("LastName"),
                               Gender = (RadioButtonList)RegisterUserWizardStep.ContentTemplateContainer.FindControl("Gender"),
                               UserName = (TextBox)RegisterUserWizardStep.ContentTemplateContainer.FindControl("UserName"),
                               EmailAddress = (TextBox)RegisterUserWizardStep.ContentTemplateContainer.FindControl("Email"),
                               Password = (TextBox)RegisterUserWizardStep.ContentTemplateContainer.FindControl("Password"),
                               CellPhone = (TextBox)RegisterUserWizardStep.ContentTemplateContainer.FindControl("CellPhone")
                           };
        return register;
    }
}