import { useState } from 'react';

export default function Counter() {
  // useState returns [currentState, updaterFunction]
  // Initial state (0) passed as only argument
  // Can use multiple times for different state variables
  // Updates trigger re-renders automatically
  // Prefer over class this.setState for simplicity
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}