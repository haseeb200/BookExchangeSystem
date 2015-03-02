using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using BooksModel;

/// <summary>
/// Summary description for BookRatingClass
/// </summary>
public class BookRatingClass
{
    public BookRatingClass()
    {
    }
    public BookRatingClass(int User_ID, int Book_ID, int Rate)
    {
        using (var ctx = new BooksEntities())
        {
            var BookRate = new BookRating()
            {
                User_Id = User_ID,
                Book_Id = Book_ID,
                Rating = Rate
            };

            ctx.BookRatings.AddObject(BookRate);
            ctx.SaveChanges();
        }
    }
}