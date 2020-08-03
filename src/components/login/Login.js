import React from 'react';
import styled from 'styled-components';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  align-items: center;
  margin: 30px auto;
`;

const StyledButton = styled.button`
  font-family: Helvetica,sans-serif;
  text-transform: uppercase;
  border: 0;
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: var(--almostWhite);
  padding: calc(.34435vw + 13.38843px) calc(.34435vw + 18.38843px);
`;

const styleIG = {
  background: '#f09433 -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)-webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%) linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
  filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#f09433", endColorstr="#bc1888",GradientType=1 )',
};

class Login extends React.Component {

  localLoginClick = () => {
    this.props.history.push("/localLogin");
  };
  
  render() {

    return (
      <StyledWrapperDiv>
        <StyledButton style={{background: '#4267B2'}} onClick={() => this.props.authenticate('facebook')}>
          Login with Facebook
        </StyledButton>
        <StyledButton style={styleIG} onClick={() => this.props.authenticate('instagram')}>
          Login with Instagram
        </StyledButton>
        <StyledButton style={{background: '#1DA1F2'}} onClick={() => this.props.authenticate('twitter')}>
          Login with Twitter
        </StyledButton>
        <StyledButton style={{background: '#657786'}} onClick={() => this.localLoginClick()}>
          Login or Register with email
        </StyledButton>
      </StyledWrapperDiv>
    )
  }
};

export default Login;