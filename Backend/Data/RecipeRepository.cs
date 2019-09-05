using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class RecipeRepository : IRecipeRepository
    {
        private RecipeContext _context;
        public RecipeRepository(RecipeContext context)
        {
            _context = context;
        }
        public Recipe GetById(int id)
        {
            return _context.Recipes
                .Include(r => r.Ingredients)
                .Include(r => r.Steps)
                .Where(r => r.Id == id)
                .FirstOrDefault();
        }
        public IEnumerable<Recipe> List()
        {
            return _context.Recipes
                .Include(r => r.Ingredients)
                .Include(r => r.Steps);
        }
        public void Add(Recipe recipe)
        {
            _context.Add(recipe);
            _context.SaveChanges();
        }
        public void Delete(Recipe recipe)
        {
            _context.Recipes.Remove(recipe);
            _context.SaveChanges();
        }
        public void Edit(Recipe recipe)
        {
            var currentRecipe = _context.Recipes
                    .Include(r => r.Ingredients)
                    .Include(r => r.Steps)
                    .FirstOrDefault(r => r.Id == recipe.Id);

            _context.Entry(currentRecipe).CurrentValues.SetValues(recipe);
            UpdateIngredientsInContext(currentRecipe, recipe);
            UpdateStepsInContext(currentRecipe, recipe);

            _context.SaveChangesAsync();
        }

        private void UpdateStepsInContext(Recipe currentRecipe, Recipe recipe)
        {
            foreach (var step in recipe.Steps)
            {
                var currentStep = _context.PreparationSteps.FirstOrDefault(s => s.Id == step.Id);
                if (currentStep != null)
                {
                    _context.Entry(currentStep).CurrentValues.SetValues(step);
                }
                else
                {
                    step.Recipe = currentRecipe;
                    _context.PreparationSteps.Add(step);
                }
            }
            foreach (var step in currentRecipe.Steps)
            {
                if (!recipe.Steps.Any(r => r.Id == step.Id))
                {
                    _context.Remove(step);
                }
            }
        }

        private void UpdateIngredientsInContext(Recipe currentRecipe, Recipe recipe)
        {
            foreach (var ingredient in recipe.Ingredients)
            {
                var currentIngredient = _context.Ingredients.FirstOrDefault(i => i.Id == ingredient.Id);
                if (currentIngredient != null)
                {
                    _context.Entry(currentIngredient).CurrentValues.SetValues(ingredient);
                }
                else
                {
                    ingredient.Recipe = currentRecipe;
                    _context.Ingredients.Add(ingredient);
                }
            }
            foreach (var ingredient in currentRecipe.Ingredients)
            {
                if (!recipe.Ingredients.Any(r => r.Id == ingredient.Id))
                {
                    _context.Remove(ingredient);
                }
            }
        }
    }
}