using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using BooksModel;
using Newtonsoft.Json;

/// <summary>
/// Summary description for BookRatingDetailClass
/// </summary>
public class BookRatingDetailClass
{
    public int Stars_5 { get; set; }
    public int Stars_4 { get; set; }
    public int Stars_3 { get; set; }
    public int Stars_2 { get; set; }
    public int Stars_1 { get; set; }
    public int RatingCount { get; set; }
    public int ReviewsCount { get; set; }
   
	public BookRatingDetailClass()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string GetBookRating(int Book_ID)
    {
        using (var ctx = new BooksEntities())
        {
            var RatingCountQuery = ctx.BookRatings.Where(b => b.Book_Id == Book_ID)
                                       .Select(s => new
                                       {
                                           TotalRating = s.Rating
                                       });

            var ReviewsCountQuery = ctx.BookReviews.Where(b => b.Book_Id == Book_ID)
                .Select(s => new
                                 {

                                     TotalReviews = s.Reviews
                                 });
            List<BookRatingDetailClass> BookDetailRatingList = new List<BookRatingDetailClass>();
            BookDetailRatingList.Add(new BookRatingDetailClass { Stars_5 = RatingCountQuery.Count(r => r.TotalRating == 5), Stars_4 = RatingCountQuery.Count(r => r.TotalRating == 4), Stars_3 = RatingCountQuery.Count(r => r.TotalRating == 3), Stars_2 = RatingCountQuery.Count(r => r.TotalRating == 2), Stars_1 = RatingCountQuery.Count(r => r.TotalRating == 1), RatingCount = RatingCountQuery.Count(), ReviewsCount = ReviewsCountQuery.Count()});
            //var serializer = new JavaScriptSerializer();
            //string RatingDetail = serializer.Serialize(BookDetailRatingList);
            //return RatingDetail;
            return JsonConvert.SerializeObject(BookDetailRatingList);

        }

    }
}