using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        [Required]
        [StringLength(35)]
        public string Name { get; set; }
        [Required]
        [StringLength(45)]
        public string ShortDescription { get; set; }
        [Required]
        [StringLength(120)]
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int PreparationTime { get; set; }
        public int Portions { get; set; }
        public virtual IEnumerable<Ingredient> Ingredients { get; set; }
        public virtual IEnumerable<PreparationStep> Steps { get; set; }
        public virtual IEnumerable<Review> Reviews { get; set; }

        public Recipe()
        {
            Ingredients = new List<Ingredient>();
            Steps = new List<PreparationStep>();
            Reviews = new List<Review>();
        }
    }
}