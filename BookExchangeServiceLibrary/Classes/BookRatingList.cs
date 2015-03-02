using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using BooksModel;
using System.Collections;

/// <summary>
/// Summary description for BookRatingList
/// </summary>
public class BookRatingList
{
    


    public string GetsBookRatingInfo(string user)
    {

        using (var ctx = new BooksEntities())
        {
            if (user == "")
            {
                var query = ctx.BookRatings.GroupBy(r => r.Book_Id)
                                       .Select(s => new
                                       {
                                           Book_ID = s.Key,
                                           Rating = (int)s.Average(ss => ss.Rating)
                                       }).ToList();
                
                return this.Serialization(query);
            }
            else
            {
                var query = ctx.UserProfiles.Include("BookRatings")
                                          .Where(c => c.BookRatings.Any(b => b.User_Id == c.User_Id && c.UserName == user))
                                          .Select(s => new
                                          {
                                              User_ID = s.User_Id,
                                              UserBook_ID = s.BookRatings.Where(b => b.User_Id == s.User_Id).Select(b => b.Book_Id)
                                          }).ToList();
                return this.Serialization(query);
            }
        }
    }

    private string Serialization(object query)
    {
        var serializer = new JavaScriptSerializer();
        string BookRatingInfo = serializer.Serialize(query);
        return BookRatingInfo;
    }
}