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
`;

const StyledImageUploadDiv = styled.div`
  > input {
    display: none;
  }
`;

const StyledImageUploadImg = styled.img`
  max-width: 50px;
`;

class EditItemForm extends React.Component {
  handleChange = (e) => {
    let updatedValue = e.currentTarget.value;
    if (updatedValue === "true" || updatedValue === "false") {
        updatedValue = JSON.parse(updatedValue);
    }
    if (e.currentTarget.name === "image") {
      console.log('upload new pic bro');
      // const files = Array.from(e.target.files);
      // this.setState({ uploading: true });

      // const formData = new FormData();

      // files.forEach((file, i) => {
      //   formData.append(i, file)
      // });

      // fetch(`${API_URL}/image-upload`, {
      //   method: 'POST',
      //   body: formData
      // })
      // .then(res => res.json())
      // .then(images => {
      //   this.setState({ 
      //     uploading: false,
      //     images
      //   });
      // });
    };
    
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
        <StyledImageUploadDiv>
          <label htmlFor="file-input">
            <StyledImageUploadImg src={this.props.item.image} alt={this.props.item.image}/>
          </label>
          <input name="image" id="file-input" type="file" onChange={this.handleChange} />
        </StyledImageUploadDiv>
        <textarea name="description" onChange={this.handleChange} value={this.props.item.description} />
        <StyledButton onClick={() => this.props.deleteItem(this.props.index)} >Remove Item</StyledButton>
      </StyledDiv>
    );
  }
}

export default EditItemForm;