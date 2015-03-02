using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel.Activation;
using System.ServiceModel;
using System.Web;
using BooksModel;
using System.Web.Script.Serialization;
using BookExchangeServiceLibrary.Classes;
using System.Net.Mail;
using System.Net;
using System.Threading;
using Newtonsoft.Json;
using System.Web.Security;
using System.Text.RegularExpressions;



namespace BookExchangeServiceLibrary
{


    public class BooksService : IBooksService
    {
      


        public string GetUserBooks(string user)
        {
            using (var ctx = new BooksEntities())
            {
                var User_ID = ctx.UserProfiles.Where(u => u.UserName == user)
                                          .Select(s => new
                                          {
                                              User_Id = s.User_Id
                                          }).First();


                var query = ctx.Books.Where(b => b.User_Id == User_ID.User_Id)
                                   .Select(s => new
                                   {
                                       Book_Id = s.Book_Id,
                                       Title = s.Title,
                                       ISBN = s.ISBN,
                                       Author = s.Author,
                                       Price = s.Price
                                   }).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(query);
            }
        }


        public void DeleteUserBook(BookDetail deleteBook)
        {
            using (var ctx = new BooksEntities())
            {
                var book = ctx.Books.Where(b => b.Book_Id == deleteBook.Book_Id).First();
                ctx.Books.DeleteObject(book);
                ctx.SaveChanges();
            }
        }


        public void UpdateUserBook(BookDetail updateBook)
        {
            using (var ctx = new BooksEntities())
            {
                var book = ctx.Books.Where(b => b.Book_Id == updateBook.Book_Id).First();
                book.Title = updateBook.Title;
                book.ISBN = updateBook.ISBN;
                book.Author = updateBook.Author;
                book.Price = updateBook.Price;
                ctx.SaveChanges();
            }
        }


        public string GetUserWishList(string user)
        {
            using (var ctx = new BooksEntities())
            {

                var User_ID = ctx.UserProfiles.Where(u => u.UserName == user)
                                             .Select(s => new
                                             {
                                                 User_Id = s.User_Id
                                             }).First();

                var query = ctx.Books.Include("WishLists")
                                  .Where(c => c.WishLists.Any(w => w.Book_Id == c.Book_Id && w.User_Id == User_ID.User_Id))
                                  .Select(s => new
                                  {
                                      Book_Id = s.Book_Id,
                                      Title = s.Title,
                                      ISBN = s.ISBN,
                                      Author = s.Author,
                                      Price = s.Price
                                  }).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(query);
            }
        }

        public void DeleteUserWishList(BookDetail deleteBook)
        {
            using (var ctx = new BooksEntities())
            {
                var query = ctx.WishLists.Where(w => w.Book_Id == deleteBook.Book_Id).First();
                ctx.WishLists.DeleteObject(query);
                ctx.SaveChanges();
            }
        }


        public string AllBooks()
        {
            using (var ctx = new BooksEntities())
            {
                var query = ctx.Books.Where(c => c.Status == true).Select(s => new
                {
                    Book_Id = s.Book_Id,
                    //Title = s.Title,
                    //ISBN = s.ISBN,
                    //Author = s.Author,
                    //Publisher = s.Publisher,
                    //Price = s.Price,
                    BookImageName = s.BookImageName,

                }).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(query);
            }
        }


        public string BookCategory(string category)
        {
            int CategoryID = int.Parse(category);

            using (var ctx = new BooksEntities())
            {
                var query = ctx.Books.Where(b => b.Category_Id == CategoryID && b.Status == true)
                                   .Select(s => new
                                   {
                                       Book_Id = s.Book_Id,
                                       Title = s.Title,
                                       ISBN = s.ISBN,
                                       Author = s.Author,
                                       Publisher = s.Publisher,
                                       Price = s.Price,
                                       BookImageName = s.BookImageName
                                   }).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(query);
            }
        }


