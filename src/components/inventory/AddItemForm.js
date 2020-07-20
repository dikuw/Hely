import React from 'react';
import apis from '../../api/index';
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

const StyledImageUploadDiv = styled.div`
  > input {
    border: none;
  }
`;

const StyledImageUploadImg = styled.img`
  max-width: 50px;
`;

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

class AddItemForm extends React.Component {
  idRef = React.createRef();
  nameRef = React.createRef();
  priceRef = React.createRef();
  categoryRef= React.createRef();
  statusRef = React.createRef();
  imageRef = React.createRef();
  descriptionRef = React.createRef();

  resetValidation = () => {
    this.nameRef.current.placeholder = "Name";
    this.nameRef.current.style.background = "#fff";
    this.descriptionRef.current.placeholder = "Description";
    this.descriptionRef.current.style.background = "#fff";
    this.priceRef.current.placeholder = "Price";
    this.priceRef.current.style.background = "#fff";
  }

  validateForm = () => {
    let passVal = true;
    if (!this.nameRef.current.value) {
      this.nameRef.current.placeholder = "Name is a required field";
      this.nameRef.current.style.background = "#ffc2c2";
      passVal = false;
    }
    if (!this.descriptionRef.current.value) {
      this.descriptionRef.current.placeholder = "Description is a required field";
      this.descriptionRef.current.style.background = "#ffc2c2";
      passVal = false;
    }
    if (!this.priceRef.current.value) {
      this.priceRef.current.placeholder = "Price is a required field";
      this.priceRef.current.style.background = "#ffc2c2";
      passVal = false;
    }
    return passVal;
  }

  formSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const item = {
        id: this.idRef.current.value,
        name: this.nameRef.current.value,
        price: parseFloat(this.priceRef.current.value),
        category: this.categoryRef.current.value,
        status: this.statusRef.current.value,
        image: this.imageRef.current.getAttribute('data-path'),
        description: this.descriptionRef.current.value,
        show: true
      };
      this.props.addItem(item);
      event.currentTarget.reset();
    }
  }

  handleChange = async (event) => {
    // event.preventDefault();
    // event.stopPropagation();

    this.props.togglePopup();
    const formData = new FormData(); 

    formData.append('file', event.target.files[0]);

    // const res = await axios.post('http://localhost:8000/api/uploadImage', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });

    const res = await apis.postImage(formData);

    this.imageRef.current.setAttribute('data-path', `${res.data.fileName}`);
    this.props.togglePopup();
  }

  render() {
    return (
      <StyledForm onSubmit={this.formSubmit}>
        <input name="name" ref={this.idRef} type="text" placeholder="ID" defaultValue={Date.now()} />
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" onFocus={this.resetValidation} />
        <input name="price" ref={this.priceRef} type="text" placeholder="Price" onFocus={this.resetValidation} />
        <select name="category" ref={this.categoryRef} >
          <option value="face">Face</option>
          <option value="eyes">Eyes</option>
          <option value="brushes">Brushes</option>
        </select>
        <select name="status" ref={this.statusRef} >
          <option value={true}>Available</option>
          <option value={false}>Not Available</option>
        </select>
        <StyledImageUploadDiv>
          <label htmlFor='file-input'>
            <StyledImageUploadImg />
          </label>
          <input name="image" id='file-input' type="file" accept="image/png, image/jpeg" data-path="" ref={this.imageRef} onChange={this.handleChange} />
        </StyledImageUploadDiv>
        <textarea name="description" ref={this.descriptionRef} placeholder="Please enter a description" onFocus={this.resetValidation} />
        <StyledButton type="submit">+ Add Item</StyledButton>
      </StyledForm>
    );
  }
}

export default AddItemForm;