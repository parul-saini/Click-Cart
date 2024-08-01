using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTO
{
    public class ProductDTO
    {
        [Key]
        public int PId { get; set; }

        [Required]
        public string productName { get; set; }

        [Required]
        public string imageUrl { get; set; }

        [Required]
        public string productDescription { get; set; }

        [Required]
        public string productCategory { get; set; }

        [Required]
        public decimal amount { get; set; }

        [Required]
        public int quantity { get; set; }

        public decimal rating { get; set; }
    }
}
