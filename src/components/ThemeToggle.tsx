import { useEffect, useState } from 'react';

import { Label } from './ui/label';
import { Switch } from './ui/switch';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="flex items-center space-x-2">
      <Switch id="darkmode" onCheckedChange={handleClick} />
      <Label htmlFor="darkmode">{theme === 'light' ? '🌙' : '🌞'}</Label>
    </div>
    // <button onClick={handleClick}>{theme === 'light' ? '🌙' : '🌞'}</button>
  );
}
