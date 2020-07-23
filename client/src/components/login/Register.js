import React from 'react';
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

const StyledWarningDiv = styled.div`
  text-align: center;
  padding: 0vw 3vw;
  color: red;
  font-weight: 600;
`;

class Register extends React.Component {
  nameRef = React.createRef();
  emailRef = React.createRef();
  passwordRef = React.createRef();
  confirmPasswordRef = React.createRef();
  warningRef = React.createRef();

  resetValidation = () => {
    this.nameRef.current.style.background = "#fff";
    this.emailRef.current.style.background = "#fff";
    this.passwordRef.current.style.background = "#fff";
    this.confirmPasswordRef.current.style.background = "#fff";
    this.warningRef.current.innerHTML = "";
  }

  validateForm = () => {
    let passVal = true;
    if (this.passwordRef.current.value !== this.confirmPasswordRef.current.value) {
      this.passwordRef.current.style.background = "#ffc2c2";
      this.confirmPasswordRef.current.style.background = "#ffc2c2";
      this.warningRef.current.innerHTML = "Passwords do not match! Please try again.";
      passVal = false;
    }
    if (!this.nameRef.current.value) {
      this.nameRef.current.style.background = "#ffc2c2";
      this.warningRef.current.innerHTML = "Please provide your name.";
      passVal = false;
    }
    // TODO Validate email address for format using a library
    // **  📧 📧 📧  **
    if (!this.emailRef.current.value) {
      this.emailRef.current.style.background = "#ffc2c2";
      this.warningRef.current.innerHTML = "Please provide your email.";
      passVal = false;
    }
    return passVal;
  }

  registerClick = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const user = {
        name: this.nameRef.current.value,
        email: this.emailRef.current.value,
        password: this.passwordRef.current.value,
        confirmPassword: this.confirmPasswordRef.current.value,
      };
      this.props.registerUser(user);
      event.currentTarget.reset();
    }
  };

  render() {
    return (
      <StyledWrapperDiv>
        <StyledForm onSubmit={this.registerClick}>
          <input name="name" ref={this.nameRef} type="text" placeholder="Name" onFocus={this.resetValidation} />
          <input name="email" ref={this.emailRef} type="text" placeholder="Email" onFocus={this.resetValidation} />
          <input name="password" ref={this.passwordRef} type="password" placeholder="Password" onFocus={this.resetValidation} />
          <input name="confirmPassword" ref={this.confirmPasswordRef} type="password" placeholder="Confirm Password" onFocus={this.resetValidation} />
          <StyledButton type="submit" >Register</StyledButton>
        </StyledForm>
        <StyledWarningDiv ref={this.warningRef}></StyledWarningDiv>
      </StyledWrapperDiv>
    )
  }
};

export default Register;