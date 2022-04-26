import React from 'react';
import FooterWrapper from '../styles/FooterWrapper';
const d = new Date();
export const Footer: React.FC = () => {
  return (
    <FooterWrapper className="footer">
      &#169; All Rights Reserved AK Projects {d.getFullYear()}
    </FooterWrapper>
  );
};
