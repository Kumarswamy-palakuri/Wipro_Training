namespace democapstone.Models;

public class InventoryMovement
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string Type { get; set; } = "Adjustment"; // In, Out, Adjustment
    public int QuantityChange { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string PerformedBy { get; set; } = "";
}
