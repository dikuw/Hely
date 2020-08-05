import React  from 'react';
import styled from 'styled-components';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import LoadingPopup from './LoadingPopup';
import { formatPrice } from '../../helpers.js';

const StyledWrapperDiv = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  padding: 4px;
`;

const StyledForm = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  input, select {
    margin: 0.25rem;
    padding: 10px;
    font-size: 1rem;
  }
  input:focus, textarea:focus, select:focus {
    outline: 0;
    background: #fef2de;
  }
  textarea {
    width: 100%;
  }
  button {
    width: 100%;
    border: 0;
  }
`;

const StyledGroupDiv = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  input {
    width: 50%;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    input {
      width: auto;
    }
  }
`;

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const StyledCheckoutButton = styled.button`
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 400;
  font-style: normal;
  background: var(--rosaVieja);
  border-color: var(--rosaVieja);
  border-radius: 2px;
  border: 0;
  color: #ffffff;
  display: inline-block;
  height: 45px;
  letter-spacing: 1px;
  line-height: 45px;
  margin: 0;
  padding: 0 25px;
  transition: background-color 300ms ease-out;
  width: auto;
`;

const StyledButtonInvisible = styled.button`
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: 400;
  font-style: normal;
  color: var(--vinoTinto);
  background: white; 
  border: 0;
  display: inline-block;
  letter-spacing: 1px;
  margin-top: 0.5rem;
  padding: 5px 5px;
  width: 100%;
`;

const StyledSuccessDiv = styled.div`
  text-align: center;
  padding: 0vw 3vw;
  color: var(--vinoTinto);
  font-weight: 600;
`;

const StyledWarningDiv = styled.div`
  text-align: center;
  padding: 0vw 3vw;
  color: red;
  font-weight: 600;
