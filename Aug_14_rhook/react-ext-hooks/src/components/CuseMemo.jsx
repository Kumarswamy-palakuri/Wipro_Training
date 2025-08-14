import { useMemo } from 'react';

export default function ProductList({ products, filter }) {
  // Memoizes expensive calculations
  // Only recomputes when dependencies change
  // Not a performance guarantee
  // Don't use for side effects
  // Overuse can hurt performance
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return (
    <ul>
      {filteredProducts.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}