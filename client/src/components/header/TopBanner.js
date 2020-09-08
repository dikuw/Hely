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

const SelectDiv = styled.div`
  float: right;
  font-size: 0.8rem;
`;

const StyledSelect = styled.select`
  background-color: var(--vinoTinto);
  color:  var(--almostWhite);
`;

export default function TopBanner(props) {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };
 
  return (
    <BannerDiv>
      {t("Welcome")} {props.isLoggedIn ? props.name : t("guest")}!
      <SelectDiv>
        <StyledSelect name="language" onChange={handleChange} value={i18n.language}>
          <option value="es">{t("Spanish")}</option>
          <option value="en-US">{t("English")}</option>
        </StyledSelect>
      </SelectDiv>
    </BannerDiv>
  )
}