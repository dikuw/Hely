import React from 'react';
import CartHeader from './CartHeader';
import CartItem from './CartItem';
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


class EditItemForm extends React.Component {

  handleChange = async (e) => {
    let updatedValue = e.currentTarget.value;
    let propName = e.currentTarget.name;

    if (updatedValue === "true" || updatedValue === "false") {
        updatedValue = JSON.parse(updatedValue);
    }

    const updatedItem = {
        ...this.props.item,
        [propName]: updatedValue
    }

    this.props.updateItem(this.props.index, updatedItem);
  }

  render() {
    const cart = this.props.item.cart;
    const total = cart.reduce((prevTotal, item) => {
      const cartItem = this.props.inventory.filter(inventoryItem => inventoryItem._id===item._id)[0];
      const count = item.qty;
      if (cartItem) {
        return prevTotal + (count * cartItem.price);
      }
      return prevTotal;
    }, 0);
    return (
      <StyledDiv>
        <StyledOverviewColDiv>
          <StyledFormRowDiv>
              <StyledLabel htmlFor="id">Order ID: </StyledLabel>
              <input type="text" name="id" value={this.props.item.id} readOnly />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
              <StyledLabel htmlFor="email">Email: </StyledLabel>
              <input type="text" name="email" onChange={this.handleChange} value={this.props.item.email} />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
              <StyledLabel htmlFor="shippingName">Name: </StyledLabel>
              <input type="text" name="shippingName" onChange={this.handleChange} value={this.props.item.shippingName} />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
              <StyledLabel htmlFor="shippingAddressLine1">Address Line 1: </StyledLabel>
              <input type="text" name="shippingAddressLine1" onChange={this.handleChange} value={this.props.item.shippingAddressLine1} />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
              <StyledLabel htmlFor="shippingAddressLine2">Address Line 2: </StyledLabel>
              <input type="text" name="shippingAddressLine2" onChange={this.handleChange} value={this.props.item.shippingAddressLine2} />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
              <StyledLabel htmlFor="shippingAddressCity">City: </StyledLabel>
              <input type="text" name="shippingAddressCity" onChange={this.handleChange} value={this.props.item.shippingAddressCity} />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
              <StyledLabel htmlFor="shippingAddressState">State: </StyledLabel>
              <input type="text" name="shippingAddressState" onChange={this.handleChange} value={this.props.item.shippingAddressState} />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
              <StyledLabel htmlFor="shippingAddressZip">Zip Code: </StyledLabel>
              <input type="text" name="shippingAddressZip" onChange={this.handleChange} value={this.props.item.shippingAddressZip} />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
              <StyledLabel htmlFor="shippingAddressCountryCode">Country Code: </StyledLabel>
              <input type="text" name="shippingAddressCountryCode" onChange={this.handleChange} value={this.props.item.shippingAddressCountryCode} />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
              <StyledLabel htmlFor="shippingAddressCountry">Country: </StyledLabel>
              <input type="text" name="shippingAddressCountry" onChange={this.handleChange} value={this.props.item.shippingAddressCountry} />
          </StyledFormRowDiv>
        </StyledOverviewColDiv>
        <StyledProcessingColDiv>
          <StyledFormRowDiv>
            <StyledLabel htmlFor="paymentId">Payment ID: </StyledLabel>
            <input type="text" name="paymentId" value={this.props.item.paymentId} readOnly />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
            <StyledLabel htmlFor="orderDate">Order Date: </StyledLabel>
            <input type="text" name="orderDate" onChange={this.handleChange} value={this.props.item.orderDate} />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
            <StyledLabel htmlFor="status">Status: </StyledLabel>
            <select name="status" onChange={this.handleChange} value={this.props.item.status} >
              <option value={true}>In progress</option>
              <option value={false}>Shipped</option>
            </select>
          </StyledFormRowDiv>
          <StyledFormRowDiv>Order Details</StyledFormRowDiv>
          <StyledFormRowDiv>
            <CartHeader total={total} />
          </StyledFormRowDiv>
          <StyledFormRowDiv>
            <StyledUl>
              {cart.map((item, i) => (
                <CartItem key={item._id} qty={item.qty} item={this.props.inventory.filter(inventoryItem => inventoryItem._id===item._id)[0]} />
              ))}
            </StyledUl>
          </StyledFormRowDiv>
        </StyledProcessingColDiv>
        <StyledButton onClick={() => this.props.updateOrder(this.props.index)} >Update Order</StyledButton>
      </StyledDiv>
    );
  }
}

export default EditItemForm;