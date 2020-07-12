import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TopBanner from './header/TopBanner';
import Header from './header/Header';
import Navigation from './navigation/Navigation';
import Banner from './Banner';
import Grid from './shop/Grid';
import AddedPopup from './shop/AddedPopup';
import Cart from './cart/Cart';
import Login from './Login';
import Inventory from './inventory/Inventory';
import Privacy from './information/Privacy';
import Terms from './information/Terms';
import Shipping from './information/Shipping';
import Returns from './information/Returns';
import Footer from './Footer';
import inventory from '../data/inventory';

import '../style/styles.css';

class App extends React.Component {
  state = {
    inventory: {...inventory},
    cart: {},
    menuOpen: false,
    showAddedPopup: false
  };

  componentDidMount() {
    const localStorageRef = localStorage.getItem('cart');
    
    if (localStorageRef) {
      this.setState({cart: JSON.parse(localStorageRef)});
    }
  }

  componentDidUpdate() {
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  togglePopup = () => {   
    this.setState(prevState => ({
      showAddedPopup: !prevState.showAddedPopup
    }))
  } 

  authenticate = (provider) => {
    console.log('authenticate in App.js', provider);
  }

  addItem = (inventoryItem) => {
    const inventory = { ...this.state.inventory };
    inventory[`item${Date.now()}`] = inventoryItem;
    this.setState({ inventory });
  };

  updateItem = (key, updatedItem) => {
    const inventory = {...this.state.inventory};
    inventory[key] = updatedItem;
    this.setState({ inventory });
  }

  deleteItem = (key) => {
    const inventory = {...this.state.inventory};
    console.log('before', inventory);
    delete inventory[key];
    console.log('after', inventory);
    this.setState({ inventory });
  }

  loadSampleInventory = () => {
    this.setState({ inventory: inventory });
  }

  addToCart = (key) => {
    this.setState(prevState => ({
      cart: { ...prevState.cart, [key]: prevState.cart[key] + 1 || 1 }
    }))
  };

  removeFromCart = (key) => {
    if (this.state.cart[key] === 1) {
      this.deleteFromCart(key);
    } else {
      this.setState(prevState => ({
        cart: { ...prevState.cart, [key]: prevState.cart[key] - 1 }
      }))
    }
  };

  deleteFromCart = (key) => {
    this.setState(prevState => {
      let cart = { ...prevState.cart }; 
      delete cart[key];                                 
      return { cart };
    });
  }

  getCartItemCount = () => {
    return Object.values(this.state.cart).reduce((a, b) => a + b, 0);
  }

  render() {
    return (
      <main>
        <TopBanner />
        <Header />
        <Navigation history={this.props.history} getCartItemCount={this.getCartItemCount} />
        <Switch>
          <Route  exact path="/" 
            render={() => (
              <React.Fragment>
                {this.state.showAddedPopup ?  <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={this.state.inventory} addToCart={this.addToCart} togglePopup={this.togglePopup} />
              </React.Fragment>
            )}
          />
          <Route path="/face" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Products for your face" />
                {this.state.showAddedPopup ?  <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="face")} addToCart={this.addToCart} togglePopup={this.togglePopup} />
              </React.Fragment>
            )}
          />
          <Route path="/eyes" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Products for your eyes" />
                {this.state.showAddedPopup ?  <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="eyes")} addToCart={this.addToCart} togglePopup={this.togglePopup} />
              </React.Fragment>
            )}
          />
          <Route path="/brushes" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Brushes" />
                {this.state.showAddedPopup ?  <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="brushes")} addToCart={this.addToCart}  togglePopup={this.togglePopup} />
              </React.Fragment>
            )}
          />
          <Route path="/cart" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Your Cart" />
                <Cart inventory={this.state.inventory} cart={this.state.cart} addToCart={this.addToCart} removeFromCart={this.removeFromCart} deleteFromCart={this.deleteFromCart} />
              </React.Fragment>
            )}
          />
          <Route path="/login" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Log In (or Register)" />
                <Login authenticate={this.authenticate} />
              </React.Fragment>
            )}
          />
          <Route path="/inventory" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Inventory" />
                <Inventory 
                  inventory={this.state.inventory} 
                  authenticate={this.authenticate} 
                  addItem={this.addItem}
                  updateItem={this.updateItem}
                  deleteItem={this.deleteItem}
                  loadSampleInventory={this.loadSampleInventory}
                />
              </React.Fragment>
              
            )}
          />
          <Route path="/privacy" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Privacy Policy" />
                <Privacy />
              </React.Fragment>
            )}
          />
          <Route path="/terms" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Terms of Use" />
                <Terms />
              </React.Fragment>
            )}
          />
          <Route path="/shipping" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Shipping Policy" />
                <Shipping />
              </React.Fragment>
            )}
          />
          <Route path="/returns" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Return Policy" />
                <Returns />
              </React.Fragment>
            )}
          />
        </Switch>
        <Footer history={this.props.history}/>
      </main>
    )
  }
}

export default App;