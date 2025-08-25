namespace SecureShoppingApp.ViewModels
{
    public class DashboardViewModel
    {
        public int TotalUsers { get; set; }
        public int TotalProducts { get; set; }
        public int TotalOrders { get; set; }
        public decimal TotalRevenue { get; set; }
        public List<RecentOrder> RecentOrders { get; set; } = new();
    }

    public class RecentOrder
    {
        public int OrderId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime OrderDate { get; set; }
    }
}