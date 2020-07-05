import React from 'react';
import Banner from './Banner';
import Header from './Header';
import ProductGrid from './ProductGrid';
import Footer from './Footer';

class App extends React.Component {

  render() {
    return (
      <main>
        <Banner />
        <Header />
        <ProductGrid />
        <Footer />
      </main>
    )
  }
}

export default App;