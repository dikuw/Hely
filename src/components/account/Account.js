import React, { useRef } from 'react';
import { useTranslation } from "react-i18next";
import Orders from './Orders';
import styled from 'styled-components';

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
    flex-basis: 100%;
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

const StyledFormRowDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1vw;
`;

const StyledLabel = styled.label`
  flex-basis: 10%;
  @media (max-width: 768px) {
    flex-basis: 20%;
  }
`;

const StyledButton = styled.button`
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
  width: auto;
`;

const StyledWarningDiv = styled.div`
  text-align: center;
  padding: 0vw 3vw;
  color: red;
  font-weight: 600;
`;

const StyledNoPermissionsDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 30px auto;
  padding: 4px;
`;

export default function Account(props) {
  const { t } = useTranslation();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const warningRef = useRef(null);

  const resetValidation = () => {
    emailRef.current.style.background = "#fff";
    passwordRef.current.style.background = "#fff";
    warningRef.current.innerHTML = "";
    props.resetPasswordIncorrect();
  }

  const validateForm = () => {
    let passVal = true;
    // TODO Validate email address for format using a library
    // **  📧 📧 📧  **
    if (!emailRef.current.value) {
      emailRef.current.style.background = "#ffc2c2";
      warningRef.current.innerHTML = "Email is required.";
      passVal = false;
    }
    if (!nameRef.current.value) {
      nameRef.current.style.background = "#ffc2c2";
      warningRef.current.innerHTML = "Name is required.";
      passVal = false;
    }
    return passVal;
  }

  const handleChange = () => {
    console.log('account form field changed');
  };

  const updateClick = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const user = {
        name: nameRef.current.value,
        email: emailRef.current.value,
      };
      props.updateUser(user);
    }
  };
  
  if (!props.isLoggedIn) {
    return <StyledNoPermissionsDiv>{t("Please log in to view this page")}.</StyledNoPermissionsDiv>
  }
  return (
    <StyledWrapperDiv>
      <div>{t("Update Your Account")}</div>
      <StyledForm onSubmit={updateClick}>
        <StyledFormRowDiv>
          <StyledLabel htmlFor="name">{t("Name")}: </StyledLabel>
          <input name="name" ref={nameRef} type="text"  onChange={handleChange} onFocus={resetValidation} value={props.user.name}/>
        </StyledFormRowDiv>
        <StyledFormRowDiv>
          <StyledLabel htmlFor="email">{t("Email")}: </StyledLabel>
          <input name="email" ref={emailRef} type="text"  onChange={handleChange} onFocus={resetValidation} value={props.user.email}/>
        </StyledFormRowDiv>
        <StyledButton type="submit" >{t("Update")}</StyledButton>
      </StyledForm>
      <StyledWarningDiv ref={warningRef}></StyledWarningDiv>
      <div>{t("Your Orders")}</div>
      <Orders userOrders={props.userOrders} inventory={props.inventory} />
    </StyledWrapperDiv>
  )
};
