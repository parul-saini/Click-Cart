using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Models
{
    [Table("Cart_p")]
    public class Cart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int cartId { get; set; }

        [Required]
        public int userId { get; set; }

        // Navigation property
        public User user { get; set; }

        [Required]
        public int productId { get; set; }

        // Navigation property
        public Product product { get; set; }

        [Required]
        public int orderQuantity { get; set; }
    }
}
