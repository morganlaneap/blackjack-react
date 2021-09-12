import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import Game from "components/Game";
import Info from "components/Info";
import Stats from "components/Stats";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      display: "flex",
      padding: theme.spacing(4),
      margin: "auto",
      maxWidth: "200px",
    },
    footer: {
      textAlign: "center",
      color: "white",
    },
    text: {
      fontSize: "12px",
    },
    link: {
      color: "white",
      textDecoration: "underline",
    },
  })
);

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <img
        className={classes.logo}
        src="/blackjack/images/logo.png"
        alt="logo"
      />

      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Hidden smDown>
            <Grid item md={1} />
          </Hidden>

          <Grid item md={5} sm={12} xs={12}>
            <Game />
          </Grid>
          <Grid item md={5} sm={12} xs={12}>
            <Info />

            <Stats />
          </Grid>
        </Grid>

        <div className={classes.footer}>
          <Typography className={classes.text}>
            Built for fun. Author: Morgan Lane.
          </Typography>
          <Typography className={classes.text}>
            Source:{" "}
            <a
              className={classes.link}
              href="https://github.com/morganlaneap/blackjack-react"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://github.com/morganlaneap/blackjack-react
            </a>
          </Typography>
        </div>
        <br />
      </Container>
    </div>
  );
};

export default App;
