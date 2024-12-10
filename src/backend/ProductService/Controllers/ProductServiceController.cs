using Microsoft.AspNetCore.Mvc;
using ProductService.Models;

namespace ProductService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private static readonly List<Product> Products = new List<Product>
        {
            new Product { Id = 1, Name = "Classic Duck", Price = 5.99m, Description = "A classic yellow bath duck.", ImageURL = "https://i.imgur.com/fO4vNtG.png" },
            new Product { Id = 2, Name = "Pirate Duck", Price = 7.49m, Description = "A pirate-themed bath duck.", ImageURL = "https://i.imgur.com/fO4vNtG.png" },
            new Product { Id = 3, Name = "Glow Duck", Price = 9.99m, Description = "A glow-in-the-dark bath duck.", ImageURL = "https://i.imgur.com/fO4vNtG.png" },
        };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(Products);
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound($"Product with Id {id} not found.");
            }
            return Ok(product);
        }

        [HttpPost]
        public ActionResult<Product> AddProduct(Product product)
        {
            product.Id = Products.Max(p => p.Id) + 1;
            Products.Add(product);
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateProduct(int id, Product updatedProduct)
        {
            var product = Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound($"Product with Id {id} not found.");
            }

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.Description = updatedProduct.Description;
            product.ImageURL = updatedProduct.ImageURL;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(int id)
        {
            var product = Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound($"Product with Id {id} not found.");
            }

            Products.Remove(product);
            return NoContent();
        }
    }
}