        public string GetBookDetail(string BookID)
        {

            int id = int.Parse(BookID);
            using (var ctx = new BooksEntities())
            {
                var query = ctx.UserProfiles.Join(ctx.Books, u => u.User_Id, b => b.User_Id, (u, b) => new { UserProfileInfo = u, BookDetailInfo = b })
                                          .Where(c => c.UserProfileInfo.User_Id == c.BookDetailInfo.User_Id && c.BookDetailInfo.Book_Id == id)
                                          .Select(s => new
                                          {
                                              User_Id=s.UserProfileInfo.User_Id,
                                              UserName = s.UserProfileInfo.UserName,
                                              User = s.UserProfileInfo.FirstName + " " + s.UserProfileInfo.LastName,
                                              DateTime = s.BookDetailInfo.DateTime,
                                              CellPhone = s.UserProfileInfo.CellPhone,
                                              EmailAddress = s.UserProfileInfo.EmailAddress,
                                              Book_Id = s.BookDetailInfo.Book_Id,
                                              ISBN = s.BookDetailInfo.ISBN,
                                              Title = s.BookDetailInfo.Title,
                                              Author = s.BookDetailInfo.Author,
                                              Edition = s.BookDetailInfo.Edition,
                                              Condition = s.BookDetailInfo.Condition,
                                              Publisher = s.BookDetailInfo.Publisher,
                                              Price = s.BookDetailInfo.Price,
                                              BookImageName = s.BookDetailInfo.BookImageName,
                                              Description = s.BookDetailInfo.Description
                                          });

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(query);
            }
        }


        public string UserWishListContainer(string user, string ID)
        {
            int BookID = int.Parse(ID);
            using (var ctx = new BooksEntities())
            {
                var query = ctx.WishLists.Join(ctx.UserProfiles, w => w.User_Id, u => u.User_Id, (w, u) => new { WishListInfo = w, UserProfileInfo = u })
                                       .Where(c => c.UserProfileInfo.User_Id == c.WishListInfo.User_Id && c.UserProfileInfo.UserName == user && c.WishListInfo.Book_Id == BookID)
                                       .Select(s => new
                                       {
                                           Book_Id = s.WishListInfo.Book_Id
                                       }).FirstOrDefault();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(query);
            }
        }


        public void MyWishList(string user, string ID)
        {
            int Book_ID = int.Parse(ID);
            using (var ctx = new BooksEntities())
            {

                var query = ctx.UserProfiles.Where(u => u.UserName == user)
                                                .Select(s => new
                                                {
                                                    UserID = s.User_Id
                                                }).First();
                var Wish = new WishList()
                {
                    User_Id = query.UserID,
                    Book_Id = Book_ID
                };
                ctx.WishLists.AddObject(Wish);
                ctx.SaveChanges();
            }
        }


        public void SendMail(string sender, string message, string user)
        {
            using (var ctx = new BooksEntities())
            {
                var query = ctx.UserProfiles.Where(u => u.UserName == user).Select(s => new { EmailAddress = s.EmailAddress, FirstName = s.FirstName, LastName = s.LastName }).First();
                var mail = new MailMessage();
                mail.From = new MailAddress("onlinebookexchange@gmail.com", "Online Book Exchange");
                mail.To.Add(sender);
                mail.Subject = string.Format("{0} {1} sent you a message", query.FirstName, query.LastName);
                mail.Body = string.Format("{0}<p><br /></p><p><strong><span style='color: rgb(63, 72, 204);'>If you are interested to deal with him.please contact the buyer to this address   </span><span style='color: rgb(237, 28, 36);'>{1}</span></strong></p><p></p><p></p><p><span style='color: rgb(63, 72, 204);'><strong>Best regards,</strong></span></p><p><span style='color: rgb(63, 72, 204);'><strong>Online Book Exchange Team.</strong></span></p>", message, query.EmailAddress);
                mail.IsBodyHtml = true;
                var smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Credentials = new NetworkCredential("onlinebookexchange@gmail.com", "bookexchange");
                smtp.EnableSsl = true;
                smtp.Send(mail);
            }
        }


        public string GetAllComments()
        {
            using (var ctx = new BooksEntities())
            {
                var query = ctx.BookReviews.OrderByDescending(o => o.Review_Id)
                    .Select(s => new
                                     {
                                         Comment = s.Reviews,
                                         BookID = s.Book_Id,
                                         BookTitle = ctx.Books.Where(c => c.Book_Id == s.Book_Id)
                                                              .Select(s1 => new
                                                                                {
                                                                                    Title = s1.Title
                                                                                }),

                                         Reviewers = ctx.UserProfiles.Where(c => c.User_Id == s.User_Id)
                                                                     .Select(s2 => new
                                                                                       {
                                                                                           Reviewer = s2.FirstName
                                                                                       })


                                     });

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(query);

            }
        }


