import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Favorites } from './pages/Favorites';
import { Weather } from './pages/Weather';
import { StoreProvider } from './Store/Provider';
import { SnackbarProvider } from 'notistack';
import Grow from '@material-ui/core/Grow';
ReactDOM.render<React.FC>(
  <React.StrictMode>
    <StoreProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Grow as any}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<App />}>
              <Route path="favorites" element={<Favorites />} />
              <Route path="/" element={<Weather />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: '1rem' }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
