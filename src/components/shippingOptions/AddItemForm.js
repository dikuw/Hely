import React, { useRef }  from 'react';
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
`;

export default function AddItemForm(props) {
  const { t } = useTranslation();

  const idRef = useRef(null);
  const nameRef = useRef(null);
  const availableRef = useRef(null);
  const priceRef = useRef(null);
  const durationRef = useRef(null);

  const resetValidation = () => {
    nameRef.current.placeholder = "Name";
    nameRef.current.style.background = "#fff";
    priceRef.current.placeholder = "Price";
    priceRef.current.style.background = "#fff";
    durationRef.current.placeholder = "Duration";
    durationRef.current.style.background = "#fff";
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
        available: availableRef.current.value,
        price: parseFloat(priceRef.current.value),
        duration: durationRef.current.value,
      };
      props.addShippingOption(item);
      event.currentTarget.reset();
    }
  }

  return (
    <StyledForm onSubmit={formSubmit}>
      <input name="id" ref={idRef} type="text" placeholder={t("ID")} defaultValue={Date.now()} />
      <input name="name" ref={nameRef} type="text" placeholder={t("Name")} onFocus={resetValidation} />
      <input name="price" ref={priceRef} type="text" placeholder={t("Price")} onFocus={resetValidation} />
      <select name="available" ref={availableRef} >
        <option value={true}>{t("Show")}</option>
        <option value={false}>{t("Hide")}</option>
      </select> 
      <input name="duration" ref={durationRef} type="text" placeholder={t("Duration")} onFocus={resetValidation} />
      <StyledButton type="submit">+ {t("Add Shipping Option")}</StyledButton>
    </StyledForm>
  );
}