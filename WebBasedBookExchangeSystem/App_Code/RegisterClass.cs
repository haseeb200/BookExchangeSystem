using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BooksModel;
using System.Web.UI.WebControls;

/// <summary>
/// Summary description for RegisterClass
/// </summary>
public class RegisterClass
{
    public TextBox FirstName { get; set; }
    public TextBox LastName { get; set; }
    public TextBox UserName { get; set; }
    public TextBox Password { get; set; }
    public TextBox EmailAddress { get; set; }
    public TextBox CellPhone { get; set; }
    public RadioButtonList Gender { get; set; }
    
    
    public void UserRegister(RegisterClass register)
    {
        using (var ctx = new BooksEntities())
        {
            var user = new UserProfile()
            {
                FirstName = register.FirstName.Text,
                LastName = register.LastName.Text,
                UserName = register.UserName.Text,
                Password = register.Password.Text,
                EmailAddress = register.EmailAddress.Text,
                Country = "Pakistan",
                City = "Karachi",
                Gender = register.Gender.SelectedItem.Text,
                CellPhone = register.CellPhone.Text,
                RegistrationDate=DateTime.Now,
                Status=false
            };

            ctx.UserProfiles.AddObject(user);
            ctx.SaveChanges();
        }
    }
}