namespace carRental.Exceptions
{
    public class CustomerNotFoundException : Exception
    {
        public CustomerNotFoundException() : base("Customer not found") { }

        public CustomerNotFoundException(string message) : base(message) { }

        public CustomerNotFoundException(string message, Exception innerException)
            : base(message, innerException) { }

        public CustomerNotFoundException(int customerId)
            : base($"Customer with ID {customerId} was not found") { }
    }
}
