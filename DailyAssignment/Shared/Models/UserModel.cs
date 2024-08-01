using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shared.Models
{
    [Table("Customer_p")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [Required]
        public string firstName {  get; set; }

        [Required]
        public string lastName { get; set; }

        [Required]
        public string address { get; set; }

        [Required]
        [Range(1,110)]
        public int age { get; set; }


        [Required]
        public string gender { get; set; }

        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        [Phone]
        public string phone { get; set; }

        [Required]
        public string password { get; set; }

        [Required]
        public string country {  get; set; }

        [Required]
        public string state { get; set; }

    }
}
