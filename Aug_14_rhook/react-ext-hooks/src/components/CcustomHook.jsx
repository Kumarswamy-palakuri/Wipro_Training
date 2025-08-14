import { useState, useEffect } from 'react';

// Custom hooks start with "use"
// Can compose other hooks
// Share stateful logic between components
// Makes complex components more readable
// Examples: useLocalStorage, useAuth, useAnimation
export default function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handler = () => setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
}

function ResponsiveComponent() {
  const { width } = useWindowSize();
  return <div>Window width: {width}px</div>;
}