`;

const stripePromise = loadStripe("pk_test_51HCJ9zLgTNpklCDHxJedB0w1YFVo1eFtsrs3rXoftYGDv2gJE0L62mmreg3MVzkdBf6kMzzalWMhE2DlCexgLxAx005RG1QVPh");

const Payment = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
      {({elements, stripe}) => (
        <CheckoutForm 
          history={props.history} 
          cart={props.cart}
          cartTotal={props.cartTotal} 
          shipping={props.shipping}
          elements={elements} 
          stripe={stripe} 
          user={props.user} 
          customer={props.customer} 
          name={props.name}
          email={props.email}
          postCreatePaymentIntent={props.postCreatePaymentIntent}
          clientSecret={props.clientSecret}
          addOrder={props.addOrder}
        />
      )}
    </ElementsConsumer>
    </Elements>
  );
};

class CheckoutForm extends React.Component {
  firstNameRef = React.createRef();
  lastNameRef = React.createRef();
  address1Ref = React.createRef();
  address2Ref = React.createRef();
  cityRef = React.createRef();
  stateRef = React.createRef();
  countryRef = React.createRef();
  postalCodeRef = React.createRef();
  checkboxRef = React.createRef();
  successRef = React.createRef();
  warningRef = React.createRef();

  state = {
    loading: false,
    total: parseInt(this.props.cartTotal) + parseInt(this.props.shipping.price)
  };

  componentDidMount = () => {
    this.props.postCreatePaymentIntent({ amount: this.state.total });
  };

  componentDidUpdate = () => {
    this.successRef.current.innerHTML = null;
    this.warningRef.current.innerHTML = null;
  }

  togglePopup = () => {   
    this.setState(prevState => ({
      loading: !prevState.loading
    }))
  } 

  populateAddress = () => {
    if (this.checkboxRef.current.checked) {
      this.firstNameRef.current.value = this.props.customer.firstName;
      this.lastNameRef.current.value = this.props.customer.lastName;
      this.address1Ref.current.value = this.props.customer.address1;
      this.address2Ref.current.value = this.props.customer.address2;
      this.cityRef.current.value = this.props.customer.city;
      this.stateRef.current.value = this.props.customer.state;
      this.countryRef.current.value = this.props.customer.country;
      this.postalCodeRef.current.value = this.props.customer.postalCode;
    } else {
      this.firstNameRef.current.value = "";
      this.lastNameRef.current.value = "";
      this.address1Ref.current.value = "";
      this.address2Ref.current.value = "";
      this.cityRef.current.value = "";
      this.stateRef.current.value = "";
      this.countryRef.current.value = "";
      this.postalCodeRef.current.value = "";
    }
    
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {stripe, elements} = this.props;

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    let payWithCard = async (stripe, card, clientSecret) => {
      this.togglePopup();
      stripe.confirmCardPayment(clientSecret, { payment_method: { card: card } })
        .then((result) => {
          this.togglePopup();
          if (result.error) {
            console.log(result.error.message);
            this.warningRef.current.innerHTML = result.error.message;
          } else {
            console.log(result.paymentIntent.id);
            this.successRef.current.innerHTML = "Payment completed successfully."
            this.props.addOrder({
              user: this.props.user,
              cart: this.props.cart,
              customer: this.props.customer,
              paymentId: result.paymentIntent.id,
              orderDate: Date.now(),
              status: "In progress",
              total: this.state.total,
              shipping: this.props.shipping
            });
          }
        });
    };

    await payWithCard(stripe, cardElement, this.props.clientSecret);

  };

  backClick = () => {
    this.props.history.push("/checkoutShipping");
  };

  render() {
    const {stripe} = this.props;
    
    return (
      <StyledWrapperDiv>
        {this.state.loading ? <LoadingPopup /> : null}
        <div>Cart: {formatPrice(this.props.cartTotal)}</div>
        <div>Shipping: {formatPrice(this.props.shipping.price)}</div>
        <div>Total: {formatPrice(this.state.total)}</div>
        <StyledForm >
          <h4>Billing Address</h4>
          <label htmlFor="sameAs">
            <input name="sameAs" ref={this.checkboxRef} type="checkbox" onClick={this.populateAddress} />Same as shipping
          </label>
          <StyledGroupDiv>
            <input name="firstName" ref={this.firstNameRef} type="text" placeholder="First Name" onChange={this.handleChange} />
            <input name="lastName" ref={this.lastNameRef} type="text" placeholder="Last Name" onChange={this.handleChange} />
          </StyledGroupDiv>
          <input name="address1" ref={this.address1Ref} type="text" placeholder="Address" onChange={this.handleChange} />
          <input name="address2" ref={this.address2Ref} type="text" placeholder="Apartment, suite, etc. (if applicable)" onChange={this.handleChange} />
          <StyledGroupDiv>
            <input name="city" ref={this.cityRef} type="text" placeholder="City" onChange={this.handleChange} />
            <input name="state" ref={this.stateRef} type="text" placeholder="State" onChange={this.handleChange} />
            <input name="postalCode" ref={this.postalCodeRef} type="text" placeholder="Postal Code" onChange={this.handleChange} />
          </StyledGroupDiv>
          <select name="country" ref={this.countryRef} onChange={this.handleChange} >
            <option value="CO">Colombia</option>
            <option value="US">USA</option>
            <option value="VE">Venezuela</option>
          </select>
        </StyledForm>
        <StyledForm onSubmit={this.handleSubmit}>
          <CardElementContainer>
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#8b9299',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </CardElementContainer>
          <StyledCheckoutButton type="submit" disabled={!stripe}>Pay {formatPrice(this.state.total)}</StyledCheckoutButton>
          <StyledSuccessDiv ref={this.successRef}></StyledSuccessDiv>
          <StyledWarningDiv ref={this.warningRef}></StyledWarningDiv>
        </StyledForm>
        <StyledButtonInvisible onClick={() => this.backClick()}>Back to Shipping</StyledButtonInvisible>
      </StyledWrapperDiv>
    );
  }
};

export default Payment;