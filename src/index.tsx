import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Favorites } from './pages/Favorites';
import { Weather } from './pages/Weather';

import { SnackbarProvider } from 'notistack';
import Grow from '@material-ui/core/Grow';
import { Provider } from 'react-redux';
import { store } from './Store/reduxjsStore';
ReactDOM.render<React.FC>(
  <React.StrictMode>
    <Provider store={store}>
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
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
