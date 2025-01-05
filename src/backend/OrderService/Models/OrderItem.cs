namespace OrderService.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; } // ID des Badeentenprodukts
        public int Quantity { get; set; } // Anzahl der Artikel
        public decimal Price { get; set; } // Preis für dieses Produkt
    }
}
