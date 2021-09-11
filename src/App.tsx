import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Game from "components/Game";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      display: "flex",
      padding: theme.spacing(4),
      margin: "auto",
      maxWidth: "200px",
    },
  })
);

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <img className={classes.logo} src="images/logo.png" alt="logo" />

      <Container maxWidth="sm">
        <Game />
      </Container>
    </div>
  );
};

export default App;
