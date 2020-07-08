import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Banner from './Banner';
import Header from './Header';
import Navigation from './navigation/Navigation';
import Grid from './Grid';
import Cart from './cart/Cart';
import Footer from './Footer';
import inventory from '../data/inventory';

import '../style/styles.css';

class App extends React.Component {
  state = {
    inventory: {...inventory},
    cart: { },
    menuOpen: false
  };

  addToCart = (key) => {
    this.setState(prevState => ({
      cart: { ...prevState.cart, [key]: prevState.cart[key] + 1 || 1 }
    }))
  };

  deleteFromCart = (key) => {
    // const cart = { ...this.state.cart };
    // delete cart[key];
    // this.setState({ cart });
    this.setState(prevState => {
      let cart = { ...prevState.cart }; 
      delete cart[key];                                 
      return { cart };
    });
  }

  render() {
    return (
      <main>
        <Banner />
        <Header />
        <Navigation history={this.props.history} />
        <Switch>
          <Route 
            exact path="/" 
            render={() => (
              <Grid inventory={this.state.inventory} addToCart={this.addToCart} />
            )}
          />
          <Route 
            exact path="/cart" 
            render={() => (
              <Cart inventory={this.state.inventory} cart={this.state.cart} addToCart={this.addToCart} deleteFromCart={this.deleteFromCart} />
            )}
          />
        </Switch>
        <Footer />
      </main>
    )
  }
}

export default App;