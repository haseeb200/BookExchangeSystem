using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Web.Script.Serialization;
using BooksModel;
using System.Web.Security;

/// <summary>
/// Summary description for AccountDetailClass
/// </summary>
public class AccountDetailClass
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string EmailAddress { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public string CellPhone { get; set; }
	public AccountDetailClass()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string AccountInfo(string UserName)
    {
        using (var ctx = new BooksEntities())
        {
            var query = ctx.UserProfiles.Where(u => u.UserName == UserName)
                                      .Select(s => new
                                      {
                                          FirstName = s.FirstName,
                                          LastName = s.LastName,
                                          EmailAddress=s.EmailAddress,
                                          Country = s.Country,
                                          City = s.City,
                                          CellPhone = s.CellPhone
                                      }).First();
            List<AccountDetailClass> AccountDetail = new List<AccountDetailClass>();
            AccountDetail.Add(new AccountDetailClass { FirstName = query.FirstName, LastName = query.LastName,EmailAddress = query.EmailAddress,Country = query.Country, City = query.City, CellPhone = query.CellPhone });
            var Serializer = new JavaScriptSerializer();
            return Serializer.Serialize(AccountDetail);
        }
    }


    public void UpdateAccountInfo(string UserName, AccountDetailClass UpdateAccount)
    {
        using (var ctx = new BooksEntities())
        {
            var query = ctx.UserProfiles.Where(u => u.UserName == UserName).First();
            var user = Membership.GetUser(UserName, true);
            user.Email = UpdateAccount.EmailAddress;
            query.FirstName = UpdateAccount.FirstName;
            query.LastName = UpdateAccount.LastName;
            query.EmailAddress = UpdateAccount.EmailAddress;
            query.CellPhone = UpdateAccount.CellPhone;
            Membership.UpdateUser(user);
            ctx.SaveChanges();
        }
    }
}