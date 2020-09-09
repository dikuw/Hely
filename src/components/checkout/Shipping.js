import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';
import { InvisibleActionButton, VisibleActionButton } from '../shared/index';
import ShippingOption from './ShippingOption';

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
        {props.shippingOptions.filter(item => item.available === true).map( (item, i) => 
          <ShippingOption 
            key={i} 
            index={i} 
            item={item} 
            handleChange={handleChange}
            shipping={props.shipping}
          />)}
        <VisibleActionButton clickHandler={handleClick} buttonLabel={t("Continue to Payment")} />
        <InvisibleActionButton clickHandler={goBack} buttonLabel={t("Back to Information")} />
      </StyledForm>
    </StyledWrapperDiv>
  )
};
