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
import { LocalLogin, Register } from './login/index';
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
    userOrders: [],
    cart: {},
    shipping: {
      method:"USPS",
      price: "900"
    },
    customer: {
      email: "",
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      mobile: "",
    },
    user: {
      id: "",
      name: "",
      email: ""
    },
    clientSecret: "",
    menuOpen: false,
    showAddedPopup: false,
    isLoading: false,
    isLoggedIn: false,
    isAdmin: false,
    name: "",
    email: "",
    passwordIncorrect: false,
  };

  componentDidMount = async () => {
    //  TODO show a loading div while isLoading is true //
    //  ** ⏰ ⏰ ⏰  ** //
    this.setState({ isLoading: true });

    await this.getUser();

    this.getUserOrders(this.state.user.id);

    if (this.state.isAdmin) {
      this.getOrders();
    }

    await apis.getInventory().then(inventory => {
      this.setState({
        inventory: inventory.data.data,
        isLoading: false,
      });
    });

    const localStorageRef = localStorage.getItem('cart');
    console.log('localStorageRef', localStorageRef);
    if (localStorageRef) {
      this.setState({cart: JSON.parse(localStorageRef)});
    }
  }

  componentDidUpdate() {
    console.log('this.state.cart', this.state.cart);
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  getUser = async () => {
    await apis.getUser().then(res => {
      if (res.data.user) {
        this.setState({ 
          isLoggedIn: true,
          isAdmin: res.data.user.isAdmin,
          name: res.data.user.name,
          email: res.data.user.email,
          user: {
            id: res.data.user._id,
            name: res.data.user.name,
            email: res.data.user.email,
          }
         });
        return res.data.user._id;
      } else {
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
          user: {
            id: res.data._id,
            name: res.data.name,
            email: res.data.email,
          }
         });
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

  postCreatePaymentIntent = async (payload) => {
    await apis.postCreatePaymentIntent(payload).then(res => {
      this.setState({ clientSecret: res.data.clientSecret });
    });
  };

  updateCustomer = (updatedProp, update) => {
    this.setState(prevState => ({
      customer: { ...prevState.customer, [updatedProp]: update }
    }))
  }

  addOrder = async (order) => {
    await apis.postOrder(order).then(res => {
      console.log('addOrder', res)
    });
  }

  getUserOrders = async (userID) => {
    await apis.getUserOrders(userID).then(res => {
      this.setState({ userOrders: res.data.data });
    });
  }

  getOrders = async () => {
    await apis.getOrders().then(res => {
      this.setState({ orders: res.data.data });
    });
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
              <>
                {this.state.showAddedPopup ? <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={this.state.inventory} addToCart={this.addToCart} togglePopup={this.togglePopup} />
              </>
            )}
          />
          <Route path="/face" 
            render={() => (
              <>
                <Banner bannerString="Products for your face" />
                {this.state.showAddedPopup ? <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="face")} addToCart={this.addToCart} togglePopup={this.togglePopup} />
              </>
            )}
          />
          <Route path="/eyes" 
            render={() => (
              <>
                <Banner bannerString="Products for your eyes" />
                {this.state.showAddedPopup ? <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="eyes")} addToCart={this.addToCart} togglePopup={this.togglePopup} />
              </>
            )}
          />
          <Route path="/brushes" 
            render={() => (
              <>
                <Banner bannerString="Brushes" />
                {this.state.showAddedPopup ? <AddedPopup history={this.props.history} togglePopup={this.togglePopup} /> : null}
                <Grid inventory={Object.values(this.state.inventory).filter(item => item.category==="brushes")} addToCart={this.addToCart}  togglePopup={this.togglePopup} />
              </>
            )}
          />
          <Route path="/cart" 
            render={() => (
              <>
                <Banner bannerString="Your Cart" />
                <Cart 
                  history={this.props.history} 
                  inventory={this.state.inventory} 
                  cart={this.state.cart} 
                  addToCart={this.addToCart} 
                  removeFromCart={this.removeFromCart} 
                  deleteFromCart={this.deleteFromCart} 
                />
              </>
            )}
          />
          <Route path="/checkout" 
            render={() => (
              <>
                <Banner bannerString="Checkout" />
                <Checkout 
                  history={this.props.history} 
                  inventory={this.state.inventory} 
                  cart={this.state.cart} 
                  cartTotal={this.getCartTotal()} 
                  customer={this.state.customer} 
                  updateCustomer={this.updateCustomer}
                />
              </>
            )}
          />
          <Route path="/checkoutShipping" 
            render={() => (
              <>
                <Banner bannerString="Shipping" />
                <CheckoutShipping 
                  history={this.props.history} 
                  cartTotal={this.getCartTotal()} 
                  customer={this.state.customer} 
                  shipping={this.state.shipping}
                  updateShipping={this.updateShipping} 
                />
              </>
            )}
          />
          <Route path="/payment" 
            render={() => (
              <>
                <Banner bannerString="Payment Information" />
                <Payment 
                  history={this.props.history} 
                  cart={this.state.cart} 
                  cartTotal={this.getCartTotal()} 
                  user={this.state.user} 
                  customer={this.state.customer} 
                  name={this.state.name}
                  email={this.state.email}
                  shipping={this.state.shipping}
                  postCreatePaymentIntent={this.postCreatePaymentIntent}
                  clientSecret={this.state.clientSecret}
                  addOrder={this.addOrder}
                />
              </>
            )}
          />
          {/* <Route path="/login" 
            render={() => (
              <>
                <Banner bannerString="Log In (or Register)" />
                <Login 
                  history={this.props.history} 
                  isLoggedIn={this.state.isLoggedIn}
                />
              </>
            )}
          /> */}
          <Route path="/login" 
            render={() => (
              <>
                <Banner bannerString="Log In" />
                <LocalLogin 
                  history={this.props.history} 
                  isLoggedIn={this.state.isLoggedIn} 
                  passwordIncorrect={this.state.passwordIncorrect}
                  resetPasswordIncorrect={this.resetPasswordIncorrect}
                  loginUser={this.loginUser}
                  forgotUser={this.forgotUser} 
                />
              </>
            )}
          />
          <Route path="/register" 
            render={() => (
              <>
                <Banner bannerString="Register a New Account" />
                <Register 
                  history={this.props.history} 
                  registerUser={this.registerUser}
                  isLoggedIn={this.state.isLoggedIn} 
                />
              </>
            )}
          />
          <Route path="/account" 
            render={() => (
              <>
                <Banner bannerString="Your Account" />
                <Account 
                  history={this.props.history} 
                  isLoggedIn={this.state.isLoggedIn} 
                  name={this.state.name}
                  email={this.state.email}
                  user={this.state.user}
                  userOrders={this.state.userOrders}
                  inventory={this.state.inventory} 
                />
              </>
            )}
          />
          <Route path="/inventory" 
            render={() => (
              <>
                <Banner bannerString="Inventory" />
                <Inventory 
                  isLoggedIn={this.state.isLoggedIn} 
                  inventory={Object.values(this.state.inventory).filter(item => item.show===true)} 
                  addItem={this.addItem}
                  updateItem={this.updateItem}
                  deleteItem={this.deleteItem}
                  loadSampleInventory={this.loadSampleInventory}
                />
              </>
              
            )}
          />
          <Route path="/orders" 
            render={() => (
              <>
                <Banner bannerString="Orders" />
                <Orders 
                  isLoggedIn={this.state.isLoggedIn} 
                  inventory={this.state.inventory} 
                  orders={this.state.orders} 
                  loadSampleOrders={this.loadSampleOrders}
                />
              </>
            )}
          />
          <Route path="/privacy" 
            render={() => (
              <>
                <Banner bannerString="Privacy Policy" />
                <Privacy />
              </>
            )}
          />
          <Route path="/terms" 
            render={() => (
              <>
                <Banner bannerString="Terms of Use" />
                <Terms />
              </>
            )}
          />
          <Route path="/shipping" 
            render={() => (
              <>
                <Banner bannerString="Shipping Policy" />
                <Shipping />
              </>
            )}
          />
          <Route path="/returns" 
            render={() => (
              <>
                <Banner bannerString="Return Policy" />
                <Returns />
              </>
            )}
          />
        </Switch>
        <Footer history={this.props.history}/>
      </main>
    )
  }
}

export default App;