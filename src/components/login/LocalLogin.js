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

class LocalLogin extends React.Component {
  emailRef = React.createRef();
  passwordRef = React.createRef();
  forgotPasswordRef = React.createRef();
  warningRef = React.createRef();

  resetValidation = () => {
    this.emailRef.current.style.background = "#fff";
    this.passwordRef.current.style.background = "#fff";
    this.forgotEmailRef.current.style.background = "#fff";
    this.warningRef.current.innerHTML = "";
  }

  validateForm = () => {
    let passVal = true;
    // TODO Validate email address for format using a library
    // **  📧 📧 📧  **
    if (!this.emailRef.current.value) {
      this.emailRef.current.style.background = "#ffc2c2";
      this.warningRef.current.innerHTML = "Email is required.";
      passVal = false;
    }
    if (!this.passwordRef.current.value) {
      this.passwordRef.current.style.background = "#ffc2c2";
      this.warningRef.current.innerHTML = "Password is required.";
      passVal = false;
    }
    return passVal;
  }

  loginClick = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const user = {
        email: this.emailRef.current.value,
        password: this.passwordRef.current.value,
      };
      this.props.loginUser(user);
      event.currentTarget.reset();
    }
  };
  
  forgotClick = (event) => {
    event.preventDefault();
    //  TODO validate forgot password form
    const user = {
      email: this.forgotEmailRef.current.value,
    };
    this.props.forgotUser(user);
    event.currentTarget.reset();
  };

  registerClick = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <StyledWrapperDiv>
        <div>Login</div>
        <StyledForm onSubmit={this.loginClick}>
          <input name="email" ref={this.emailRef} type="text" placeholder="Email" />
          <input name="password" ref={this.passwordRef} type="password" placeholder="Password" />
          <StyledButton type="submit" >Log in</StyledButton>
        </StyledForm>
        <StyledWarningDiv ref={this.warningRef}></StyledWarningDiv>
        <div>Forgot your password?</div>
        <StyledForm onSubmit={this.forgotClick}>
          <input name="forgotEmail" ref={this.forgotEmailRef} type="text" placeholder="Email"  />
          <StyledButton type="submit" >Send a Reset</StyledButton>
        </StyledForm>
        <StyledForm>
          <StyledButtonInvisible onClick={() => this.registerClick()}>No account? Register here!</StyledButtonInvisible>
        </StyledForm>
      </StyledWrapperDiv>
    )
  }
};

export default LocalLogin;