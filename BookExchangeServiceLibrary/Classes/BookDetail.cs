using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace BookExchangeServiceLibrary.Classes
{
    [DataContract]
    public class BookDetail
    {
        [DataMember]
        public int Book_Id { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string ISBN { get; set; }
        [DataMember]
        public string Author { get; set; }
        [DataMember]
        public int Price { get; set; }
    }
}
