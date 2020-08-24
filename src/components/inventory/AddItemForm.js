import React, { useRef }  from 'react';
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

export default function AddItemForm(props) {
  const { t } = useTranslation();

  const idRef = useRef(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef= useRef(null);
  const statusRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);

  const resetValidation = () => {
    nameRef.current.placeholder = "Name";
    nameRef.current.style.background = "#fff";
    descriptionRef.current.placeholder = "Description";
    descriptionRef.current.style.background = "#fff";
    priceRef.current.placeholder = "Price";
    priceRef.current.style.background = "#fff";
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
        show: true
      };
      props.addItem(item);
      event.currentTarget.reset();
    }
  }

  const handleChange = async (event) => {
    props.setUploadingPhoto(true);
    const formData = new FormData(); 

    formData.append('file', event.target.files[0]);

    const res = await apis.postImage(formData);

    imageRef.current.setAttribute('data-path', `${res.data.fileName}`);
    props.setUploadingPhoto(false);
  }

  return (
    <StyledForm onSubmit={formSubmit}>
      <input name="name" ref={idRef} type="text" placeholder={t("ID")} defaultValue={Date.now()} />
      <input name="name" ref={nameRef} type="text" placeholder={t("Name")} onFocus={resetValidation} />
      <input name="price" ref={priceRef} type="text" placeholder={t("Price")} onFocus={resetValidation} />
      <select name="category" ref={categoryRef} >
        <option value="face">{t("Face")}</option>
        <option value="eyes">{t("Eyes")}</option>
        <option value="brushes">{t("Brushes")}</option>
      </select>
      <select name="status" ref={statusRef} >
        <option value={true}>{t("Available")}</option>
        <option value={false}>{t("Not Available")}</option>
      </select> 
      <StyledImageUploadDiv>
        <label htmlFor='file-input'>
          <StyledImageUploadImg />
        </label>
        <input name="image" id='file-input' type="file" accept="image/png, image/jpeg" data-path="" ref={imageRef} onChange={handleChange} />
      </StyledImageUploadDiv>
      <textarea name="description" ref={descriptionRef} placeholder={t("Please enter a description")} onFocus={resetValidation} />
      <StyledButton type="submit">+ {t("Add Item")}</StyledButton>
    </StyledForm>
  );
}