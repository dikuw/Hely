import React from 'react';
import Banner from './Banner';
import Header from './Header';
import Navigation from './navigation/Navigation';
import Grid from './Grid';
import Footer from './Footer';
import inventory from '../data/inventory';

import '../style/styles.css';

class App extends React.Component {
  state = {
    inventory: {...inventory},
    cart: {},
  };

  render() {
    return (
      <main>
        <Banner />
        <Header />
        <Navigation />
        <Grid inventory={this.state.inventory}/>
        <Footer />
      </main>
    )
  }
}

export default App;