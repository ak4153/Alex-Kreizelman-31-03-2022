import React from 'react';
import FooterWrapper from '../styles/FooterWrapper';

export const Footer: React.FC = () => {
  const d = new Date();
  return (
    <FooterWrapper className="footer">
      &#169; All Rights Reserved AK Projects {d.getFullYear()}
    </FooterWrapper>
  );
};
