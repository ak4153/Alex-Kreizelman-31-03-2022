import React, { useEffect, useContext } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import { LayoutWrapper } from '../styles/LayoutWrapper';
import { Store } from '../Store/Provider';
interface Props {
  title: string;
}
export const Layout: React.FC<Props> = ({ children, title }) => {
  const { state } = useContext(Store);
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <LayoutWrapper darkMode={state.darkMode}>
      <Grid container>
        <Grid item xs={12} md={12} xl={12}>
          <Navbar />
        </Grid>

        <Grid item xs={12} md={12} xl={12}>
          <div className="content">{children}</div>
        </Grid>

        <Grid item xs={12} md={12} xl={12}>
          <Footer />
        </Grid>
      </Grid>
    </LayoutWrapper>
  );
};
