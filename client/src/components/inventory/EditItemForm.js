import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  text-transform: uppercase;
  font-weight: 400;
  font-style: normal;
  background: #ec419f;
  border-color: #ebebeb;
  border-radius: 2px;
  border: 0;
  color: #ffffff;
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
`;

class EditItemForm extends React.Component {
  handleChange = (e) => {
    let updatedValue = e.currentTarget.value;
    if (updatedValue === "true" || updatedValue === "false") {
        updatedValue = JSON.parse(updatedValue);
    }
    const updatedItem = {
        ...this.props.item,
        [e.currentTarget.name]: updatedValue
    }
    this.props.updateItem(this.props.index, updatedItem);
}

  render() {
    return (
      <StyledDiv>
        <div>{this.props.item.id}</div>
        <input type="text" name="name" onChange={this.handleChange} value={this.props.item.name} />
        <input type="text" name="price" onChange={this.handleChange} value={this.props.item.price} />
        <select name="category" onChange={this.handleChange} value={this.props.item.category} >
          <option value="face">Face</option>
          <option value="eyes">Eyes</option>
          <option value="brushes">Brushes</option>
        </select>
        <select name="available" onChange={this.handleChange} value={this.props.item.available} >
          <option value={true}>Available</option>
          <option value={false}>Not Available</option>
        </select>
        <input type="text" name="image" onChange={this.handleChange} value={this.props.item.image}/>
        <textarea name="description" onChange={this.handleChange} value={this.props.item.description} />
        <StyledButton onClick={() => this.props.deleteItem(this.props.index)} >Remove Item</StyledButton>
      </StyledDiv>
    );
  }
}

export default EditItemForm;