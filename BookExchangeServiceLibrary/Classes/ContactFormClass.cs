using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Data;
using BooksModel;

/// <summary>
/// Summary description for ContactFormClass
/// </summary>
public class ContactFormClass
{
    
    public string Name { get; set; }
    public string Email { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
	public ContactFormClass()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string UserInfo(string UserName)
    {
        using (var ctx = new BooksEntities())
        {
            var query = ctx.UserProfiles.Where(u => u.UserName == UserName)
                                       .Select(s => new
                                       {
                                           FirstName = s.FirstName,
                                           LastName = s.LastName,
                                           EmailAddress = s.EmailAddress
                                       }).First();

            List<ContactFormClass> ContactInfo = new List<ContactFormClass>(){
            (new ContactFormClass
                { Name = string.Format("{0} {1}",query.FirstName, query.LastName) ,Email = query.EmailAddress })};
            var serializer = new JavaScriptSerializer();
            return serializer.Serialize(ContactInfo);
        }
    }

    public void PostMessage(ContactFormClass Contacts)
    {
        using (var ctx = new BooksEntities())
        {
            ContactUsForm Contact = new ContactUsForm()
            {
                Name = Contacts.Name,
                EmailAddress = Contacts.Email,
                Subject = Contacts.Subject,
                Message = Contacts.Message
            };

            ctx.ContactUsForms.AddObject(Contact);
            ctx.SaveChanges();
        }
    }
}