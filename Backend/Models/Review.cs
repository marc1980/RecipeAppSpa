using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Review
    {
        public int Id { get; set; }
        public virtual Recipe Recipe { get; set; }
        [Required]
        [StringLength(100)]
        public string Reviewer { get; set; }
        [Required]
        [StringLength(2000)]
        public string Body { get; set; }
    }
}