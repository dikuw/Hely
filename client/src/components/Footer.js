import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  flex-flow: row wrap;
  padding: 30px 30px 0px 30px;
  color: var(--almostWhite);
  background-color: var(--vinoTinto);
  border-top: 1px solid var(--vinoTinto);
  font-size: 0.8rem;
  ul {
    list-style: none;
    padding-left: 0;
  }
  a {
    color: var(--almostWhite);
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

const StyledDiv = styled.div`
  display: flex;
`;

const StyledNavh2 = styled.h2`
  font-weight: 600;
  font-size: 15px;
  flex: 1 50%;
  margin-right: 1.25em;
  margin-top: 1.3em;
`;

const StyledLegal = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: #999;
  flex:  1 100%;
  a {
    color: #999999;
  }
  @media (min-width: 40.375em) {
    margin-left: auto;
  }
`;

const StyledIGDiv = styled.div`
  display: flex;
  font-size: 1rem;
  height: 20px;
  justify-content: center;
  align-items: center;
  background: url('images/instagram.svg') center no-repeat;
  background-size: contain;
  padding: 0 1rem;
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

export default function Footer(props) {
  const { t } = useTranslation();

  return (
    <StyledFooter >
      <StyledContactDiv >
        <StyledContacth1 >Hely Cosmetics</StyledContacth1>        
        <StyledContacth2>{t("Email")}</StyledContacth2>    
        <StyledDiv>
          <a rel="noopener noreferrer" href="mailto:info@helycosmetics.com" target="_blank">info@helycosmetics.com</a>
        </StyledDiv>
        <StyledContacth2>{t("Phone")}</StyledContacth2>    
        <StyledDiv>
          <a rel="noopener noreferrer" href="https://api.whatsapp.com/send?div=5804148025111" target="_blank">+58 414-8025111</a>
        </StyledDiv>  
        <StyledContacth2>{t("Socials")}</StyledContacth2>  
        <StyledDiv>
          <a rel="noopener noreferrer" href="https://www.instagram.com/helycosmetics/" target="_blank"><StyledIGDiv></StyledIGDiv> </a>
        </StyledDiv>
      </StyledContactDiv>
      <StyledNavUl>
        <StyledNavLi>
          <StyledNavh2>{t("Information")}</StyledNavh2>
          <ul>
            <li><Link to="/shipping">{t("Shipping")}</Link></li>
            <li><Link to="/returns">{t("Returns")}</Link></li>
          </ul>
        </StyledNavLi>
        <StyledNavLi>
          <StyledNavh2>{t("Legal")}</StyledNavh2>
          <ul>
            <li><Link to="/privacy">{t("Privacy Policy")}</Link></li>
            <li><Link to="/terms">{t("Terms of Use")}</Link></li>
          </ul>
        </StyledNavLi>
      </StyledNavUl>
      <StyledLegal>
        <p>&copy; 2020 Hely Cosmetics</p>
        <p>{t("Created by")}<a rel="noopener noreferrer" href="http://www.dikuw.com/" target="_blank"> dikuw</a></p>
      </StyledLegal>
    </StyledFooter>
  );
};