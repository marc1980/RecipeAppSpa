using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {

        IRecipeRepository _repository;
        public RecipesController(IRecipeRepository repository)
        {
            _repository = repository;
        }

        // GET api/recipes
        [HttpGet]
        public ActionResult<IEnumerable<Recipe>> Get()
        {
            return _repository.List().ToList();
        }

        // GET api/recipes/5
        [HttpGet("{id}")]
        public ActionResult<Recipe> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("id must be greater than 0");
            }

            try
            {
                var recipe = _repository.GetById(id);
                if (recipe == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(recipe);
                }
            }
            catch
            {
                return BadRequest();
            }


        }

        // POST api/recipes
        [HttpPost]
        public ActionResult Post([FromBody] Recipe recipe)
        {
            if (ModelState.IsValid)
            {
                if (recipe.Id == 0)
                {
                    _repository.Add(recipe);
                    return Ok();
                }
                else
                {
                    return BadRequest("Use PUT for changing an existing recipe");
                }
            }
            else
            {
                return BadRequest("Invalid recipe");
            }

        }

        // PUT api/recipes/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest("Recipe id invalid");
            }
            if (ModelState.IsValid)
            {
                _repository.Edit(recipe);
                return Ok();
            }
            else
            {
                return BadRequest("Recipe object invalid");
            }
        }

        // DELETE api/recipes/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var recipe = _repository.GetById(id);
            if (recipe == null)
            {
                return NotFound();
            }
            else
            {
                _repository.Delete(recipe);
                return NoContent();
            }
        }
    }
}
