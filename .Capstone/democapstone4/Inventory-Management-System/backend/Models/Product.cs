namespace InventoryManagementSystem.Backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int LowThreshold { get; set; } = 5;
    }
}