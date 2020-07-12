import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto;
`;

const StyledButtonFB = styled.button`
  border: 0;
  display: block;
  margin-bottom: 2rem;
  border-radius: 4px;
  width: 50%;
  color: var(--almostWhite);
  padding: 2rem;
  background: #3864a3;
  :after {
    background: #2d5082;
  }
`;

const StyledButtonIG = styled.button`
  border: 0;
  display: block;
  margin-bottom: 2rem;
  border-radius: 4px;
  width: 50%;
  color: var(--almostWhite);
  padding: 2rem;
  background: #f09433; 
  background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
  background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
  :after {
    background darken(#5EA9DD, 20%)
  }
`;

const StyledButtonTW = styled.button`
  border: 0;
  display: block;
  margin-bottom: 2rem;
  border-radius: 4px;
  width: 50%;
  color: var(--almostWhite);
  padding: 2rem;
  background: #1DA1F2;
  :after {
    background darken(#5EA9DD, 20%)
  }
`;

const StyledButtonEmail = styled.button`
  border: 0;
  display: block;
  margin-bottom: 2rem;
  border-radius: 4px;
  width: 50%;
  color: var(--almostWhite);
  padding: 2rem;
  background: #657786;
  :after {
    background darken(#5EA9DD, 20%)
  }
`;


class Login extends React.Component {
  render() {
    return (
      <StyledWrapperDiv>
        <StyledButtonFB onClick={() => this.props.authenticate('facebook')}>
          Log in with Facebook
        </StyledButtonFB>
        <StyledButtonIG onClick={() => this.props.authenticate('instagram')}>
          Log in with Instagram
        </StyledButtonIG>
        <StyledButtonTW onClick={() => this.props.authenticate('twitter')}>
          Log in with Twitter
        </StyledButtonTW>
        <StyledButtonEmail onClick={() => this.props.authenticate('email')}>
          Login or Register with email
        </StyledButtonEmail>
      </StyledWrapperDiv>
    )
  }
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;