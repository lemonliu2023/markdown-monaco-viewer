import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { MonacoProvider } from './contexts/MonacoContext';

// lazy({ workspace });

createRoot(document.getElementById('root')!).render(
  <MonacoProvider>
    <App />
  </MonacoProvider>
);
