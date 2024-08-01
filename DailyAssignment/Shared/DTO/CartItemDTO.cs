using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class CartItemDTO
    {
       
            public int CartId { get; set; }
            public int ProductId { get; set; }
            public int Quantity { get; set; }
            public string ProductName { get; set; }
            public string ProductDescription { get; set; }
            public string ProductCategory { get; set; }
            public string ImageUrl { get; set; }
            public decimal Amount { get; set; }
        

    }
}
