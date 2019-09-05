using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Backend.Models
{

    [JsonConverter(typeof(StringEnumConverter))]
    public enum UnitOfMeasure
    {
        Piece,
        Gram,
        Miligram,
        Kilogram,
        Liter,
        Mililiter,
        Centiliter
    }
    public class Ingredient
    {
        public int Id { get; set; }
        public virtual Recipe Recipe { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Range(1, 999)]
        public int Amount { get; set; }
        public UnitOfMeasure Unit { get; set; }
    }

}