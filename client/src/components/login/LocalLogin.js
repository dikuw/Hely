import React, { useRef }  from 'react';
import { useTranslation } from "react-i18next";
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

const StyledButtonInvisible = styled.button`
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: 400;
  font-style: normal;
  color: var(--vinoTinto);
  background: white; 
  border: 0;
  display: inline-block;
  letter-spacing: 1px;
  margin-top: 0.5rem;
  padding: 5px 5px;
  width: 100%;
`;

const StyledWarningDiv = styled.div`
  text-align: center;
  padding: 0vw 3vw;
  color: red;
  font-weight: 600;
`;

export default function LocalLogin(props) {
  const { t } = useTranslation();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const forgotEmailRef = useRef(null);
  const warningRef = useRef(null);

  const resetValidation = () => {
    emailRef.current.style.background = "#fff";
    passwordRef.current.style.background = "#fff";
    forgotEmailRef.current.style.background = "#fff";
    warningRef.current.innerHTML = "";
    props.resetPasswordIncorrect();
  }

  const validateForm = () => {
    let passVal = true;
    // TODO Validate email address for format using a library
    // **  📧 📧 📧  **
    if (!emailRef.current.value) {
      emailRef.current.style.background = "#ffc2c2";
      warningRef.current.innerHTML = t("Email is required");
      passVal = false;
    }
    if (!passwordRef.current.value) {
      passwordRef.current.style.background = "#ffc2c2";
      warningRef.current.innerHTML = t("Password is required");
      passVal = false;
    }
    return passVal;
  }

  const loginClick = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const user = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      props.loginUser(user);
      event.currentTarget.reset();
    }
  };
  
  const forgotClick = (event) => {
    event.preventDefault();
    //  TODO validate forgot password form
    const user = {
      email: forgotEmailRef.current.value,
    };
    props.forgotUser(user);
    event.currentTarget.reset();
  };

  const registerClick = () => {
    props.history.push("/register");
  };

  return (
    <StyledWrapperDiv>
      <div>{t("Log in")}</div>
      <StyledForm onSubmit={loginClick}>
        <input name="email" ref={emailRef} type="text" placeholder={t("Email")} onFocus={resetValidation} />
        <input name="password" ref={passwordRef} type="password" placeholder={t("Password")} onFocus={resetValidation} />
        <StyledButton type="submit" >{t("Log in")}</StyledButton>
      </StyledForm>
      <StyledWarningDiv ref={warningRef}></StyledWarningDiv>
      {props.passwordIncorrect ? (<StyledWarningDiv>{t("Email or password is incorrect. Please try again")}</StyledWarningDiv>) : ( "" )}
      <div>{t("Forgot your password")}?</div>
      <StyledForm onSubmit={forgotClick}>
        <input name="forgotEmail" ref={forgotEmailRef} type="text" placeholder={t("Email")}  />
        <StyledButton type="submit" >{t("Send a Reset")}</StyledButton>
      </StyledForm>
      <StyledForm>
        <StyledButtonInvisible onClick={() => registerClick()}>{t("No account? Register here!")}</StyledButtonInvisible>
      </StyledForm>
    </StyledWrapperDiv>
  )
};