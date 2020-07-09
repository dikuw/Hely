import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
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

class AddItemForm extends React.Component {
  idRef = React.createRef();
  nameRef = React.createRef();
  priceRef = React.createRef();
  categoryRef= React.createRef();
  statusRef = React.createRef();
  imageRef = React.createRef();
  descriptionRef = React.createRef();

  createItem = (event) => {
    event.preventDefault();
    const item = {
      id: this.idRef.current.value,
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      category: this.categoryRef.current.value,
      status: this.statusRef.current.value,
      image: this.imageRef.current.value,
      description: this.descriptionRef.current.value,
    };
    this.props.addItem(item);
    event.currentTarget.reset();
  };

  render() {
    return (
      <StyledForm onSubmit={this.createItem}>
        <input name="name" ref={this.idRef} type="text" placeholder="ID" defaultValue={Date.now()}/>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input name="price" ref={this.priceRef} type="text" placeholder="Price" />
        <select name="category" ref={this.categoryRef} >
          <option value="face">Face</option>
          <option value="eyes">Eyes</option>
          <option value="brushes">Brushes</option>
        </select>
        <select name="status" ref={this.statusRef} >
          <option value={true}>Available</option>
          <option value={false}>Not Available</option>
        </select>
        <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
        <textarea name="description" ref={this.descriptionRef} />
        <StyledButton type="submit">+ Add Item</StyledButton>
      </StyledForm>
    );
  }
}

export default AddItemForm;