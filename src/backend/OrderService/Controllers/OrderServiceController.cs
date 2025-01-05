using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using OrderService.Models;

namespace OrderService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderContext _context;

        public OrderController(OrderContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return Ok(await _context.Orders.Include(o => o.Items).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id);
            if (order == null)
            {
                return NotFound($"Order with Id {id} not found.");
            }
            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<Order>> AddOrder(Order order)
        {
            // Berechne den Gesamtpreis
            order.TotalPrice = order.Items.Sum(i => i.Price * i.Quantity);
            order.OrderDate = DateTime.UtcNow;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrder(int id, Order updatedOrder)
        {
            var order = await _context.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id);
            if (order == null)
            {
                return NotFound($"Order with Id {id} not found.");
            }

            order.CustomerName = updatedOrder.CustomerName;
            order.Address = updatedOrder.Address;
            order.Items = updatedOrder.Items;
            order.TotalPrice = updatedOrder.Items.Sum(i => i.Price * i.Quantity);

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id);
            if (order == null)
            {
                return NotFound($"Order with Id {id} not found.");
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
