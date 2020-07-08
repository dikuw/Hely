import React from 'react';
import styled from 'styled-components';

const StyledBannerDiv = styled.div`
  width: 100%;
  color: #272727;
  background-color: #ffd7d7;
  text-transform: uppercase;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
`;

const StyledWrapperDiv = styled.div`
  min-height: 500px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  padding: 0px 10px;
`;

const StyledHeaderDiv = styled.div`
  text-align: center;
  font-size: 0.8em;
  p {
    text-align: left;
  }
`;

class Privacy extends React.Component {
  render() {
    return (
      <React.Fragment>
        <StyledBannerDiv>Privacy Policy</StyledBannerDiv>
        <StyledWrapperDiv>
          <StyledHeaderDiv>
            Privacy Notice
            <p>This privacy notice discloses the privacy practices for this site. This privacy notice applies solely to information collected by this website. It will notify you of the following:</p>
            <p>1. What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</p>
            <p>2. What choices are available to you regarding the use of your data.</p>
            <p>3. The security procedures in place to protect the misuse of your information.</p>
            <p>4. How you can correct any inaccuracies in the information.</p>
            <p>5. Information Collection, Use, and Sharing</p>
            <p></p>
            <p>
              We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to
              anyone.
            </p>
            <p>
              We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of O/our organization, other than as necessary to fulfill your request, e.g. to
              ship an order.
            </p>
            <p>Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.</p>
          </StyledHeaderDiv>
          <StyledHeaderDiv>
            Your Access to and Control Over Information
            <p>You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on O/our website:</p>
            <p>1. See what data We have about you, if any.</p>
            <p>2. Change/correct any data We have about you.</p>
            <p>3. Have us delete any data We have about you.</p>
            <p>4. Express any concern you have about O/our use of your data.</p>
          </StyledHeaderDiv>
          <StyledHeaderDiv>
            Security
            <p>We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.</p>
            <p>
              Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a lock icon in the address bar and looking for "https"
              at the beginning of the address of the Web page.
            </p>
            <p>
              While we use encryption to protect sensitive information transmitted online, We also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service)
              are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.
            </p>
            <p>If you feel that we are not abiding by this privacy policy, you should contact us immediately at info@helycosmetics.com.</p>
          </StyledHeaderDiv>
        </StyledWrapperDiv>
      </React.Fragment>
    )
  }
};

export default Privacy;