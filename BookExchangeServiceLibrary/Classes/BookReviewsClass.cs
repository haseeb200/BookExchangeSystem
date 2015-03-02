using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Timers;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using BooksModel;
using System.Data.Objects.SqlClient;

/// <summary>
/// Summary description for BookReviewsClass
/// </summary>
public class BookReviewsClass
{
    List<BookReviewsClass> GetReviews = new List<BookReviewsClass>();
    public string Book_ID { get; set; }
    public string Name { get; set; }
    public string DateTimes { get; set; }
    public string Reviews { get; set; }
	public BookReviewsClass()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string PosUserReviews(int User_ID, BookReviewsClass PostBookReviews, string UserName)
    {
        using (var ctx = new BooksEntities())
        {
            var Reviews = new BookReview()
            {
                User_Id = User_ID,
                Book_Id = int.Parse(PostBookReviews.Book_ID),
                Reviews = PostBookReviews.Reviews,
                Date = DateTime.Now,
                Status = true
            };

            ctx.BookReviews.AddObject(Reviews);
            ctx.SaveChanges();
            return (this.GetCurrentQuery(PostBookReviews, UserName));
        }
    }


    public string GetAllReviews(int Book_ID)
    {
        using (var ctx = new BooksEntities())
        {
            var query = ctx.UserProfiles.Join(ctx.BookReviews, u => u.User_Id, b => b.User_Id, (u, b) => new { UserProfileInfo = u, BookReviewsInfo = b })
                                                    .Where(c => c.UserProfileInfo.User_Id == c.BookReviewsInfo.User_Id && c.BookReviewsInfo.Book_Id == Book_ID)
                                                    .Select(s => new
                                                    {
                                                        FirstName = s.UserProfileInfo.FirstName,
                                                        BookReview = s.BookReviewsInfo.Reviews,
                                                        BookReviewDate = s.BookReviewsInfo.Date

                                                    });

            foreach (var item in query)
            {
                GetReviews.Add(new BookReviewsClass { Name = item.FirstName, Reviews = item.BookReview, DateTimes = item.BookReviewDate.ToString() });
            }
            var serializer = new JavaScriptSerializer();
            string BookReviewsContiner = serializer.Serialize(GetReviews);
            return BookReviewsContiner;
        }
    }

    public string GetCurrentQuery(BookReviewsClass PostBookReviews, string UserName)
    {
        using (var ctx = new BooksEntities())
        {
            int Book_ID=int.Parse(PostBookReviews.Book_ID);
            var CurrentReviewQuery = ctx.UserProfiles.Join(ctx.BookReviews, u => u.User_Id, b => b.User_Id, (u, b) => new { UserProfileInfo = u, BookReviewsInfo = b })
                                                    .Where(c => c.UserProfileInfo.User_Id == c.BookReviewsInfo.User_Id && c.BookReviewsInfo.Book_Id == Book_ID && c.UserProfileInfo.UserName == UserName)
                                                    .OrderByDescending(d => d.BookReviewsInfo.Date)
                                                    .Select(s => new
                                                    {
                                                        FirstName = s.UserProfileInfo.FirstName,
                                                        BookReview = s.BookReviewsInfo.Reviews,
                                                        BookReviewDate = s.BookReviewsInfo.Date

                                                    }).First();
            
            GetReviews.Add(new BookReviewsClass { Name = CurrentReviewQuery.FirstName, Reviews = CurrentReviewQuery.BookReview, DateTimes = CurrentReviewQuery.BookReviewDate.ToString() });
            var serializer = new JavaScriptSerializer();
            string BookReviewsContiner = serializer.Serialize(GetReviews);
            return BookReviewsContiner;
        }
    }
}