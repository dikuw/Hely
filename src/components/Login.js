import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBannerDiv = styled.div`
  width: 100%;
  color: #272727;
  background-color: #ffd7d7;
  text-transform: uppercase;
  font-weight: 600;
  padding: 5px 20px;
`;

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
      <React.Fragment>
        <StyledBannerDiv>Log In</StyledBannerDiv>
        <StyledWrapperDiv>
          <p>Sign in to view your account</p>
          <StyledButtonFB onClick={() => this.props.authenticate('Facebook')}>
            Log in with Facebook
          </StyledButtonFB>
          <StyledButtonTW onClick={() => this.props.authenticate('Twitter')}>
            Log in with Twitter
          </StyledButtonTW>
        </StyledWrapperDiv>
      </React.Fragment>
    )
  }
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;