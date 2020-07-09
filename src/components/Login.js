import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapperDiv = styled.div`
  min-height: 500px;
  max-width: 1200px;
  display: flex;
  margin: 30px auto;
`;

const StyledButtonFB = styled.button`
  border: 0;
  display: block;
  margin-bottom: 2rem;
  width: 100%;
  color: #fff;
  padding: 2rem;
  background: #3864a3;
  :after {
    background: #2d5082;
  }
`;

const StyledButtonTW = styled.button`
  border: 0;
  display: block;
  margin-bottom: 2rem;
  width: 100%;
  color: #fff;
  padding: 2rem;
  background: #5EA9DD
  :after {
    background darken(#5EA9DD, 20%)
  }
`;

class Login extends React.Component {
  render() {
    return (
      <StyledWrapperDiv>
        <p>Sign in to view your account</p>
        <StyledButtonFB onClick={() => this.props.authenticate('Facebook')}>
          Log in with Facebook
        </StyledButtonFB>
        <StyledButtonTW onClick={() => this.props.authenticate('Twitter')}>
          Log in with Twitter
        </StyledButtonTW>
      </StyledWrapperDiv>
    )
  }
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;