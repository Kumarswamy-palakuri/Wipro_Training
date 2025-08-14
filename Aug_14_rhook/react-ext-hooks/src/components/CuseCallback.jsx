import { useState, useCallback } from 'react';

export default function Parent() {
  const [count, setCount] = useState(0);
  
  // Memoizes function instances
  // Prevents unnecessary re-renders in children
  // Essential with React.memo children
  // Dependency array like useEffect
  // Not helpful if dependencies change often
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // No dependencies = never changes

  return (
    <div>
      <Child onClick={increment} />
      <div>Count: {count}</div>
    </div>
  );
}

const Child = React.memo(({ onClick }) => {
  console.log('Child render');
  return <button onClick={onClick}>Increment</button>;
});