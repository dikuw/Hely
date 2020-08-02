import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TopBanner from './header/TopBanner';
import Header from './header/Header';
import Navigation from './navigation/Navigation';
import Banner from './Banner';
import Grid from './shop/Grid';
import AddedPopup from './shop/AddedPopup';
import Cart from './cart/Cart';
import { Checkout, Shipping as CheckoutShipping, Payment } from './checkout/index';
import { Login, LocalLogin, Register } from './login/index';
import Account from './account/Account';
import Inventory from './inventory/Inventory';
import Orders from './orders/Orders';
import { Privacy, Terms, Shipping, Returns } from './information/index';
import Footer from './Footer';
import inventory from '../data/inventory';
import orders from '../data/orders';
import apis from '../api/index';

import '../style/styles.css';

class App extends React.Component {
  state = {
    inventory: [],
    orders: [],
    cart: {},
    customer: {
      email: "",
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      country: "",
      postalCode: "",
      mobile: "",
    },
    shipping: "",
    menuOpen: false,
    showAddedPopup: false,
    isLoading: false,
    isLoggedIn: false,
    isAdmin: false,
    name: null,
    email: null,
    passwordIncorrect: false,
  };

  componentDidMount = async () => {
    //  TODO show a loading div while isLoading is true //
    //  ** ⏰ ⏰ ⏰  ** //
    this.setState({ isLoading: true });

    this.getUser();

    await apis.getInventory().then(inventory => {
      this.setState({
        inventory: inventory.data.data,
        isLoading: false,
      });
    });

    const localStorageRef = localStorage.getItem('cart');
    
    if (localStorageRef) {
      this.setState({cart: JSON.parse(localStorageRef)});
    }
  }

