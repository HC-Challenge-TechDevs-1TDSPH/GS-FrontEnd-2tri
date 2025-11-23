import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './globals.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './routes/HomePage/HomePage.tsx';
import Integrantes from './routes/TeamPage/TeamPage.tsx';
import FAQ from './routes/FaqPage/FaqPage.tsx';
import Contato from './routes/ContactPage/ContactPage.tsx';
import AuthPage from './routes/AuthPage/AuthPage.tsx'; 
import Dashboard from './routes/Dashboard/Dashboard.tsx';
import TracksPage from './routes/TracksPage/TracksPage.tsx';
import EmergingSkills from './routes/EmergingSkills/EmergingSkills.tsx';
import MarketComparison from './routes/MarketComparison/MarketComparison.tsx';
import ReadinessResult from './routes/ReadinessResult/ReadinessResult.tsx';
import B2BArea from './routes/B2BArea/B2BArea.tsx';
import Error from './routes/Error/index.tsx';
import Sobre from './routes/AboutPage/AboutPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/integrantes', element: <Integrantes /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/contato', element: <Contato /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '/login', element: <AuthPage /> },
      { path: '/cadastro', element: <AuthPage /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/trilhas', element: <TracksPage /> },
      { path: '/tendencias', element: <EmergingSkills /> },
      { path: '/comparativo', element: <MarketComparison /> },
      { path: '/analise', element: <ReadinessResult /> },
      { path: '/b2b', element: <B2BArea /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);