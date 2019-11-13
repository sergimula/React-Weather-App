import React from 'react';
import { Container, TitleApp } from "../styles/custom.js";
import Cities from './Cities.jsx';

class App extends React.Component {
  render() {
    return(
      <Container>
        <TitleApp>Cities Forecast</TitleApp>
        <Cities />
      </Container>
    )
  }
}

export default App;
