import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export default function ThemedButton() {
  // Accesses nearest ThemeContext provider's value
  // Re-renders when context value changes
  // Avoid overuse - can make testing harder
  // Great for theme/auth/locale data
  // Combine with useState for dynamic context
  const theme = useContext(ThemeContext);

  return (
    <button style={{ 
      background: theme.primary, 
      color: theme.text 
    }}>
      Click Me
    </button>
  );
}