        public void DeleteComment(string bookId)
        {
            int BookID = int.Parse(bookId);
            using (var ctx = new BooksEntities())
            {
                var query = ctx.BookReviews.Where(c => c.Book_Id == BookID)
                    .Select(s => s).First();

                ctx.DeleteObject(query);
                ctx.SaveChanges();
            }
        }


        public string GetSummary()
        {
            using (var ctx = new BooksEntities())
            {
                var query = ctx.UserProfiles.Where(c => c.Status == true)
                    .GroupBy(g => g.Status)
                    .Select(s => new
                                     {
                                         ApprovedUsers = s.Count(),
                                         UnApprovedUsers = ctx.UserProfiles.Where(c => c.Status == false && c.UserName!="admin")
                                                                         .GroupBy(g => g.Status)
                                                                         .Select(s1 => new
                                                                                           {
                                                                                               UnApproved = s1.Count()
                                                                                           }).DefaultIfEmpty(),
                                         BooksApproved = ctx.Books.Where(c => c.Status == true)
                                                                .GroupBy(g => g.Status)
                                                                .Select(s2 => new
                                                                                  {
                                                                                      ApprovedBook = s2.Count()
                                                                                  }),
                                         BooksUnApproved = ctx.Books.Where(c => c.Status == false)
                                                                    .GroupBy(g => g.Status)
                                                                    .Select(s3 => new
                                                                                      {
                                                                                          UnApprovedBook = s3.Count()
                                                                                      }).DefaultIfEmpty(),
                                         TotalComments = ctx.BookReviews.GroupBy(g => g.Status)
                                                                      .Select(s4 => new
                                                                                        {
                                                                                            Comments = s4.Count()
                                                                                        }).DefaultIfEmpty()

                                     }).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(query);
            }
        }


        public string ViewAllPost()
        {
            using (var ctx = new BooksEntities())
            {
                var query = ctx.Books.OrderByDescending(o => o.Book_Id).Where(c => c.Status == true).Select(s => new
                                                                                        {
                                                                                            Book_Id = s.Book_Id,
                                                                                            BookImageName = s.BookImageName,
                                                                                            Title = s.Title,
                                                                                            Poster = s.UserProfile.FirstName

                                                                                        }).ToList();
                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(query);
            }
        }





        public void DeletePost(int bookId)
        {
            using (var ctx = new BooksEntities())
            {
                var query = ctx.Books.Single(w => w.Book_Id == bookId);
                ctx.Books.DeleteObject(query);
                ctx.SaveChanges();
            }

        }


        public string PendingPost()
        {
            using (var ctx = new BooksEntities())
            {
                var query = ctx.Books.OrderByDescending(o => o.Book_Id).Where(c => c.Status == false).Select(s => new
                                                                                                                      {
                                                                                                                          Book_Id = s.Book_Id,
                                                                                                                          BookImageName = s.BookImageName,
                                                                                                                          Title = s.Title,
                                                                                                                          Poster = s.UserProfile.FirstName
                                                                                                                      }).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(query);
            }
        }


        public void PublishPost(int bookId)
        {
            using (var ctx = new BooksEntities())
            {
                var post = ctx.Books.Where(c => c.Book_Id == bookId).First();
                var mailReciever = ctx.UserProfiles.Where(c => c.User_Id == post.User_Id).First();
                post.Status = true;
                ctx.SaveChanges();
                string message =
                    string.Format("<p id='yui_3_2_0_1_1345197138258296'><strong id='yui_3_2_0_1_1345197138258295'><span style='color: rgb(63, 72, 204);'>Dear</span> <span style='color: rgb(237, 28, 36);'>{0} {1}</span>,</strong></p><p><strong></strong></p><p></p><p><strong><span style='color: rgb(63, 72, 204);'>Your Book</span> '<span style='color: rgb(237, 28, 36); font-size: small;'>{2}</span>' <span style='color: rgb(63, 72, 204);'>has been approved and publish on </span><span style='color: rgb(63, 72, 204); font-size: small;'>Online Book Exchange</span><span style='color: rgb(63, 72, 204);'>.</span></strong></p><p><strong></strong></p><p></p><p><strong><span style='color: rgb(63, 72, 204);'>you can check your post here</span></strong><a href='http://localhost:12036/WebBasedBookExchangeSystem/WebPanel/ContentPages/BooksLibrary.aspx?bid={3}' rel='nofollow' target='_blank'>&nbsp; {4}</a></p><p></p><p></p><p><br /></p><p id='yui_3_2_0_1_1345197138258299'><strong><span style='color: rgb(63, 72, 204);'>Best Regards,</span></strong></p><p id='yui_3_2_0_1_1345197138258301'><strong><span style='color: rgb(63, 72, 204);'>Online Book Exchange Team</span></strong></p>", mailReciever.FirstName, mailReciever.LastName, post.Title, post.Book_Id, post.Title);

                string subject = string.Format("{0} {1} your Book has been Approved", mailReciever.FirstName, mailReciever.LastName);
                GenerateMail(mailReciever, subject, message);
            }
        }

