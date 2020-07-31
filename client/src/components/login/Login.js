import React from 'react';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto;
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

  localLoginClick = () => {
    this.props.history.push("/localLogin");
  };
  
  render() {
    const responseFacebook = (response) => {
      console.log(response);
      if (response) {
        this.props.login(response)
      }
      // response looks like:
      // {
      // accessToken: "EAA2iy3QLWFgBAJMmPEu1ROgsERXRYEEuTDhB7emM6MSJXfCaCJOT3ETSyOFrmMTgOsbhvsu04GzAxXL56ZCZBRxAysz4jBiZC15ZB79yg2Yo8MY0U7MYzY7QATJEqRLhFBaOEyjFNvksUjaJwY8IjC0fp8E0MU67ALSexxvXD7UuK86AZCFK0BPlNYh6pMq6MZAPMjsW59uQZDZD"
      // data_access_expiration_time: 1602578639
      // email: "mvasilevsky@hotmail.com"
      // expiresIn: 4561
      // graphDomain: "facebook"
      // id: "2848541341940485"
      // name: "Michael Vasilevsky"
      // signedRequest: "UYwJ_1yKevpV0Ua1gLiui7mLjRWa0l5ACqvnQb8HoZc.eyJ1c2VyX2lkIjoiMjg0ODU0MTM0MTk0MDQ4NSIsImNvZGUiOiJBUURvY2gyVVNEb1NaR2ItSFd2TE5RNzgzV3hlY2JJUjVFa3Rra0pHTXAxU3pYZ2NnZXNDQTlOeTN4a3pTSWNXM2E5c1k2THFFVXg0eFpFMmtvSzVZOFZhUUMxbGFURHhqQk4tX0tRQXk2eG1PWUxNTE5zWEJ3RUxtZVlMUzhjWE92NzBYRjJ2SFdFbUx4V1doSnJnaW1tcThJTnN4ekN4a09BZUdJTmZRMEJYZUEwcFB1MVkzdmFOTmVTcDEzb1pqeDNfSDBMYXZjMExjUHJodkVZR0lidDR5THI3S0hfSVR2d29NQ1FkYWluUk9FZmh1QmljSkdxSWFVS2R3YnE4Wm91c3VmaG5aZGVzOGc4V0R3aGNQeFVvR2RocFFPZ1ZOa1FZeFRGVUZlaE5qM0hvbWIyODJ5M2NFb2p2aTVJMlBDQjVIX0pTb2IyZG1reHV4NjRSbXp2dSIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNTk0ODAyNjM5fQ"
      // userID: "2848541341940485"
      // }
    }

    const componentClicked = () => {
      console.log('clicked');
    }
    
    return (
      <StyledWrapperDiv>
        <FacebookLogin
          appId="3838169406199896"
          fields="name,email"
          onClick={componentClicked}
          callback={responseFacebook} 
        />
        <StyledButtonIG onClick={() => this.props.authenticate('instagram')}>
          Log in with Instagram
        </StyledButtonIG>
        <StyledButtonTW onClick={() => this.props.authenticate('twitter')}>
          Log in with Twitter
        </StyledButtonTW>
        <StyledButtonEmail onClick={() => this.localLoginClick()}>
          Login or Register with email
        </StyledButtonEmail>
      </StyledWrapperDiv>
    )
  }
};

export default Login;