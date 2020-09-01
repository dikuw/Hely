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

const StyledNoteDiv = styled.div`
  text-align: left;
  padding-right: 20px;
  margin-bottom: 4px;
  font-size: 0.8em;
  @media (max-width: 768px) {
    padding-right: 8wv;
  }
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

export default function Checkout(props) {
  const { t } = useTranslation();

  const handleChange = async (e) => {
    let updatedValue = e.currentTarget.value;
    let propName = e.currentTarget.name;

    props.updateCustomer(propName, updatedValue);
  }
  
  const handleClick = () => {
    props.history.push("/checkoutShipping");
  };

  const goBack = () => {
    props.history.push("/cart");
  };

  return (
    <StyledWrapperDiv>
      <div>{t("Cart total")}: {formatPrice(props.cartTotal)}</div>
      <StyledNoteDiv>{t("Shipping added in the next step")}</StyledNoteDiv>
      <div>{t("Contact Information")}</div>
      <StyledForm>
        <input name="email" type="text" placeholder={t("Email")} onChange={handleChange} value={props.customer.email} />
        <StyledGroupDiv>
          <input name="firstName" type="text" placeholder={t("First Name")} onChange={handleChange} value={props.customer.firstName} />
          <input name="lastName" type="text" placeholder={t("Last Name")} onChange={handleChange} value={props.customer.lastName} />
        </StyledGroupDiv>
        <input name="address1" type="text" placeholder={t("Address")} onChange={handleChange} value={props.customer.address1} />
        <input name="address2" type="text" placeholder={t("Apartment, suite, etc. (if applicable)")} onChange={handleChange} value={props.customer.address2} />
        <StyledGroupDiv>
          <input name="city" type="text" placeholder={t("City")} onChange={handleChange} value={props.customer.city} />
          <input name="state" type="text" placeholder={t("State")} onChange={handleChange} value={props.customer.state} />
          <input name="postalCode" type="text" placeholder={t("Postal Code")} onChange={handleChange} value={props.customer.postalCode} />
        </StyledGroupDiv>
          <select name="country" onChange={handleChange} value={props.customer.country} >
            <option value="CO">Colombia</option>
            <option value="US">USA</option>
            <option value="VE">Venezuela</option>
          </select>
        <input name="mobile" type="text" placeholder={t("Mobile")} onChange={handleChange} value={props.customer.mobile} />
        <VisibleActionButton  clickHandler={handleClick} buttonLabel={t("Continue to Shipping")} />
        <InvisibleActionButton clickHandler={goBack} buttonLabel={t("Back to Cart")} />
      </StyledForm>
    </StyledWrapperDiv>
  )
};