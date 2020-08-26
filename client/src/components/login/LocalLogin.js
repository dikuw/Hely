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
        <VisibleActionButton type="submit" clickHandler={() => null} buttonLabel={t("Log in")} />
      </StyledForm>
      <StyledWarningDiv ref={warningRef}></StyledWarningDiv>
      {props.passwordIncorrect ? (<StyledWarningDiv>{t("Email or password is incorrect. Please try again")}</StyledWarningDiv>) : ( "" )}
      <div>{t("Forgot your password")}?</div>
      <StyledForm onSubmit={forgotClick}>
        <input name="forgotEmail" ref={forgotEmailRef} type="text" placeholder={t("Email")}  />
        <VisibleActionButton type="submit" clickHandler={() => null} buttonLabel={t("Send a Reset")} />
      </StyledForm>
      <StyledForm>
        <InvisibleActionButton clickHandler={registerClick} buttonLabel={t("No account? Register here!")} />
      </StyledForm>
    </StyledWrapperDiv>
  )
};