  componentDidUpdate() {
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  getUser = async () => {
    await apis.getUser().then(res => {
      console.log(res);
      if (res.data.user) {
        this.setState({ 
          isLoggedIn: true,
          isAdmin: res.data.user.isAdmin,
          name: res.data.user.name,
          email: res.data.user.email,
         });
        console.log('found user', res);
      } else {
        console.log('no user found', res);
      }
    });
  }

  registerUser = async (user) => {
    const payload = { ...user };
    await apis.register(payload).then(res => {
      if (res.data.email) {
        this.setState({ 
          isLoggedIn: true,
          isAdmin: res.data.isAdmin,
          name: res.data.name,
          email: res.data.email,
         });
        console.log('user registered successfully', res);
        this.props.history.push("/");
      } else {
        console.log('error', res);
      }
    });
  }

  loginUser = async (user) => {
    const payload = { ...user };
    await apis.login(payload).then(res => {
      if (res.data.email) {
        this.setState({ 
          isLoggedIn: true,
          isAdmin: res.data.isAdmin,
          name: res.data.name,
          email: res.data.email,
         });
        console.log('user logged in successfully', res);
        this.props.history.push("/");
      } else {
        this.setState({ 
          passwordIncorrect: true,
         });
        console.log('error', res);
      }
    });
  }

  logoutUser = async (user) => {
    const payload = { ...user };
    await apis.logout(payload).then(res => {
      this.setState({
        isLoggedIn: false,
        isAdmin: false,
        username: null,
        password: null
      });
      this.props.history.push("/");
      console.log('user logged out successfully', res);
    });
  }

  forgotUser = async (user) => {
    const payload = { ...user };
    await apis.forgot(payload).then(res => {
      console.log(`user forgot email sent successfully`);
    });
  }

  resetPasswordIncorrect = () => {
    this.setState({ 
      passwordIncorrect: false,
     });
  }

  togglePopup = () => {   
    this.setState(prevState => ({
      showAddedPopup: !prevState.showAddedPopup
    }))
  } 

  addItem = async (inventoryItem) => {
    const inventory = [ ...this.state.inventory ];
    inventory.push(inventoryItem);
    // inventory[`item${Date.now()}`] = inventoryItem;
    this.setState({ inventory });

    const payload = { ...inventoryItem };
    await apis.insertInventoryItem(payload).then(res => {
      console.log(`item inserted successfully`);
    });
  };

  updateItem = (key, updatedItem) => {
    const inventory = [ ...this.state.inventory ];
    inventory[key] = updatedItem;
    this.setState({ inventory });
  }

  deleteItem = (key) => {
    const inventory = [ ...this.state.inventory ];
    inventory.splice(key, 1);
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

  getCartTotal = () => {
    const total = Object.keys(this.state.cart).reduce((prevTotal, key) => {
      const cartItem = Object.values(this.state.inventory).filter(item => item.id===key)[0];
      const count = this.state.cart[key];
      if (cartItem && cartItem.available) {
        return prevTotal + (count * cartItem.price);
      }
      return prevTotal;
    }, 0);
    return total;
  }

  getCartItemCount = () => {
    return Object.values(this.state.cart).reduce((a, b) => a + b, 0);
  }

  updateCustomer = (updatedProp, update) => {
    this.setState(prevState => ({
      customer: { ...prevState.customer, [updatedProp]: update }
    }))
  }

  updateShipping = (update) => {
    this.setState({ shipping: update })
  }

  loadSampleOrders = () => {
    this.setState({ orders: orders });
  }

  render() {
    return (
      <main>
        <TopBanner isLoggedIn={this.state.isLoggedIn} name={this.state.name}/>
        <Header  />
        <Navigation isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} history={this.props.history} getCartItemCount={this.getCartItemCount} logoutUser={this.logoutUser} />
        <Switch>
          <Route  exact path="/" 
            render={() => (
              <React.Fragment>
                {this.state.showAddedPopup ? <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={this.state.inventory} addToCart={this.addToCart} togglePopup={this.togglePopup} />
              </React.Fragment>
            )}
          />
          <Route path="/face" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Products for your face" />
                {this.state.showAddedPopup ? <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="face")} addToCart={this.addToCart} togglePopup={this.togglePopup} />
              </React.Fragment>
            )}
          />
          <Route path="/eyes" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Products for your eyes" />
                {this.state.showAddedPopup ? <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="eyes")} addToCart={this.addToCart} togglePopup={this.togglePopup} />
              </React.Fragment>
            )}
          />
          <Route path="/brushes" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Brushes" />
                {this.state.showAddedPopup ? <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="brushes")} addToCart={this.addToCart}  togglePopup={this.togglePopup} />
              </React.Fragment>
            )}
          />
          <Route path="/cart" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Your Cart" />
                <Cart 
                  history={this.props.history} 
                  inventory={this.state.inventory} 
                  cart={this.state.cart} 
                  addToCart={this.addToCart} 
                  removeFromCart={this.removeFromCart} 
                  deleteFromCart={this.deleteFromCart} 
                />
              </React.Fragment>
            )}
          />
          <Route path="/checkout" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Checkout" />
                <Checkout 
                  history={this.props.history} 
                  inventory={this.state.inventory} 
                  cart={this.state.cart} 
                  cartTotal={this.getCartTotal()} 
                  customer={this.state.customer} 
                  updateCustomer={this.updateCustomer}
                />
              </React.Fragment>
            )}
          />
          <Route path="/checkoutShipping" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Shipping" />
                <CheckoutShipping 
                  history={this.props.history} 
                  cartTotal={this.getCartTotal()} 
                  customer={this.state.customer} 
                  shipping={this.state.shipping}
                  updateShipping={this.updateShipping} 
                />
              </React.Fragment>
            )}
          />
          <Route path="/payment" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Payment" />
                <Payment 
                  history={this.props.history} 
                  cartTotal={this.getCartTotal()} 
                  customer={this.state.customer} 
                  shipping={this.state.shipping}
                />
              </React.Fragment>
            )}
          />
          <Route path="/login" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Log In (or Register)" />
                <Login 
                  history={this.props.history} 
                  isLoggedIn={this.state.isLoggedIn}
                />
              </React.Fragment>
            )}
          />
          <Route path="/locallogin" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Log In" />
                <LocalLogin 
                  history={this.props.history} 
                  isLoggedIn={this.state.isLoggedIn} 
                  passwordIncorrect={this.state.passwordIncorrect}
                  resetPasswordIncorrect={this.resetPasswordIncorrect}
                  loginUser={this.loginUser}
                  forgotUser={this.forgotUser} 
                />
              </React.Fragment>
            )}
          />
          <Route path="/register" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Register a New Account" />
                <Register 
                  history={this.props.history} 
                  registerUser={this.registerUser}
                  isLoggedIn={this.state.isLoggedIn} 
                />
              </React.Fragment>
            )}
          />
          <Route path="/account" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Your Account" />
                <Account 
                  history={this.props.history} 
                  isLoggedIn={this.state.isLoggedIn} 
                  name={this.state.name}
                  email={this.state.email}
                />
              </React.Fragment>
            )}
          />
          <Route path="/inventory" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Inventory" />
                <Inventory 
                  isLoggedIn={this.state.isLoggedIn} 
                  inventory={Object.values(this.state.inventory).filter(item => item.show===true)} 
                  addItem={this.addItem}
                  updateItem={this.updateItem}
                  deleteItem={this.deleteItem}
                  loadSampleInventory={this.loadSampleInventory}
                />
              </React.Fragment>
              
            )}
          />
          <Route path="/orders" 
            render={() => (
              <React.Fragment>
                <Banner bannerString="Orders" />
                <Orders 
                  isLoggedIn={this.state.isLoggedIn} 
                  orders={Object.values(this.state.orders)} 
                  loadSampleOrders={this.loadSampleOrders}
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