        private void GenerateMail(UserProfile mailReciever, string subject, string message)
        {
            var mail = new MailMessage();
            mail.From = new MailAddress("onlinebookexchange@gmail.com", "Online Book Exchange");
            mail.To.Add(mailReciever.EmailAddress);
            mail.Subject = subject;
            mail.Body = message;
            mail.IsBodyHtml = true;
            var smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Credentials = new NetworkCredential("onlinebookexchange@gmail.com", "bookexchange");
            smtp.EnableSsl = true;
            smtp.Send(mail);
        }



        public string GetAllBookCategories()
        {
            using (var ctx = new BooksEntities())
            {
                var query = ctx.BookCategories.Select(s => new
                                                               {
                                                                   Category_Id = s.Category_Id,
                                                                   CategoryName = s.CategoryName
                                                               }).ToList();
                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(query);
            }

        }


        public void AddNewCategory(BooksCategory addCategory)
        {
            using (var ctx = new BooksEntities())
            {
                var category = new BookCategory()
                {
                    CategoryName = addCategory.CategoryName
                };

                ctx.BookCategories.AddObject(category);
                ctx.SaveChanges();
            }
        }

        public void UpdateExistingCategory(BooksCategory updateCategory)
        {
            using (var ctx = new BooksEntities())
            {
                var category = ctx.BookCategories.Where(c => c.Category_Id == updateCategory.Category_Id).First();
                category.CategoryName = updateCategory.CategoryName;
                ctx.SaveChanges();
            }
        }

        public void DeleteCategory(BooksCategory deleteCategory)
        {
            using (var ctx = new BooksEntities())
            {
                var category = ctx.BookCategories.Where(c => c.Category_Id == deleteCategory.Category_Id).First();
                ctx.BookCategories.DeleteObject(category);
                ctx.SaveChanges();
            }
        }


        public string RegisteredUsers()
        {
            using (var ctx = new BooksEntities())
            {
                var users = ctx.UserProfiles.Where(c => c.Status == true).Select(s => new
                                                             {
                                                                 UserID = s.User_Id,
                                                                 FullName = s.FirstName + " " + s.LastName,
                                                                 EmailAddress = s.EmailAddress,
                                                                 Gender = s.Gender,
                                                                 RegisteredDate = s.RegistrationDate
                                                             }).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(users);
            }
        }


        public void DeleteUser(string userId)
        {
            int UserID = int.Parse(userId);
            using (var ctx = new BooksEntities())
            {
                var user = ctx.UserProfiles.Where(c => c.User_Id == UserID).FirstOrDefault();
                var userBook = ctx.Books.Where(c => c.User_Id == UserID).FirstOrDefault();
                if (userBook != null)
                {
                    ctx.Books.DeleteObject(userBook);
                    ctx.SaveChanges();
                }

                Membership.DeleteUser(user.UserName);
                ctx.UserProfiles.DeleteObject(user);
                ctx.SaveChanges();
            }
        }


        public string UnRegisteredUsers()
        {
            using (var ctx = new BooksEntities())
            {
                var users = ctx.UserProfiles.Where(c => c.Status == false && c.UserName!="admin").Select(s => new
                                                                                          {
                                                                                              UserID = s.User_Id,
                                                                                              FullName = s.FirstName + " " + s.LastName,
                                                                                              EmailAddress = s.EmailAddress,
                                                                                              Gender = s.Gender,
                                                                                              RegisteredDate = s.RegistrationDate
                                                                                          }).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(users);
            }
        }


