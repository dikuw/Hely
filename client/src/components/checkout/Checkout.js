import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';

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
          <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} value={props.customer.lastName} />
        </StyledGroupDiv>
        <input name="address1" type="text" placeholder="Address" onChange={handleChange} value={props.customer.address1} />
        <input name="address2" type="text" placeholder="Apartment, suite, etc. (if applicable)" onChange={handleChange} value={props.customer.address2} />
        <StyledGroupDiv>
          <input name="city" type="text" placeholder="City" onChange={handleChange} value={props.customer.city} />
          <input name="state" type="text" placeholder="State" onChange={handleChange} value={props.customer.state} />
          <input name="postalCode" type="text" placeholder="Postal Code" onChange={handleChange} value={props.customer.postalCode} />
        </StyledGroupDiv>
          <select name="country" onChange={handleChange} value={props.customer.country} >
            <option value="CO">Colombia</option>
            <option value="US">USA</option>
            <option value="VE">Venezuela</option>
          </select>
        <input name="mobile" type="text" placeholder="Mobile" onChange={handleChange} value={props.customer.mobile} />
        <StyledCheckoutButton onClick={() => handleClick()}>{t("Continue to Shipping")}</StyledCheckoutButton>
        <StyledButtonInvisible onClick={() => goBack()}>{t("Back to Cart")}</StyledButtonInvisible>
      </StyledForm>
    </StyledWrapperDiv>
  )
};