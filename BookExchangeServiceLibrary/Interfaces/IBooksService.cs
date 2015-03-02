using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using BookExchangeServiceLibrary.Classes;

namespace BookExchangeServiceLibrary
{
    [ServiceContract]
    public interface IBooksService
    {
        //[OperationContract]
        //string RegisterForm(RegisterClass register);

        [OperationContract]
        string GetUserBooks(string user);

        [OperationContract]
        void UpdateUserBook(BookDetail updateBook);

        [OperationContract]
        void DeleteUserBook(BookDetail deleteBook);

        [OperationContract]
        string GetUserWishList(string user);

        [OperationContract]
        void DeleteUserWishList(BookDetail deleteBook);

        [OperationContract]
        string AllBooks();

        [OperationContract]
        string BookCategory(string category);

        [OperationContract]
        string GetBookDetail(string BookID);

        [OperationContract]
        void MyWishList(string user, string ID);

        [OperationContract]
        string UserWishListContainer(string user, string ID);

        [OperationContract]
        void SendMail(string sender, string message, string user);

        [OperationContract]
        string GetAllComments();

        [OperationContract]
        void DeleteComment(string bookId);

        [OperationContract]
        string GetSummary();

        [OperationContract]
        string ViewAllPost();

        [OperationContract]
        void DeletePost(int bookId);

        [OperationContract]
        string PendingPost();

        [OperationContract]
        void PublishPost(int bookId);

        [OperationContract]
        string GetAllBookCategories();

        [OperationContract]
        void AddNewCategory(BooksCategory addCategory);

        [OperationContract]
        void UpdateExistingCategory(BooksCategory updateCategory);

        [OperationContract]
        void DeleteCategory(BooksCategory deleteCategory);

        [OperationContract]
        string RegisteredUsers();

        [OperationContract]
        void DeleteUser(string userId);

        [OperationContract]
        string UnRegisteredUsers();

        [OperationContract]
        void ApproveUser(int userId);

        [OperationContract]
        string BindDropDown();

        [OperationContract]
        string RecoverPassword(string email, string value);

        [OperationContract]
        string Slider();

        [OperationContract]
        string RecentPost();

        [OperationContract]
        string RecentReviews();

        [OperationContract]
        string TopPosts();

        [OperationContract]
        string GetBooksRating();

        [OperationContract]
        string GetBookRatingDetail(int Book_ID);

        [OperationContract]
        string GetBookCategories();

        [OperationContract]
        string GetBookReviews(int Book_ID);

        [OperationContract]
        string GetAccountDetail(string user);

        [OperationContract]
        void UpdateAccountDetail(string user,AccountDetailClass updateAccount);

        [OperationContract]
        int UserRateBook(int score, int ratedBookId,string user);

        [OperationContract]
        string GetCurrentUserRatedBooks(string user);

        [OperationContract]
        string PostBookReviews(BookReviewsClass postBookReviews,string user);

        [OperationContract]
        string BookPost(BookSellClass bsc,string user);

        [OperationContract]
        string GetUserInfo(string user);

        [OperationContract]
        string ContactUs(ContactFormClass Contacts);

        [OperationContract]
        string UserPost(string UserID);

        [OperationContract]
        string SearchBooks();
    }
}