        public void ApproveUser(int userId)
        {
            using (var ctx = new BooksEntities())
            {
                var user = ctx.UserProfiles.Where(c => c.User_Id == userId).FirstOrDefault();
                user.Guid = Membership.GetUser(user.UserName).ProviderUserKey.ToString();
                var inactiveUser = Membership.GetUser(user.UserName, false);
                inactiveUser.IsApproved = true;
                Membership.UpdateUser(inactiveUser);
                user.Status = true;
                ctx.SaveChanges();
            }
        }


        public string BindDropDown()
        {
            using (var ctx = new BooksEntities())
            {
                var categories = ctx.BookCategories.Select(s => new
                                                                    {
                                                                        Category_Id = s.Category_Id,
                                                                        CategoryName = s.CategoryName
                                                                    }).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(categories);
            }
        }


        public string RecoverPassword(string email, string value)
        {
            string result = string.Empty;
            using (var ctx = new BooksEntities())
            {
                var user = ctx.UserProfiles.Where(u => u.EmailAddress == email).FirstOrDefault();

                if (user != null)
                {
                    user.Password = value;
                    ctx.SaveChanges();
                    string message = string.Format("<p><strong><span style=\"color:#3f48cc;\">Dear</span></strong> <span style=\"color:#ed1c24;\"><strong>{0} {1}</strong></span>,</p><p><br /></p><p><br /></p><p><strong><span style=\"color:#3f48cc;\">your Password has been successfully changed.</span></strong></p><p><br /></p><p><br /></p><p><strong><span style=\"color:#3f48cc;\">New Password:</span> <span style=\"color:#ed1c24;\">{2}</span></strong></p><p><br /></p><p><br /></p><p><strong><span style=\"color:#ed1c24;\">We strongly recommmended you to please change your password by going to your profile once you log in, Thank you!.</span></strong></p><p></p><p><br /></p><p><br /></p><p><strong><span style=\"color:#3f48cc;\">Best Regards,</span></strong></p><p><strong><span style=\"color:#3f48cc;\">Online Book Exchange Team</span></strong></p>", user.FirstName, user.LastName, value);
                    string subject = "Password change notification!";
                    GenerateMail(user, subject, message);
                    result = "success";
                }

                return result;
            }


        }

        public string Slider()
        {
            using (var ctx = new BooksEntities())
            {
                var slider = ctx.Books.Where(c => c.Status == true)
                    .OrderByDescending(o => o.Book_Id)
                    .Select(s => new
                                     {
                                         Book_Id = s.Book_Id,
                                         Title = s.Title,
                                         BookImageName = s.BookImageName
                                     }).Take(8).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(slider);
            }
        }


        public string RecentPost()
        {
            using (var ctx = new BooksEntities())
            {
                var recentPost = ctx.Books.Where(c => c.Status == true)
                    .OrderByDescending(o => o.Book_Id)
                    .Select(s => new
                                     {
                                         Book_Id = s.Book_Id,
                                         Category_Id = s.BookCategory.Category_Id,
                                         Title = s.Title,
                                         Description = s.Description.Substring(0, 300),
                                         BookImageName = s.BookImageName,
                                         CategoryName = s.BookCategory.CategoryName
                                     }).Take(10).ToList();


                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(recentPost);
            }

        }


        public string RecentReviews()
        {
            using (var ctx = new BooksEntities())
            {
                var recentReviews = ctx.BookReviews.Where(c => c.Status == true)
                    .OrderByDescending(o => o.Review_Id)
                    .Select(s => new
                                     {
                                         Book_Id = s.Book.Book_Id,
                                         User_Id=s.UserProfile.User_Id,
                                         UserName = s.UserProfile.FirstName + " " + s.UserProfile.LastName,
                                         Category_Id = s.Book.BookCategory.Category_Id,
                                         CategoryName = s.Book.BookCategory.CategoryName,
                                         Title = s.Book.Title,
                                         BookImageName = s.Book.BookImageName,
                                         Comment = s.Reviews,
                                         DateTime = s.Date

                                     }).Take(5).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(recentReviews);
            }
        }


        public string TopPosts()
        {
            using (var ctx = new BooksEntities())
            {
                var topPosts = ctx.BookRatings.GroupBy(g => g.Book_Id)
                    .OrderByDescending(o => o.Max(m => m.Rating))
                    .Select(s => new
                                     {
                                         Book_Id = s.Key,
                                         Rating = s.Max(m => m.Rating),
                                         Users = s.Count(),
                                         BookDetail = ctx.Books.Where(c => c.Book_Id == s.Key)
                                                        .Select(s1 => new
                                                                          {
                                                                              Category_Id = s1.BookCategory.Category_Id,
                                                                              CategoryName = s1.BookCategory.CategoryName,
                                                                              Title = s1.Title,
                                                                              BookImageName = s1.BookImageName

                                                                          })


                                     }).Take(4).ToList();

                var serializer = new JavaScriptSerializer();
                return serializer.Serialize(topPosts);
            }
        }


