using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
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