import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  flex-flow: row wrap;
  padding: 30px 30px 0px 30px;
  color: #272727;
  background-color: #ffd7d7;
  border-top: 1px solid #ffe6e6;
  font-size: 0.8rem;
  ul {
    list-style: none;
    padding-left: 0;
  }
  a {
    color: #272727;
    :hover {
      text-decoration: none;
    }
  }
`;

const StyledContactDiv = styled.div`
  margin-right: 1.25em;
  margin-bottom: 2em;
  flex:  1 100%;
  @media (min-width: 40.375em) {
    flex: 1 0px;
  }
`;

const StyledContacth1 = styled.h1`
  font-family: 'Pacifico', cursive;
  font-weight: 400;
  font-size: 1.5rem;
`;

const StyledContacth2 = styled.h2`
  margin-top: 1.3em;
  font-size: 15px;
  font-weight: 400;
`;

const StyledNavh2 = styled.h2`
  font-weight: 400;
  font-size: 15px;
  flex: 1 50%;
  margin-right: 1.25em;
`;

const StyledLegal = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: #999;
  flex:  1 100%;
  @media (min-width: 40.375em) {
    margin-left: auto;
  }
`;

const StyledNavUl = styled.ul`
  display: flex;
	flex-flow: row wrap;
  flex:  1 100%;
  @media (min-width: 40.375em) {
    flex: 2 0px;
  }
`;

const StyledNavLi = styled.li`
  flex: 1 50%;
  margin-right: 1.25em;
  @media (min-width: 40.375em) {
    flex: 2 0px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter >
      <StyledContactDiv >
        <StyledContacth1 >Hely Cosmetics</StyledContacth1>        
        <StyledContacth2>Email</StyledContacth2>    
        <div>
          <a rel="noopener noreferrer" href="mailto:info@helycosmetics.com" target="_blank">info@helycosmetics.com</a>
        </div>
        <StyledContacth2>Phone</StyledContacth2>    
        <div>
          <a rel="noopener noreferrer" href="https://api.whatsapp.com/send?div=5804148025111" target="_blank">+58 414-8025111</a>
        </div>  
        <StyledContacth2>Socials</StyledContacth2>  
        <div>
          <a rel="noopener noreferrer" href="https://www.instagram.com/helycosmetics/" target="_blank">Instagram</a>
        </div>
      </StyledContactDiv>
      <StyledNavUl>
        <StyledNavLi>
          <StyledNavh2>Information</StyledNavh2>
          <ul>
            <li>
              <Link to='/shipping'>Shipping</Link>
            </li>
            <li>
              <Link to='/returns'>Returns</Link>
            </li>
          </ul>
        </StyledNavLi>
        <StyledNavLi>
          <StyledNavh2>Legal</StyledNavh2>
          <ul>
            <li>
              <Link to='/privacy'>Privacy Policy</Link>
            </li>
            <li>
              <Link to='/terms'>Terms of Use</Link>
            </li>
          </ul>
        </StyledNavLi>
      </StyledNavUl>
      <StyledLegal>
        <p>&copy; 2020 Hely Cosmetics</p>
        <p>Created by<a rel="noopener noreferrer" href="http://www.dikuw.com/" target="_blank"> dikuw</a></p>
      </StyledLegal>
    </StyledFooter>
  );
};

export default Footer;