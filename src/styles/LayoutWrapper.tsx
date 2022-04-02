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
  background-image: url(${dark});
  background-size: fit;
  background-repeat: no-repeat;

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
  background-image: url(${light});
  background-size: fit;
  background-repeat: no-repeat;

}
.MuiTypography-root {
  font-family:  Cursive,Roboto;
}
.MuiAppBar-colorDefault {
  background-color: #FED43F;
  transition: all 0.1s linear 0s;
}
.footer{
  background-color: #BED7D8;
  transition: all 0.1s linear 0s;
}

`}
`;
