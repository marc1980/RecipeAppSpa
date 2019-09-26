using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        public IngredientController()
        {
        }

        // GET api/ingredient/GetUnitOfMeasureTypes
        [HttpGet]
        public ActionResult<IEnumerable<string>> GetUnitOfMeasureTypes()
        {
            var UnitOfMeasureTypes = new List<string>();

            foreach(var item in Enum.GetValues(typeof(UnitOfMeasure))) 
            {
                UnitOfMeasureTypes.Add(item.ToString());
            }

            return UnitOfMeasureTypes;
        }
    }
}