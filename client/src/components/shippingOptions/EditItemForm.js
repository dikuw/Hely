import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';

const StyledForm = styled.form`
  margin-bottom: 20px;
  border: 2px solid #000;
  overflow: hidden;
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  div, input, textarea, select {
    width: 20%;
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
  :disabled {
    color: var(--vinoTinto);
  }
`;

export default function EditItemForm(props) {
  const { t } = useTranslation();

  const[isDirty, setIsDirty] = useState(false);

  const idRef = useRef(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const availableRef = useRef(null);
  const durationRef = useRef(null);

  const resetValidation = () => {
    nameRef.current.placeholder = "Name";
    nameRef.current.style.background = "#fff";
    priceRef.current.placeholder = "Price";
    priceRef.current.style.background = "#fff";
    durationRef.current.placeholder = "Duration";
    durationRef.current.style.background = "#fff";
  }

  const handleChange = async (e) => {
    let updatedValue = e.currentTarget.value;
    let propName = e.currentTarget.name;

    if (updatedValue === "true" || updatedValue === "false") {	
      updatedValue = JSON.parse(updatedValue);	
    }	

    const updatedItem = {
      ...props.item,	
      [propName]: updatedValue
    };

    const shippingOptions = [ ...props.shippingOptions ];
    shippingOptions[props.index] = updatedItem;
    props.setShippingOptions(shippingOptions);

    setIsDirty(true);

  }

  const validateForm = () => {
    let passVal = true;
    if (!nameRef.current.value) {
      nameRef.current.placeholder = "Name is a required field";
      nameRef.current.style.background = "#ffc2c2";
      passVal = false;
    }
    if (!priceRef.current.value) {
      priceRef.current.placeholder = "Price is a required field";
      priceRef.current.style.background = "#ffc2c2";
      passVal = false;
    }
    if (!durationRef.current.value) {
      durationRef.current.placeholder = "Duration (days) is a required field";
      durationRef.current.style.background = "#ffc2c2";
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
        available: availableRef.current.value,
        duration: durationRef.current.value,
      };
      props.updateShippingOption(item);
      setIsDirty(false);
    }
  }

  return (
    <StyledForm onSubmit={formSubmit}>
      <input type="text" name="id" ref={idRef} value={props.item.id} readOnly />
      <input type="text" name="name" ref={nameRef} onChange={handleChange} onFocus={resetValidation} value={props.item.name} />
      <input type="text" name="price" ref={priceRef} onChange={handleChange} onFocus={resetValidation} value={props.item.price} />
      <select name="available" ref={availableRef} onChange={handleChange} value={props.item.available} >
      <option value={true}>{t("Show")}</option>
        <option value={false}>{t("Hide")}</option>
      </select>
      <input type="text" name="duration" ref={durationRef} onChange={handleChange} onFocus={resetValidation} value={props.item.duration} />
      <StyledButton type="submit" disabled={!isDirty} >{t("Update Item")}</StyledButton>
    </StyledForm>
  );
}