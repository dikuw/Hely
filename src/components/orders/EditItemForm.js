import React from 'react';
import { useTranslation } from "react-i18next";
import CartHeader from './CartHeader';
import CartItem from './CartItem';
import { format } from 'date-fns'
import styled from 'styled-components';

const StyledButton = styled.button`
  text-transform: uppercase;
  font-weight: 400;
  font-style: normal;
  background: var(--vinoTinto);
  border-color: var(--vinoTinto);
  border-radius: 2px;
  border: 0;
  color: var(--almostWhite);
  display: inline-block;
  letter-spacing: 1px;
  margin: 0;
  padding: 0 25px;
  transition: background-color 300ms ease-out;
  width: auto;
`;

const StyledDiv = styled.div`
  margin-bottom: 20px;
  padding: 0.5vw;
  border: 2px solid #000;
  overflow: hidden;
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  input, textarea, select {
    flex-grow: 1;
    padding: 10px;
    line-height: 1;
    font-size: 1rem;
    border: 0;
    border: 1px solid #000;
    -webkit-appearance: none;
      -moz-appearance: none;
            appearance: none;
    border-radius: 0;
    background: #fff;
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
  @media (max-width: 768px) {
    input, textarea, select {
      width: 100%;
      flex-direction: column;
    }
  }
`;

const StyledOverviewColDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
`;

const StyledProcessingColDiv = styled.div`
  flex-grow: 1;
`;

const StyledFormRowDiv = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  margin-left: 1vw;
  margin-bottom: 0.5vw;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledLabel = styled.label`
  flex-basis: 20%;
  margin-bottom: 0px;
  @media (max-width: 768px) {
    text-align: left;
    flex-basis: 25%;
  }
`;

const StyledUl = styled.ul`
  width: 100%;
`;

export default function EditItemForm(props) {
  const { t } = useTranslation();

  const handleChange = async (e) => {
    let updatedValue = e.currentTarget.value;
    let propName = e.currentTarget.name;

    if (updatedValue === "true" || updatedValue === "false") {
        updatedValue = JSON.parse(updatedValue);
    }

    const updatedItem = {
        ...props.item,
        [propName]: updatedValue
    }

    props.updateItem(props.index, updatedItem);
  }

  return (
    <StyledDiv>
      <StyledOverviewColDiv>
        <StyledFormRowDiv>
            <StyledLabel htmlFor="id">{t("Order ID")}: </StyledLabel>
            <input type="text" name="id" value={props.item._id} readOnly />
        </StyledFormRowDiv>
        <StyledFormRowDiv>
            <StyledLabel htmlFor="email">{t("Email")}: </StyledLabel>
            <input type="text" name="email" onChange={handleChange} value={props.item.customer.email} />
        </StyledFormRowDiv>
        <StyledFormRowDiv>
            <StyledLabel htmlFor="shippingName">{t("Name")}: </StyledLabel>
            <input type="text" name="shippingName" onChange={handleChange} value={props.item.customer.firstName} />
        </StyledFormRowDiv>
        <StyledFormRowDiv>
            <StyledLabel htmlFor="shippingAddressLine1">{t("Address Line")} 1: </StyledLabel>
            <input type="text" name="shippingAddressLine1" onChange={handleChange} value={props.item.customer.address1} />
        </StyledFormRowDiv>
        <StyledFormRowDiv>
            <StyledLabel htmlFor="shippingAddressLine2">{t("Address Line")} 2: </StyledLabel>
            <input type="text" name="shippingAddressLine2" onChange={handleChange} value={props.item.customer.address2} />
        </StyledFormRowDiv>
        <StyledFormRowDiv>
            <StyledLabel htmlFor="shippingAddressCity">{t("City")}: </StyledLabel>
            <input type="text" name="shippingAddressCity" onChange={handleChange} value={props.item.customer.city} />
        </StyledFormRowDiv>
        <StyledFormRowDiv>
            <StyledLabel htmlFor="shippingAddressState">{t("State")}: </StyledLabel>
            <input type="text" name="shippingAddressState" onChange={handleChange} value={props.item.customer.state} />
        </StyledFormRowDiv>
        <StyledFormRowDiv>
            <StyledLabel htmlFor="shippingAddressZip">{t("Postal Code")}: </StyledLabel>
            <input type="text" name="shippingAddressZip" onChange={handleChange} value={props.item.customer.postalCode} />
        </StyledFormRowDiv>
        <StyledFormRowDiv>
            <StyledLabel htmlFor="shippingAddressCountryCode">{t("Country Code")}: </StyledLabel>
            <input type="text" name="shippingAddressCountryCode" onChange={handleChange} value={props.item.customer.country} />
        </StyledFormRowDiv>
      </StyledOverviewColDiv>
      <StyledProcessingColDiv>
        <StyledFormRowDiv>
          <StyledLabel htmlFor="paymentId">{t("Payment ID")}: </StyledLabel>
          <input type="text" name="paymentId" value={props.item.paymentId} readOnly />
        </StyledFormRowDiv>
        <StyledFormRowDiv>
          <StyledLabel htmlFor="orderDate">{t("Order Date")}: </StyledLabel>
          <input type="text" name="orderDate" value={format(new Date(props.item.orderDate), 'MMMM dd, yyyy')} readOnly />
        </StyledFormRowDiv>
        <StyledFormRowDiv>
          <StyledLabel htmlFor="status">{t("Status")}: </StyledLabel>
          <select name="status" onChange={handleChange} value={props.item.status} >
            <option value={true}>{t("In progress")}</option>
            <option value={false}>{t("Shipped")}</option>
          </select>
        </StyledFormRowDiv>
        <StyledFormRowDiv>{t("Order Details")}</StyledFormRowDiv>
        <StyledFormRowDiv>
          <CartHeader total={props.item.total} />
        </StyledFormRowDiv>
        <StyledFormRowDiv>
          <StyledUl>
            {Object.keys(props.item.cart).map((key, i) => (
              <CartItem key={key} index={key} qty={props.item.cart[key]} item={props.inventory.find(item => item.id===key)} />
            ))}
          </StyledUl>
        </StyledFormRowDiv>
      </StyledProcessingColDiv>
      <StyledButton onClick={() => props.updateOrder(props.index)} >{t("Update Order")}</StyledButton>
    </StyledDiv>
  );
}
