namespace OrderService.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } // Name des Kunden
        public string Address { get; set; } // Lieferadresse
        public DateTime OrderDate { get; set; } // Datum der Bestellung
        public List<OrderItem> Items { get; set; } // Liste der Artikel in der Bestellung

        public decimal TotalPrice { get; set; } // Gesamtkosten der Bestellung
    }
}