        public string GetBooksRating()
        {
            var BookRating = new BookRatingList();
            return BookRating.GetsBookRatingInfo("");
        }


        public string GetBookRatingDetail(int Book_ID)
        {
            var BookRatingDetail = new BookRatingDetailClass();
            return (BookRatingDetail.GetBookRating(Book_ID));
        }


        public string GetBookCategories()
        {
            using (var ctx = new BooksEntities())
            {
                var categories = ctx.BookCategories.Select(s => new
                                                                    {
                                                                        Category_Id = s.Category_Id,
                                                                        CategoryName = s.CategoryName
                                                                    }).ToList();



                //var serializer = new JavaScriptSerializer();
                //return serializer.Serialize(categories);
                return JsonConvert.SerializeObject(categories);

            }
        }


        public string GetBookReviews(int Book_ID)
        {
            var BookReviews = new BookReviewsClass();
            return (BookReviews.GetAllReviews(Book_ID));

        }


        public string GetAccountDetail(string user)
        {
            var account = new AccountDetailClass();
            return account.AccountInfo(user);
        }

        public void UpdateAccountDetail(string user, AccountDetailClass updateAccount)
        {
            var account = new AccountDetailClass();
            account.UpdateAccountInfo(user, updateAccount);
        }

        public int UserRateBook(int score, int ratedBookId, string user)
        {
            using (var ctx = new BooksEntities())
            {

                var query = ctx.UserProfiles.Where(u => u.UserName == user)
                                .Select(s => new
                                {
                                    UserID = s.User_Id
                                }).First();
                int User_ID = query.UserID;
                var BookRating = new BookRatingClass(User_ID, ratedBookId, score);
            }
            return ratedBookId;
        }

        public string GetCurrentUserRatedBooks(string user)
        {
            if (user != "")
            {
                var BookRating = new BookRatingList();
                return BookRating.GetsBookRatingInfo(user);
            }
            else
            {
                return "null";
            }
        }

        public string PostBookReviews(BookReviewsClass postBookReviews, string user)
        {
            string result;
            var BookReviews = new BookReviewsClass();
            var GetReviews = new List<BookReviewsClass>();
            using (var ctx = new BooksEntities())
            {
                if (user != "")
                {

                    var query = ctx.UserProfiles.Where(u => u.UserName == user)
                                              .Select(s => new
                                              {
                                                  UserID = s.User_Id
                                              }).First();
                    result = BookReviews.PosUserReviews(query.UserID, postBookReviews, user);
                }
                else
                {
                    result = "not success";
                }
            }
            return result;
        }


        public string BookPost(BookSellClass bsc, string user)
        {
            var bsc1 = new BookSellClass();
            bsc1.PostBook(bsc, user);
            return "success";
        }


        public string GetUserInfo(string user)
        {
          
            var ContactForm = new ContactFormClass();
            return ContactForm.UserInfo(user);
            
        }

        public string ContactUs(ContactFormClass Contacts)
        {
            var ContactForm = new ContactFormClass();
            ContactForm.PostMessage(Contacts);
            return "success";
        }


        public string UserPost(string UserID)
        {
            int userId = int.Parse(UserID);
            using (var ctx = new BooksEntities())
            {
                var user = ctx.Books.Where(c => c.User_Id == userId && c.Status==true)
                    .Select(s => new
                                     {
                                         Book_Id = s.Book_Id,
                                         BookImageName = s.BookImageName,
                                     }).ToList();


                //var serializer = new JavaScriptSerializer();
                //return serializer.Serialize(categories);
                return JsonConvert.SerializeObject(user);

            }
        }


        public string SearchBooks()
        {
            using (var ctx= new BooksEntities())
            {
                var books = ctx.Books.Where(c => c.Status == true)
                    .Select(s => new
                                     {
                                         Book_Id=s.Book_Id,
                                         Title=s.Title,
                                         Price=s.Price,
                                         BookImageName=s.BookImageName
                                     }).ToList();

                return JsonConvert.SerializeObject(books);
            }
        }
    }
}


