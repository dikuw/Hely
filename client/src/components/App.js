import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Banner from './Banner';
import Header from './Header';
import Navigation from './navigation/Navigation';
import Grid from './Grid';
import Cart from './cart/Cart';
import Login from './Login';
import Privacy from './Privacy';
import Terms from './Terms';
import Footer from './Footer';
import inventory from '../data/inventory';

import '../style/styles.css';

class App extends React.Component {
  state = {
    inventory: {...inventory},
    cart: { },
    menuOpen: false
  };

  authenticate = (provider) => {
    console.log('authenticate in App.js', provider);
  }

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
          <Route 
            exact path="/face" 
            render={() => (
              <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="face")} addToCart={this.addToCart} />
            )}
          />
          <Route 
            exact path="/eyes" 
            render={() => (
              <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="eyes")} addToCart={this.addToCart} />
            )}
          />
          <Route 
            exact path="/brushes" 
            render={() => (
              <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="brushes")} addToCart={this.addToCart} />
            )}
          />
          <Route 
            exact path="/login" 
            render={() => (
              <Login authenticate={this.authenticate} />
            )}
          />
          <Route 
            exact path="/privacy" 
            render={() => (
              <Privacy />
            )}
          />
          <Route 
            exact 
            path="/terms" 
            render={() => (
              <Terms />
            )}
          />
        </Switch>
        <Footer history={this.props.history}/>
      </main>
    )
  }
}

export default App;