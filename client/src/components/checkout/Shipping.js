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
  margin: 0.25rem;
  padding: 0 25px;
  transition: background-color 300ms ease-out;
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

class CheckoutShipping extends React.Component {

  handleChange = async (e) => {
    //  TODO update this so it is not-hardcoded or at least validate prices on the server //
    //  💰 💰 💰 💰 💰 💰 💰💰 💰 💰 💰💰 💰 💰 💰💰 💰 💰 💰💰 💰 💰 💰💰 💰 💰 💰  //
    this.props.updateShipping({ method: e.currentTarget.value, price: e.currentTarget.getAttribute("data-price") });
  }
  
  handleClick = () => {
    this.props.history.push("/payment");
  };

  goBack = () => {
    this.props.history.push("/checkout");
  };

  render() {
    return (
      <StyledWrapperDiv>
        <div>Cart total: {formatPrice(this.props.cartTotal)}</div>
        <h4>Choose Shipping Method</h4>
        <StyledForm>
          <StyledGroupDiv>
            <input type="radio" id="USPS" name="shippingMethod" value="USPS" data-price="900" onChange={this.handleChange} checked={this.props.shipping.method === 'USPS' || !(this.props.shipping.method) } />
            <label htmlFor="USPS">USPS Priority Mail</label>
            <StyledDurationDiv>3 business days</StyledDurationDiv>
            <StyledPriceDiv>{formatPrice(900)}</StyledPriceDiv>
          </StyledGroupDiv>
          <StyledGroupDiv>
            <input type="radio" id="Fedex" name="shippingMethod" value="Fedex" data-price="1200" onChange={this.handleChange} checked={this.props.shipping.method === 'Fedex'} />
            <label htmlFor="Fedex">Fedex</label>
            <StyledDurationDiv>2 business days</StyledDurationDiv>
            <StyledPriceDiv>{formatPrice(1200)}</StyledPriceDiv>
          </StyledGroupDiv>
          <StyledGroupDiv>
            <input type="radio" id="UPS" name="shippingMethod" value="UPS" data-price="1299" onChange={this.handleChange} checked={this.props.shipping.method === 'UPS'} />
            <label htmlFor="UPS">UPS</label>
            <StyledDurationDiv>2 business days</StyledDurationDiv>
            <StyledPriceDiv>{formatPrice(1299)}</StyledPriceDiv>
          </StyledGroupDiv>
          <StyledCheckoutButton onClick={() => this.handleClick()}>Continue to Payment</StyledCheckoutButton>
          <StyledButtonInvisible onClick={() => this.goBack()}>Back to Information</StyledButtonInvisible>
        </StyledForm>

        
      </StyledWrapperDiv>
    )
  }
};

export default CheckoutShipping;