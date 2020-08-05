import React from 'react';
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

class Account extends React.Component {
  emailRef = React.createRef();
  passwordRef = React.createRef();
  warningRef = React.createRef();

  //  TODO this.props.user.id will be null on F5, leading to a 404 on the route
  componentDidMount = () => {
    this.props.getUserOrders(this.props.user.id);
  }

  resetValidation = () => {
    this.emailRef.current.style.background = "#fff";
    this.passwordRef.current.style.background = "#fff";
    this.warningRef.current.innerHTML = "";
    this.props.resetPasswordIncorrect();
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
    if (!this.nameRef.current.value) {
      this.nameRef.current.style.background = "#ffc2c2";
      this.warningRef.current.innerHTML = "Name is required.";
      passVal = false;
    }
    return passVal;
  }

  handleChange = () => {
    console.log('account form field changed');
  };

  updateClick = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const user = {
        name: this.nameRef.current.value,
        email: this.emailRef.current.value,
      };
      this.props.updateUser(user);
    }
  };
  
  render() {
    if (!this.props.isLoggedIn) {
      return <StyledNoPermissionsDiv>Please log in to view this page.</StyledNoPermissionsDiv>
    }
    return (
      <StyledWrapperDiv>
        <div>Update Your Account</div>
        <StyledForm onSubmit={this.updateClick}>
          <StyledFormRowDiv>
            <StyledLabel htmlFor="name">Name: </StyledLabel>
            <input name="name" ref={this.nameRef} type="text"  onChange={this.handleChange} onFocus={this.resetValidation} value={this.props.name}/>
          </StyledFormRowDiv>
          <StyledFormRowDiv>
            <StyledLabel htmlFor="email">Email: </StyledLabel>
            <input name="email" ref={this.emailRef} type="text"  onChange={this.handleChange} onFocus={this.resetValidation} value={this.props.email}/>
          </StyledFormRowDiv>
          <StyledButton type="submit" >Update</StyledButton>
        </StyledForm>
        <StyledWarningDiv ref={this.warningRef}></StyledWarningDiv>
        <div>Your Orders</div>
        <Orders userOrders={this.props.userOrders} />
      </StyledWrapperDiv>
    )
  }
};

export default Account;