import React from 'react';
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

class Checkout extends React.Component {

  handleChange = async (e) => {
    let updatedValue = e.currentTarget.value;
    let propName = e.currentTarget.name;

    this.props.updateCustomer(propName, updatedValue);
  }
  
  handleClick = () => {
    this.props.history.push("/checkoutShipping");
  };

  render() {
    return (
      <StyledWrapperDiv>
        <div>Cart total: {formatPrice(this.props.cartTotal)}</div>
        <StyledNoteDiv>Shipping and taxes calculated in the next step</StyledNoteDiv>
        <div>Contact Information</div>
        <StyledForm>
          <input name="email" type="text" placeholder="Email" onChange={this.handleChange} value={this.props.customer.email} />
          <StyledGroupDiv>
            <input name="firstName" type="text" placeholder="First Name" onChange={this.handleChange} value={this.props.customer.firstName} />
            <input name="lastName" type="text" placeholder="Last Name" onChange={this.handleChange} value={this.props.customer.lastName} />
          </StyledGroupDiv>
          <input name="address1" type="text" placeholder="Address" onChange={this.handleChange} value={this.props.customer.address1} />
          <input name="address2" type="text" placeholder="Apartment, suite, etc. (if applicable)" onChange={this.handleChange} value={this.props.customer.address2} />
          <StyledGroupDiv>
            <input name="city" type="text" placeholder="City" onChange={this.handleChange} value={this.props.customer.city} />
            <select name="country" onChange={this.handleChange} value={this.props.customer.country} >
              <option value="colombia">Colombia</option>
              <option value="USA">USA</option>
              <option value="venezuela">Venezuela</option>
            </select>
            <input name="postalCode" type="text" placeholder="Postal Code" onChange={this.handleChange} value={this.props.customer.postalCode} />
          </StyledGroupDiv>
          <input name="mobile" type="text" placeholder="Mobile" onChange={this.handleChange} value={this.props.customer.mobile} />
          <StyledCheckoutButton onClick={() => this.handleClick()}>Continue to Shipping</StyledCheckoutButton>
        </StyledForm>
      </StyledWrapperDiv>
    )
  }
};

export default Checkout;