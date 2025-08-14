import { useRef, useEffect } from 'react';

export default function FocusInput() {
  // Creates mutable object that persists
  // .current property holds the value
  // Changes don't trigger re-renders
  // Common for DOM access/intervals
  // Can store previous state values
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // DOM access
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused" />;
}