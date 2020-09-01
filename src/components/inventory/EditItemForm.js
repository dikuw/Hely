import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
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
    border-radius: 0;
    background: #fff;
  }
  input:focus, textarea:focus, select:focus {
    outline: 0;
    background: #fef2de;
  }
  textarea {
    width: 66.6%;
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

const StyledImageUploadDiv = styled.div`
  > input {
    display: none;
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


export default function EditItemForm(props) {
  const { t } = useTranslation();

  const[isDirty, setIsDirty] = useState(false);

  const idRef = useRef(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef= useRef(null);
  const statusRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);
  const showRef = useRef(null);

  const resetValidation = () => {
    nameRef.current.placeholder = "Name";
    nameRef.current.style.background = "#fff";
    descriptionRef.current.placeholder = "Description";
    descriptionRef.current.style.background = "#fff";
    priceRef.current.placeholder = "Price";
    priceRef.current.style.background = "#fff";
  }

  const handleChange = async (e) => {
    let propName = e.currentTarget.name;

    if (propName === "image") {
      props.setUploadingPhoto(true);
      const formData = new FormData(); 
      formData.append('file', e.target.files[0]);
      const res = await apis.postImage(formData);
      e.currentTarget.value = `${res.data.fileName}`;
      props.setUploadingPhoto(false);
    };

    setIsDirty(true);

  }

  const validateForm = () => {
    let passVal = true;
    if (!nameRef.current.value) {
      nameRef.current.placeholder = "Name is a required field";
      nameRef.current.style.background = "#ffc2c2";
      passVal = false;
    }
    if (!descriptionRef.current.value) {
      descriptionRef.current.placeholder = "Description is a required field";
      descriptionRef.current.style.background = "#ffc2c2";
      passVal = false;
    }
    if (!priceRef.current.value) {
      priceRef.current.placeholder = "Price is a required field";
      priceRef.current.style.background = "#ffc2c2";
      passVal = false;
    }
    return passVal;
  }

  const formSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const item = {
        id: idRef.current.value,
        name: nameRef.current.value,
        price: parseFloat(priceRef.current.value),
        category: categoryRef.current.value,
        status: statusRef.current.value,
        image: imageRef.current.getAttribute('data-path'),
        description: descriptionRef.current.value,
        show: showRef.current.value,
      };
      props.updateItem(item);
    }
  }

  return (
    <StyledForm onSubmit={formSubmit}>
      <input type="text" name="id" ref={idRef} value={props.item.id} readOnly />
      <input type="text" name="name" ref={nameRef} onChange={handleChange} onFocus={resetValidation} value={props.item.name} />
      <input type="text" name="price" ref={priceRef} onChange={handleChange} onFocus={resetValidation} value={props.item.price} />
      <select name="category" ref={categoryRef} onChange={handleChange} value={props.item.category} >
        <option value="face">{t("Face")}</option>
        <option value="eyes">{t("Eyes")}</option>
        <option value="brushes">{t("Brushes")}</option>
      </select>
      <select name="available" ref={statusRef} onChange={handleChange} value={props.item.available} >
      <option value={true}>{t("Available")}</option>
        <option value={false}>{t("Not Available")}</option>
      </select>
      <StyledImageUploadDiv>
        <label key={props.index} htmlFor={`file-input${props.index}`}>
          <StyledImageUploadImg src={`https://res.cloudinary.com/dikuw/image/upload/${props.item.image}`} alt={props.item.image}/>
        </label>
        <input name="image" id={`file-input${props.index}`} type="file" accept="image/png, image/jpeg" ref={imageRef} onChange={handleChange} />
      </StyledImageUploadDiv>
      <textarea name="description" ref={descriptionRef} onChange={handleChange} onFocus={resetValidation} value={props.item.description} />
      <select name="show" ref={showRef} onChange={handleChange} value={props.item.show}>
        <option value={true}>{t("Show Item")}</option>
        <option value={false}>{t("Hide Item")}</option>
      </select> 
      <StyledButton type="submit" disabled={!isDirty} >{t("Update Item")}</StyledButton>
    </StyledForm>
  );
}