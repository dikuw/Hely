import React from 'react';
import Banner from './Banner';
import Header from './Header';
import Navigation from './Navigation';
import Grid from './Grid';
import Footer from './Footer';

import '../style/styles.css';

class App extends React.Component {

  render() {
    return (
      <main>
        <Banner />
        <Header />
        <Navigation />
        <Grid />
        <Footer />
      </main>
    )
  }
}

export default App;