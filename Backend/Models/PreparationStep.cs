using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class PreparationStep
    {
        public int Id { get; set; }
        public virtual Recipe Recipe { get; set; }
        [Range(1, 99)]
        public int Rank { get; set; }
        [Required]
        [StringLength(250)]
        public string Description { get; set; }
    }
}