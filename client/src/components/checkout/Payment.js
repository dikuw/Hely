import React, { useState, useEffect, useRef }  from 'react';
import { useTranslation } from "react-i18next";
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

export default function Payment(props) {
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

function CheckoutForm(props) {
  const { t } = useTranslation();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const address1Ref = useRef(null);
  const address2Ref = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
  const postalCodeRef = useRef(null);
  const checkboxRef = useRef(null);
  const successRef = useRef(null);
  const warningRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const total = parseInt(props.cartTotal) + parseInt(props.shipping.price);

  useEffect(() => {
    props.postCreatePaymentIntent({ amount: total });
  }, []);

  // useEffect(() => {
  //   successRef.current.innerHTML = null;
  //   warningRef.current.innerHTML = null;
  // });

  const populateAddress = () => {
    if (checkboxRef.current.checked) {
      firstNameRef.current.value = props.customer.firstName;
      lastNameRef.current.value = props.customer.lastName;
      address1Ref.current.value = props.customer.address1;
      address2Ref.current.value = props.customer.address2;
      cityRef.current.value = props.customer.city;
      stateRef.current.value = props.customer.state;
      countryRef.current.value = props.customer.country;
      postalCodeRef.current.value = props.customer.postalCode;
    } else {
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      address1Ref.current.value = "";
      address2Ref.current.value = "";
      cityRef.current.value = "";
      stateRef.current.value = "";
      countryRef.current.value = "";
      postalCodeRef.current.value = "";
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    successRef.current.innerHTML = null;
    warningRef.current.innerHTML = null;

    const {stripe, elements} = props;

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    let payWithCard = async (stripe, card, clientSecret) => {
      setLoading(true);
      stripe.confirmCardPayment(clientSecret, { payment_method: { card: card } })
        .then((result) => {
          setLoading(false);
          if (result.error) {
            console.log(result.error.message);
            warningRef.current.innerHTML = result.error.message;
          } else {
            console.log(result.paymentIntent.id);
            successRef.current.innerHTML = "Payment completed successfully."
            props.addOrder({
              user: props.user,
              cart: props.cart,
              customer: props.customer,
              paymentId: result.paymentIntent.id,
              orderDate: Date.now(),
              status: "In progress",
              total: total,
              shipping: props.shipping
            });
          }
        });
    };

    await payWithCard(stripe, cardElement, props.clientSecret);

  };

  const backClick = () => {
    props.history.push("/checkoutShipping");
  };

  const { stripe } = props;
  
  return (
    <StyledWrapperDiv>
      {loading ? <LoadingPopup /> : null}
      <div>{t("Cart")}: {formatPrice(props.cartTotal)}</div>
      <div>{t("Shipping")}: {formatPrice(props.shipping.price)}</div>
      <div>{t("Total")}: {formatPrice(total)}</div>
      <StyledForm >
        <h4>{t("Billing Address")}</h4>
        <label htmlFor="sameAs">
          <input name="sameAs" ref={checkboxRef} type="checkbox" onClick={populateAddress} />{t("Same as shipping")}
        </label>
        <StyledGroupDiv>
          <input name="firstName" ref={firstNameRef} type="text" placeholder={t("First Name")} />
          <input name="lastName" ref={lastNameRef} type="text" placeholder={t("Last Name")} />
        </StyledGroupDiv>
        <input name="address1" ref={address1Ref} type="text" placeholder={t("Address")} />
        <input name="address2" ref={address2Ref} type="text" placeholder={t("Apartment, suite, etc. (if applicable)")} />
        <StyledGroupDiv>
          <input name="city" ref={cityRef} type="text" placeholder={t("City")} />
          <input name="state" ref={stateRef} type="text" placeholder={t("State")} />
          <input name="postalCode" ref={postalCodeRef} type="text" placeholder={t("Postal Code")} />
        </StyledGroupDiv>
        <select name="country" ref={countryRef} >
          <option value="CO">Colombia</option>
          <option value="US">USA</option>
          <option value="VE">Venezuela</option>
        </select>
      </StyledForm>
      <StyledForm onSubmit={handleSubmit} >
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
        <StyledCheckoutButton type="submit" disabled={!stripe} >{t("Pay")} {formatPrice(total)}</StyledCheckoutButton>
        <StyledSuccessDiv ref={successRef}></StyledSuccessDiv>
        <StyledWarningDiv ref={warningRef}></StyledWarningDiv>
      </StyledForm>
      <StyledButtonInvisible onClick={() => backClick()}>{t("Back to Shipping")}</StyledButtonInvisible>
    </StyledWrapperDiv>
  );
};