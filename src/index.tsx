//npm packages
import React from 'react';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom';
import Grow from '@material-ui/core/Grow';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//styles
import './index.css';
//pages
import { Favorites } from './pages/Favorites';
import App from './App';
import { Weather } from './pages/Weather';
//redux
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
