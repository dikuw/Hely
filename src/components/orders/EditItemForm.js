import React from 'react';
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
  border: 2px solid #000;
  overflow: hidden;
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  div, input, textarea, select {
    width: 33.33%;
    padding: 10px;
    line-height: 1;
    font-size: 1rem;
    border: 0;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
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
    div, input, textarea, select {
      width: 100%;
    }
  }
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
    return (
      <StyledDiv>
        <input type="text" name="id" value={this.props.item.id} readOnly />
        <input type="text" name="email" onChange={this.handleChange} value={this.props.item.email} />
        <input type="text" name="shippingName" onChange={this.handleChange} value={this.props.item.shippingName} />
        <input type="text" name="shippingAddressCountry" onChange={this.handleChange} value={this.props.item.shippingAddressCountry} />
        <input type="text" name="shippingAddressCountryCode" onChange={this.handleChange} value={this.props.item.shippingAddressCountryCode} />
        <input type="text" name="shippingAddressZip" onChange={this.handleChange} value={this.props.item.shippingAddressZip} />
        <input type="text" name="shippingAddressLine1" onChange={this.handleChange} value={this.props.item.shippingAddressLine1} />
        <input type="text" name="shippingAddressLine2" onChange={this.handleChange} value={this.props.item.shippingAddressLine2} />
        <input type="text" name="shippingAddressCity" onChange={this.handleChange} value={this.props.item.shippingAddressCity} />
        <input type="text" name="shippingAddressState" onChange={this.handleChange} value={this.props.item.shippingAddressState} />
        <input type="text" name="paymentId" value={this.props.item.paymentId} readOnly />
        <input type="text" name="orderDate" onChange={this.handleChange} value={this.props.item.orderDate} />
        <select name="status" onChange={this.handleChange} value={this.props.item.status} >
          <option value={true}>In progress</option>
          <option value={false}>Shipped</option>
        </select>
        <StyledButton onClick={() => this.props.deleteItem(this.props.index)} >Remove Order</StyledButton>
      </StyledDiv>
    );
  }
}

export default EditItemForm;