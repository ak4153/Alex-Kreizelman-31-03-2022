import styled from 'styled-components';
import dark from '../assets/back.png';
import light from '../assets/front.png';
interface StyleProps {
  darkMode?: boolean;
}
export const LayoutWrapper = styled.div<StyleProps>`
  ${({ darkMode }) =>
    darkMode
      ? `  .content {
  min-height: 100vh;
  background: rgb(255,225,51);
  background: linear-gradient(90deg, rgba(255,225,51,1) 0%, rgba(174,0,255,1) 50%, rgba(0,57,255,1) 100%);
  transition: aa 0.3s ease 0s;
}
.MuiTypography-root {
  font-family:  Cursive,Roboto;
}
.MuiAppBar-colorDefault {
  background-color: #d88c9a;
  transition: all 0.1s linear 0s;
}
.footer{
  background-color: #8e7dbe;
  transition: all 0.1s linear 0s;
}

`
      : `  .content {

  min-height: 100vh;
  background: rgb(255,225,51);
  background: linear-gradient(90deg, rgba(255,225,51,1) 0%, rgba(246,255,0,1) 64%, rgba(221,154,39,1) 100%);
  transition: aa 0.1s ease 0s;
}
.MuiTypography-root {
  font-family:  Cursive,Roboto;
}
.MuiAppBar-colorDefault {
  background-color:#dd9a27;
  transition: all 0.3s linear 0s;
}
.footer{
  background-color: #BED7D8;
  transition: all 0.1s linear 0s;
}

`}
`;
