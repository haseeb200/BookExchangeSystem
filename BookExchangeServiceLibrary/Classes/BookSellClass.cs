using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using BooksModel;

/// <summary>
/// Summary description for BookSellClass
/// </summary>
public class BookSellClass : System.Web.UI.Page
{
   
    int User_Id = default(int);
    public string ImageName { get; set; }
    public string BookTitle { get; set; }
    public string ISBN { get; set; }
    public string Edition { get; set; }
    public string Author { get; set; }
    public string Description { get; set; }
    public int Category_Id { get; set; }
    public string Condition { get; set; }
    public string Price { get; set; }
    public string Publisher { get; set; }

    public BookSellClass()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public void PostBook(BookSellClass bsc,string user)
    {
        this.UserIdentity(user);
        using (var ctx = new BooksEntities())
        {
            var sellBook = new Book()
            {
                User_Id = this.User_Id,
                Category_Id = bsc.Category_Id,
                Title = bsc.BookTitle,
                ISBN = bsc.ISBN,
                Edition = bsc.Edition,
                Author = bsc.Author,
                Description = bsc.Description,
                Condition = bsc.Condition,
                Publisher = bsc.Publisher,
                Price = int.Parse(bsc.Price),
                BookImageName = bsc.ImageName,
                Status = false,
                DateTime=DateTime.Now
            };

            ctx.Books.AddObject(sellBook);
            ctx.SaveChanges();
        }
    }

    public void UserIdentity(string user)
    {
        //user = Session["username"].ToString();
        using (var ctx = new BooksEntities())
        {
            var query = ctx.UserProfiles.Where(u => u.UserName == user)
                            .Select(s => new
                            {
                                UserID = s.User_Id
                            }).First();

            User_Id = query.UserID;
        }
    }


    public void BindDropDown(DropDownList DropDown)
    {
        using (var ctx = new BooksEntities())
        {
            var query = ctx.BookCategories.Take(12);
            DropDown.DataTextField = "CategoryName";
            DropDown.DataValueField = "Category_Id";
            DropDown.DataSource = query;
            DropDown.DataBind();
        }
    }
}