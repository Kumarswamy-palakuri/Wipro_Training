import { useState, useEffect } from 'react';

export default function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  
  // Runs after every render by default
  // Empty dependency array = runs once (like componentDidMount)
  // Cleanup function prevents memory leaks
  // Always include dependencies to avoid stale closures
  // Multiple effects separate concerns clearly
  useEffect(() => {
    const controller = new AbortController();
    
    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then(res => res.json())
      .then(setData);

    return () => controller.abort(); // Cleanup
  }, [userId]); // Only re-run if userId changes

  return <div>{data ? data.name : 'Loading...'}</div>;
}