import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
//styles
import { LayoutWrapper } from '../styles/LayoutWrapper';
//components
import { Navbar } from './Navbar';
import { Footer } from './Footer';
//redux
import { useAppDispatch, useAppSelector } from '../Store/hooks';

interface Props {
  title: string;
}
export const Layout: React.FC<Props> = ({ children, title }) => {
  const darkMode = useAppSelector((state) => state.darkMode);
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <LayoutWrapper darkMode={darkMode.value}>
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
