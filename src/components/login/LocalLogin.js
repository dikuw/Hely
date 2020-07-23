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

const StyledGroupDiv = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  input {
    width: 50%;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    input {
      width: auto;
    }
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

class LocalLogin extends React.Component {

  handleChange = async (e) => {
    let updatedValue = e.currentTarget.value;
    let propName = e.currentTarget.name;

    this.props.updateCustomer(propName, updatedValue);
  }
  
  loginClick = () => {
    this.props.history.push("/ogin");
  };

  forgotClick = () => {
    this.props.history.push("/reset");
  };

  registerClick = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <StyledWrapperDiv>
        <div>Login</div>
        <StyledForm>
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <StyledButton onClick={() => this.loginClick()}>Log in</StyledButton>
        </StyledForm>
        <div>Forgot your password?</div>
        <StyledForm>
          <input name="email" type="text" placeholder="Email"  />
          <StyledButton onClick={() => this.forgotClick()}>Send a Reset</StyledButton>
        </StyledForm>
        <StyledForm>
          <StyledButtonInvisible onClick={() => this.registerClick()}>No account? Register here!</StyledButtonInvisible>
        </StyledForm>
      </StyledWrapperDiv>
    )
  }
};

export default LocalLogin;