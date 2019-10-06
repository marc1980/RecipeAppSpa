using System;
using System.Collections.Generic;
using Backend.Models;

namespace Backend.Data
{
    public interface IRecipeRepository
    {
        Recipe GetById(int id);
        bool RecipeExists(int id);
        IEnumerable<Recipe> List();
        void Add(Recipe recipe);
        void Delete(Recipe recipe);
        void Edit(Recipe recipe);
        IEnumerable<Review> ListReviews(int Id);
        void AddReview(Review review);
    }
}
