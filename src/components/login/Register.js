import React, { useRef }  from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { InvisibleActionButton, VisibleActionButton } from '../shared/index';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  padding: 4px;
  form {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    input, select {
      margin: 0.25rem;
      padding: 10px;
      font-size: 1rem;
    }
    input:focus, textarea:focus, select:focus {
      outline: 0;
      background: #fef2de;
    }
    button {
      border: 0;
    }
  }
`;

const StyledWarningDiv = styled.div`
  text-align: center;
  padding: 0vw 3vw;
  color: red;
  font-weight: 600;
`;

export default function Register(props) {
  const { t } = useTranslation();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const warningRef = useRef(null);

  const resetValidation = () => {
    nameRef.current.style.background = "#fff";
    emailRef.current.style.background = "#fff";
    passwordRef.current.style.background = "#fff";
    confirmPasswordRef.current.style.background = "#fff";
    warningRef.current.innerHTML = "";
  }

  const validateForm = () => {
    let passVal = true;
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      passwordRef.current.style.background = "#ffc2c2";
      confirmPasswordRef.current.style.background = "#ffc2c2";
      warningRef.current.innerHTML = t("Passwords do not match! Please try again.");
      passVal = false;
    }
    if (!nameRef.current.value) {
      nameRef.current.style.background = "#ffc2c2";
      warningRef.current.innerHTML = t("Please provide your name.");
      passVal = false;
    }
    // TODO Validate email address for format using a library
    // **  📧 📧 📧  **
    if (!emailRef.current.value) {
      emailRef.current.style.background = "#ffc2c2";
      warningRef.current.innerHTML = t("Please provide your email.");
      passVal = false;
    }
    return passVal;
  }

  const registerClick = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const user = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
      };
      props.registerUser(user);
      event.currentTarget.reset();
    }
  };

  const goBack = () => {
    props.history.push("/login");
  };

  return (
    <StyledWrapperDiv>
      <form onSubmit={registerClick}>
        <input name="name" ref={nameRef} type="text" placeholder={t("Name")} onFocus={resetValidation} />
        <input name="email" ref={emailRef} type="text" placeholder={t("Email")} onFocus={resetValidation} />
        <input name="password" ref={passwordRef} type="password" placeholder={t("Password")} onFocus={resetValidation} />
        <input name="confirmPassword" ref={confirmPasswordRef} type="password" placeholder={t("Confirm Password")} onFocus={resetValidation} />
        <VisibleActionButton type="submit" buttonLabel={t("Register")} />
      </form>
      <StyledWarningDiv ref={warningRef}></StyledWarningDiv>
      <InvisibleActionButton clickHandler={goBack} buttonLabel={t("Back to Log In")} />
    </StyledWrapperDiv>
  )
};
