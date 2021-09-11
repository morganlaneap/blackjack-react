import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#264b3a",
      light: "#264b3a",
    },
    secondary: {
      main: "#e1382e",
    },
  },
  typography: {
    fontFamily: "'Noto Sans', sans-serif",
    h5: {
      fontWeight: 700,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        margin: "5px !important",
      },
    },
  },
});

export default theme;
