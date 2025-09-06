// Views stock, create movements

export default function StaffDashboard() {
  const { data: products } = useGetProductsQuery();
  const [addMovement] = useAddMovementMutation();
  const [movement, setMovement] = useState({ productId: 0, change: 0, reason: '' });

  const handleAddMovement = async () => {
    await addMovement(movement);
  };

  return (
    <div className="p-4">
      <h1>Staff Dashboard</h1>
      <section>
        <h2>Create Movement</h2>
        {/* Form for productId, change, reason */}
        <Button onClick={handleAddMovement}>Submit</Button>
      </section>
      <section>
        <h2>Stock View</h2>
        <Table>{/* Products table, view only */}</Table>
      </section>
    </div>
  );
}