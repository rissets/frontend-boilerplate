import { initializeTheme } from '@/shared/lib/theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { Providers } from './app/providers';
import config from '../app.config.json';
import './styles/index.css';
document.title = config.name;
initializeTheme();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
