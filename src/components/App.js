import React, { useState, useEffect, useReducer } from 'react';
import { useTranslation } from "react-i18next";
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
import apis from '../api/index';
import '../style/styles.css';

export default function App(props) {
  const { t } = useTranslation();

  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [cart, setCart] = useState({});
  const [shipping, setShipping] = useState({
    method:"USPS",
    price: "900"
  });
  const [customer, setCustomer] = useState({
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
  });
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: ""
  });
  const [clientSecret, setClientSecret] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddedPopup, setShowAddedPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);

  useEffect(() => {
    //  TODO show a loading div while isLoading is true //
    //  ** ⏰ ⏰ ⏰  ** //
    setIsLoading(true);

    async function initialize() {
      await getUser();

      if (user.id) getUserOrders(user.id);
      console.log('isAdmin', isAdmin);
      if (isAdmin) {
        getOrders();
      }

      await apis.getInventory().then(inventory => {
        setInventory(inventory.data.data);
        setIsLoading(false);
      });

      const localStorageRef = localStorage.getItem('cart');
      console.log('localStorageRef', localStorageRef);
      if (localStorageRef) {
        setCart(JSON.parse(localStorageRef));
      }
    }

    initialize();
    
  }, []);

  useEffect(() => {
    console.log('cart', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); // Only re-run the effect if count changes

  const getUser = async () => {
    await apis.getUser().then(res => {
      if (res.data.user) {
        setIsLoggedIn(true);
        console.log('res.data.user.isAdmin', res.data.user.isAdmin);
        setIsAdmin(res.data.user.isAdmin);
        console.log(isAdmin);
        setUser({
          id: res.data.user._id,
          name: res.data.user.name,
          email: res.data.user.email,
        });
        return res.data.user._id;
      } else {
      }
    });
  }

  const registerUser = async (user) => {
    const payload = { ...user };
    await apis.register(payload).then(res => {
      if (res.data.email) {
        setIsLoggedIn(true);
        setIsAdmin(res.data.isAdmin);
        props.history.push("/");
      } else {
        console.log('error', res);
      }
    });
  }

  const loginUser = async (user) => {
    const payload = { ...user };
    await apis.login(payload).then(res => {
      if (res.data.email) {
        setIsLoggedIn(true);
        setIsAdmin(res.data.isAdmin);
        setUser({
          id: res.data._id,
          name: res.data.name,
          email: res.data.email,
        });
        getUserOrders(user.id);
        if (isAdmin) {
          getOrders();
        }
        props.history.push("/");
      } else {
        setIsPasswordIncorrect(true);
        console.log('error', res);
      }
    });
  }

  const logoutUser = async (user) => {
    const payload = { ...user };
    await apis.logout(payload).then(res => {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserOrders([]);
      setOrders([]);
      props.history.push("/");
    });
  }

  const forgotUser = async (user) => {
    const payload = { ...user };
    await apis.forgot(payload).then(res => {
      console.log(`user forgot email sent successfully`);
    });
  }

  const resetPasswordIncorrect = () => {
    setIsPasswordIncorrect(false);
  }

  const addItem = async (inventoryItem) => {
    const payload = { ...inventoryItem };
    await apis.insertInventoryItem(payload).then(res => {
      console.log(`item inserted successfully`, res);
      // const inventory = [ ...inventory ];
      // inventory.push(inventoryItem);
      setInventory([ ...inventory, JSON.parse(res.config.data) ]);
    });
  };

  const updateItem = (key, updatedItem) => {
    const inventory = [ ...inventory ];
    inventory[key] = updatedItem;
    setInventory({ inventory });
  }

  const [state, dispatch] = useReducer(reducer, {cart: {}});

  function reducer(state, action, key) {
    switch (action.type) {
      case 'increment':
        return {[key]: state.cart[key] + 1};
      case 'decrement':
        return{[key]: state.cart[key] - 1};
      default:
        throw new Error();
    }
  }

  // function updateCart() {
  //   const [state, dispatch] = useReducer(reducer, {cart: {}});
  //   return (
  //     <>
  //       Count: {state.count}
  //       <button onClick={() => dispatch({type: 'decrement'}, key)}>-</button>
  //       <button onClick={() => dispatch({type: 'increment'}, key)}>+</button>
  //     </>
  //   );
  // }

  const addToCart = (key) => {
    dispatch({type: 'increment'}, key)
    // setState(prevState => ({
    //   cart: { ...prevState.cart, [key]: prevState.cart[key] + 1 || 1 }
    // }))
  };

  const removeFromCart = (key) => {
    if (state.cart[key] === 1) {
      deleteFromCart(key);
    } else {
      dispatch({type: 'decrement'}, key);
      // setState(prevState => ({
      //   cart: { ...prevState.cart, [key]: prevState.cart[key] - 1 }
      // }))
    }
  };

  const deleteFromCart = (key) => {
    let cart = { ...cart };
    delete cart[key];
    setCart(cart);
    // setState(prevState => {
    //   let cart = { ...prevState.cart }; 
    //   delete cart[key];                                 
    //   return { cart };
    // });
  }

  const getCartTotal = () => {
    const total = Object.keys(state.cart).reduce((prevTotal, key) => {
      const cartItem = Object.values(state.inventory).filter(item => item.id===key)[0];
      const count = state.cart[key];
      if (cartItem && cartItem.available) {
        return prevTotal + (count * cartItem.price);
      }
      return prevTotal;
    }, 0);
    return total;
  }

  const getCartItemCount = () => {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }

  const postCreatePaymentIntent = async (payload) => {
    await apis.postCreatePaymentIntent(payload).then(res => {
      setClientSecret(res.data.clientSecret);
    });
  };

  const updateCustomer = (updatedProp, update) => {
    setCustomer( { ...customer, [updatedProp]: update });
    // setState(prevState => ({
    //   customer: { ...prevState.customer, [updatedProp]: update }
    // }))
  }

  const addOrder = async (order) => {
    await apis.postOrder(order).then(res => {
      console.log('addOrder', res)
    });
  }

  const getUserOrders = async (userID) => {
    await apis.getUserOrders(userID).then(res => {
      setUserOrders(res.data.data);
    });
  }

  const getOrders = async () => {
    console.log('getOrders');
    await apis.getOrders().then(res => {
      setOrders(res.data.data);
    });
  }

  const updateShipping = (update) => {
    setShipping(update);
  }

  return (
    <main>
      <TopBanner isLoggedIn={isLoggedIn} name={user.name}/>
      <Header  />
      <Navigation isLoggedIn={isLoggedIn} isAdmin={isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
      <Switch>
        <Route  exact path="/" 
          render={() => (
            <>
              {showAddedPopup ? <AddedPopup history={props.history} setShowAddedPopup={setShowAddedPopup} /> : null}
              <Grid inventory={inventory} addToCart={addToCart} setShowAddedPopup={setShowAddedPopup} />
            </>
          )}
        />
        <Route path="/face" 
          render={() => (
            <>
              <Banner bannerString={t("Products for your face")} />
              {showAddedPopup ? <AddedPopup history={props.history} setShowAddedPopup={setShowAddedPopup} /> : null}
              <Grid inventory={Object.values(inventory).filter(item => item.category==="face")} addToCart={addToCart} setShowAddedPopup={setShowAddedPopup} />
            </>
          )}
        />
        <Route path="/eyes" 
          render={() => (
            <>
              <Banner bannerString={t("Products for your eyes")} />
              {showAddedPopup ? <AddedPopup history={props.history} setShowAddedPopup={setShowAddedPopup} /> : null}
              <Grid inventory={Object.values(inventory).filter(item => item.category==="eyes")} addToCart={addToCart} setShowAddedPopup={setShowAddedPopup} />
            </>
          )}
        />
        <Route path="/brushes" 
          render={() => (
            <>
              <Banner bannerString={t("Brushes")} />
              {showAddedPopup ? <AddedPopup history={props.history} setShowAddedPopup={setShowAddedPopup} /> : null}
              <Grid inventory={Object.values(inventory).filter(item => item.category==="brushes")} addToCart={addToCart}  setShowAddedPopup={setShowAddedPopup} />
            </>
          )}
        />
        <Route path="/cart" 
          render={() => (
            <>
              <Banner bannerString={t("Your Cart")} />
              <Cart 
                history={props.history} 
                inventory={inventory} 
                cart={cart} 
                addToCart={addToCart} 
                removeFromCart={removeFromCart} 
                deleteFromCart={deleteFromCart} 
              />
            </>
          )}
        />
        <Route path="/checkout" 
          render={() => (
            <>
              <Banner bannerString={t("Checkout")} />
              <Checkout 
                history={props.history} 
                inventory={inventory} 
                cart={cart} 
                cartTotal={getCartTotal()} 
                customer={customer} 
                updateCustomer={updateCustomer}
              />
            </>
          )}
        />
        <Route path="/checkoutShipping" 
          render={() => (
            <>
              <Banner bannerString={t("Shipping")} />
              <CheckoutShipping 
                history={props.history} 
                cartTotal={getCartTotal()} 
                customer={customer} 
                shipping={shipping}
                updateShipping={updateShipping} 
              />
            </>
          )}
        />
        <Route path="/payment" 
          render={() => (
            <>
              <Banner bannerString={t("Payment Information")} />
              <Payment 
                history={props.history} 
                cart={cart} 
                cartTotal={getCartTotal()} 
                user={user} 
                customer={customer} 
                name={user.name}
                email={user.email}
                shipping={shipping}
                postCreatePaymentIntent={postCreatePaymentIntent}
                clientSecret={clientSecret}
                addOrder={addOrder}
              />
            </>
          )}
        />
        {/* <Route path="/login" 
          render={() => (
            <>
              <Banner bannerString="Log In (or Register)" />
              <Login 
                history={props.history} 
                isLoggedIn={isLoggedIn}
              />
            </>
          )}
        /> */}
        <Route path="/login" 
          render={() => (
            <>
              <Banner bannerString={t("Log In")} />
              <LocalLogin 
                history={props.history} 
                isLoggedIn={isLoggedIn} 
                isPasswordIncorrect={isPasswordIncorrect}
                resetPasswordIncorrect={resetPasswordIncorrect}
                loginUser={loginUser}
                forgotUser={forgotUser} 
              />
            </>
          )}
        />
        <Route path="/register" 
          render={() => (
            <>
              <Banner bannerString={t("Register a New Account")} />
              <Register 
                history={props.history} 
                registerUser={registerUser}
                isLoggedIn={isLoggedIn} 
              />
            </>
          )}
        />
        <Route path="/account" 
          render={() => (
            <>
              <Banner bannerString={t("Your Account")} />
              <Account 
                history={props.history} 
                isLoggedIn={isLoggedIn} 
                user={user}
                userOrders={userOrders}
                inventory={inventory} 
              />
            </>
          )}
        />
        <Route path="/inventory" 
          render={() => (
            <>
              <Banner bannerString={t("Inventory")} />
              <Inventory 
                isLoggedIn={isLoggedIn} 
                inventory={Object.values(inventory).filter(item => item.show===true)} 
                addItem={addItem}
                updateItem={updateItem}
              />
            </>
          )}
        />
        <Route path="/orders" 
          render={() => (
            <>
              <Banner bannerString={t("Orders")} />
              <Orders 
                isLoggedIn={isLoggedIn} 
                inventory={inventory} 
                orders={orders} 
              />
            </>
          )}
        />
        <Route path="/privacy" 
          render={() => (
            <>
              <Banner bannerString={t("Privacy Policy")} />
              <Privacy />
            </>
          )}
        />
        <Route path="/terms" 
          render={() => (
            <>
              <Banner bannerString={t("Terms of Use")} />
              <Terms />
            </>
          )}
        />
        <Route path="/shipping" 
          render={() => (
            <>
              <Banner bannerString={t("Shipping Policy")} />
              <Shipping />
            </>
          )}
        />
        <Route path="/returns" 
          render={() => (
            <>
              <Banner bannerString={t("Return Policy")} />
              <Returns />
            </>
          )}
        />
      </Switch>
      <Footer history={props.history}/>
    </main>
  )
}
