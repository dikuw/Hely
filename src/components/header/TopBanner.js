import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';

const BannerDiv = styled.div`
  display: block;
  width: 100%;
  background-color: var(--vinoTinto);
  color:  var(--almostWhite);
  padding: 7px 10px;
  text-align: center;
`;

const ButtonDiv = styled.div`
  float: right;
`;

const LangButton = styled.button`
  font-size: 0.8rem;
  padding: 0.1rem;
  min-width: 52px;
  background-color: var(--almostWhite);
`;

export default function TopBanner(props) {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
 
  return (
    <BannerDiv>
      {t("Welcome")} {props.isLoggedIn ? props.name : t("guest")}!
      <ButtonDiv>
          <LangButton onClick={() => changeLanguage("es")}>{t("Spanish")}</LangButton>
          <LangButton onClick={() => changeLanguage("en")}>{t("English")}</LangButton>
      </ButtonDiv>
    </BannerDiv>
  )
}