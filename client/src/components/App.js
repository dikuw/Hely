import React, { useState, useEffect } from 'react';
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
import ShippingOptions from './shippingOptions/ShippingOptions';
import Orders from './orders/Orders';
import { Popup } from './shared/index';
import { Privacy, Terms, Shipping, Returns } from './information/index';
import { Admin } from './admin/index';
import Footer from './Footer';
import apis from '../api/index';
import '../style/styles.css';

export default function App(props) {
  const { t } = useTranslation();

  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
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
    postalCode: " ",
    mobile: "",
  });
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [clientSecret, setClientSecret] = useState("");
  const [showAddedPopup, setShowAddedPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    async function initialize() {
      await getUser();

      await apis.getInventory().then(inventory => {
        setInventory(inventory.data.data);
        setIsLoading(false);
      });

      await apis.getShippingOptions().then(shippingOptions => {
        setShippingOptions(shippingOptions.data.data);
      });

      const cartLS = localStorage.getItem('cart');
      if (cartLS) {
        setCart(JSON.parse(cartLS));
      }
    }

    initialize();
  }, []);

  useEffect(() => {
    //  get user orders
    if (user._id) getUserOrders(user._id);

    //  get all orders for admins
    if (user.isAdmin) {
      getOrders();
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getUser = async () => {
    await apis.getUser().then(res => {
      const user = res.data.user;
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
        return user;
      } 
    });
  }

  const registerUser = async (user) => {
    const payload = { ...user };
    await apis.register(payload).then(res => {
      if (res.data.email) {
        setIsLoggedIn(true);
        props.history.push("/");
      } else {
        //  TODO Surface errors to user (e.g. account is already registered)
        //  🏭 🏭 🏭 🏭 🏭 🏭
        console.log('error', res);
      }
    });
  }

  const loginUser = async (user) => {
    const payload = { ...user };
    await apis.login(payload).then(res => {
      if (res.data.email) {
        setIsLoggedIn(true);
        setUser(res.data);
        getUserOrders(user._id);
        if (user.isAdmin) {
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
      setUserOrders([]);
      setOrders([]);
      setCart([]);
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
      setInventory([ ...inventory, JSON.parse(res.config.data) ]);
    });
  };

  const updateItem = async (updatedItem) => {
    const payload = { ...updatedItem };
    await apis.updateInventoryItem(payload).then(res => {
      console.log(`item updated successfully`, res);
    });
  }

  const addShippingOption = async (shippingOption) => {
    const payload = { ...shippingOption };
    await apis.insertShippingOption(payload).then(res => {
      setShippingOptions([ ...shippingOptions, JSON.parse(res.config.data) ]);
    });
  };

  const updateShippingOption = async (updatedShippingOption) => {
    const payload = { ...updatedShippingOption };
    await apis.updateShippingOption(payload).then(res => {
      console.log(`shipping option updated successfully`, res);
    });
  }

  const addToCart = (newItem) => {
    let newCart = [ ...cart ];
    const itemId = newCart.findIndex((item) => item.item._id === newItem._id);
    if (itemId === -1) {
      newCart.push({ item: newItem, qty: 1 })
    } else {
      newCart[itemId].qty += 1;
    }
    setCart(newCart);
  };

  const removeFromCart = (newItem) => {
    let newCart = [ ...cart ];
    const itemId = newCart.findIndex((item) => item.item._id === newItem._id);
    if (itemId === -1) {
      newCart.push({ item: newItem, qty: 1 })
    } else {
      if (newCart[itemId].qty === 1) {
        newCart.splice(itemId, 1);
      } else {
        newCart[itemId].qty -= 1;
      }
    }
    setCart(newCart);
  };

  const deleteFromCart = (newItem) => {
    let newCart = [ ...cart ];
    const itemId = newCart.findIndex((item) => item.item._id === newItem._id);
    newCart.splice(itemId, 1);
    setCart(newCart);
  }

  const getCartTotal = () => {
    const total = cart.reduce((total, item) => {
      const cartItem = item.item;
      const isAvailable = inventory.filter(item => item.id===cartItem.id)[0].available;
      if (cartItem && isAvailable) {
        return total + (item.qty * cartItem.price);
      }
      return total;
    }, 0);
    return total;
  }

  const getCartItemCount = () => {
    const total = cart.reduce((total, item) => {
      return total + item.qty;
    }, 0);
    return total;
  }

  const postCreatePaymentIntent = async (payload) => {
    await apis.postCreatePaymentIntent(payload).then(res => {
      setClientSecret(res.data.clientSecret);
    });
  };

  const updateCustomer = (updatedProp, update) => {
    setCustomer( { ...customer, [updatedProp]: update });
  }

  const addOrder = async (order) => {
    await apis.postOrder(order).then(res => {
      setCart([]);
      props.history.push("/account");
    });
  }

  const getUserOrders = async (userID) => {
    await apis.getUserOrders(userID).then(res => {
      setUserOrders(res.data.data);
    });
  }

  const getOrders = async () => {
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
      <Switch>
        <Route  exact path="/" 
          render={() => (
            <>
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              {showAddedPopup ? <AddedPopup history={props.history} setShowAddedPopup={setShowAddedPopup} /> : null}
              {isLoading ? <Popup popupText={t("Finding latest products...")}/> : null}
              <Grid inventory={inventory} addToCart={addToCart} setShowAddedPopup={setShowAddedPopup} />
            </>
          )}
        />
        <Route path="/face" 
          render={() => (
            <>
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              <Banner bannerString={t("Products for your face")} />
              {showAddedPopup ? <AddedPopup history={props.history} setShowAddedPopup={setShowAddedPopup} /> : null}
              <Grid inventory={Object.values(inventory).filter(item => item.category==="face")} addToCart={addToCart} setShowAddedPopup={setShowAddedPopup} />
            </>
          )}
        />
        <Route path="/eyes" 
          render={() => (
            <>
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              <Banner bannerString={t("Products for your eyes")} />
              {showAddedPopup ? <AddedPopup history={props.history} setShowAddedPopup={setShowAddedPopup} /> : null}
              <Grid inventory={Object.values(inventory).filter(item => item.category==="eyes")} addToCart={addToCart} setShowAddedPopup={setShowAddedPopup} />
            </>
          )}
        />
        <Route path="/brushes" 
          render={() => (
            <>
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              <Banner bannerString={t("Brushes")} />
              {showAddedPopup ? <AddedPopup history={props.history} setShowAddedPopup={setShowAddedPopup} /> : null}
              <Grid inventory={Object.values(inventory).filter(item => item.category==="brushes")} addToCart={addToCart}  setShowAddedPopup={setShowAddedPopup} />
            </>
          )}
        />
        <Route path="/cart" 
          render={() => (
            <>
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              <Banner bannerString={t("Your Cart")} />
              <Cart 
                history={props.history} 
                inventory={inventory} 
                cart={cart} 
                getCartTotal={getCartTotal}
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
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
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
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              <Banner bannerString={t("Shipping")} />
              <CheckoutShipping 
                history={props.history} 
                cartTotal={getCartTotal()} 
                customer={customer} 
                shippingOptions={shippingOptions}
                shipping={shipping}
                updateShipping={updateShipping} 
              />
            </>
          )}
        />
        <Route path="/payment" 
          render={() => (
            <>
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
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
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
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
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
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
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              <Banner bannerString={t("Your Account")} />
              <Account 
                history={props.history} 
                isLoggedIn={isLoggedIn} 
                user={user}
                userOrders={userOrders}
              />
            </>
          )}
        />
        <Route path="/inventory" 
          render={() => (
            <>
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history}/>
              <Banner bannerString={t("Inventory")} />
              <Inventory 
                isLoggedIn={isLoggedIn} 
                inventory={inventory} 
                setInventory={setInventory}
                addItem={addItem}
                updateItem={updateItem}
              />
            </>
          )}
        />
        <Route path="/shippingOptions" 
          render={() => (
            <>
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} />
              <Banner bannerString={t("Shipping Options")} />
              <ShippingOptions 
                isLoggedIn={isLoggedIn} 
                shippingOptions={shippingOptions} 
                setShippingOptions={setShippingOptions}
                addShippingOption={addShippingOption}
                updateShippingOption={updateShippingOption}
              />
            </>
          )}
        />
        <Route path="/orders" 
          render={() => (
            <>
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} />
              <Banner bannerString={t("Orders")} />
              <Orders 
                isLoggedIn={isLoggedIn} 
                orders={orders} 
              />
            </>
          )}
        />
        <Route path="/privacy" 
          render={() => (
            <>
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              <Banner bannerString={t("Privacy Policy")} />
              <Privacy />
            </>
          )}
        />
        <Route path="/terms" 
          render={() => (
            <>
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              <Banner bannerString={t("Terms of Use")} />
              <Terms />
            </>
          )}
        />
        <Route path="/shipping" 
          render={() => (
            <>
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              <Banner bannerString={t("Shipping Policy")} />
              <Shipping />
            </>
          )}
        />
        <Route path="/returns" 
          render={() => (
            <>
              <Header /> 
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              <Banner bannerString={t("Return Policy")} />
              <Returns />
            </>
          )}
        />
        <Route path="/admin" 
          render={() => (
            <>
              <Banner bannerString={t("Site Administration")} />
              <Navigation isLoggedIn={isLoggedIn} isAdmin={user.isAdmin} history={props.history} getCartItemCount={getCartItemCount} logoutUser={logoutUser} />
              <Admin history={props.history} />
            </>
          )}
        />
      </Switch>
      <Footer history={props.history}/>
    </main>
  )
}
