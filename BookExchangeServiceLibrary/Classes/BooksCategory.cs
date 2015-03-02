using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace BookExchangeServiceLibrary.Classes
{
    [DataContract]
    public class BooksCategory
    {
        [DataMember]
        public int Category_Id { get; set; }

        [DataMember]
        public string CategoryName { get; set; }
    }
}
