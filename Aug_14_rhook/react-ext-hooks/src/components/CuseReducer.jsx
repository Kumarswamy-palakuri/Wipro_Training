import { useReducer } from 'react';

// Reducer handles complex state transitions
// Similar to Redux pattern but local to component
// Better than useState when state has sub-values
// Predictable state updates
// Can combine with useContext for global state
export default function todosReducer(state, action) {
  switch (action.type) {
    case 'ADD': return [...state, action.payload];
    case 'DELETE': return state.filter(t => t.id !== action.id);
    default: return state;
  }
}

export default function TodoList() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({ type: 'DELETE', id: todo.id })}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}