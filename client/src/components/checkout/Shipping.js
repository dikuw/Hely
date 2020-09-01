import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';
import { InvisibleActionButton, VisibleActionButton } from '../shared/index';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
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
    border: 0;
  }
`;

const StyledGroupDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: solid 1px;
  border-radius: 4px;
  padding: 0.5rem;
  margin: 0.25rem;
  label {
    margin: 0;
  }
`;

const StyledDurationDiv = styled.div`
  padding: 0.5rem;
  color: var(--rosaVieja);
`;

const StyledPriceDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
`;

export default function CheckoutShipping(props) {
  const { t } = useTranslation();

  const handleChange = async (e) => {
    //  TODO update this so it is not-hardcoded or at least validate prices on the server //
    //  💰 💰 💰 💰 💰 💰 💰💰 💰 💰 💰💰 💰 💰 💰💰 💰 💰 💰💰 💰 💰 💰💰 💰 💰 💰  //
    props.updateShipping({ method: e.currentTarget.value, price: e.currentTarget.getAttribute("data-price") });
  }
  
  const handleClick = () => {
    props.history.push("/payment");
  };

  const goBack = () => {
    props.history.push("/checkout");
  };

  return (
    <StyledWrapperDiv>
      <div>{t("Cart total")}: {formatPrice(props.cartTotal)}</div>
      <h4>{t("Choose Shipping Method")}</h4>
      <StyledForm>
        <StyledGroupDiv>
          <input type="radio" id="USPS" name="shippingMethod" value="USPS" data-price="900" onChange={handleChange} checked={props.shipping.method === 'USPS' || !(props.shipping.method) } />
          <label htmlFor="USPS">USPS Priority Mail</label>
          <StyledDurationDiv>3 business days</StyledDurationDiv>
          <StyledPriceDiv>{formatPrice(900)}</StyledPriceDiv>
        </StyledGroupDiv>
        <StyledGroupDiv>
          <input type="radio" id="Fedex" name="shippingMethod" value="Fedex" data-price="1200" onChange={handleChange} checked={props.shipping.method === 'Fedex'} />
          <label htmlFor="Fedex">Fedex</label>
          <StyledDurationDiv>2 business days</StyledDurationDiv>
          <StyledPriceDiv>{formatPrice(1200)}</StyledPriceDiv>
        </StyledGroupDiv>
        <StyledGroupDiv>
          <input type="radio" id="UPS" name="shippingMethod" value="UPS" data-price="1299" onChange={handleChange} checked={props.shipping.method === 'UPS'} />
          <label htmlFor="UPS">UPS</label>
          <StyledDurationDiv>2 business days</StyledDurationDiv>
          <StyledPriceDiv>{formatPrice(1299)}</StyledPriceDiv>
        </StyledGroupDiv>
        <VisibleActionButton  clickHandler={handleClick} buttonLabel={t("Continue to Payment")} />
        <InvisibleActionButton clickHandler={goBack} buttonLabel={t("Back to Information")} />
      </StyledForm>
    </StyledWrapperDiv>
  )
};
