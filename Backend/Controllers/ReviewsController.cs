using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/recipes/{recipeId}/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        IRecipeRepository _repository;
        public ReviewsController(IRecipeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int recipeId)
        {
            if (_repository.RecipeExists(recipeId))
            {
                try
                {
                    return Ok(_repository.ListReviews(recipeId).ToList());
                }
                catch
                {
                    return BadRequest();
                }
            }
            else
            {
                return NotFound("Recipe Id not found");
            }
                
        }

        [HttpPost]
        public async Task<IActionResult> Post(int recipeId, Review review)
        {
            if (recipeId == review.RecipeId && _repository.RecipeExists(recipeId))
            {
                try
                {
                    _repository.AddReview(review);
                }
                catch
                {
                    return BadRequest();
                }
                return Ok();
            }
            else
            {
                return NotFound("Recipe Id not found");
            }
        }
    }
}