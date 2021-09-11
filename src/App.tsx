import React from "react";

import Container from "@material-ui/core/Container";

import Navbar from "components/Navbar";
import Game from "components/Game";

const App = () => {
  return (
    <div>
      <Navbar />

      <Container maxWidth="lg">
        <Game />
      </Container>
    </div>
  );
};

export default App;
