import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';

const StyledPopupDiv = styled.div`
  display: flex;
  position: fixed;  
  width: 100%;  
  height: 100%;  
  top: 0;  
  left: 0;  
  right: 0;  
  bottom: 0;  
  margin: auto;  
  background-color: rgba(0,0,0, 0.5);  
  z-index: 76;
`;

const StyledPopupWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;  
  left: 25%;  
  right: 25%;  
  top: 25%;  
  padding: 12px 0px;
  margin: auto;   
  background: var(--almostWhite); 
  z-index: 77;
  max-width: 400px;
`;

const StyledPopupHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
`;

const StyledPopupHeaderH1 = styled.h1`
  font-size: 1em;
`;

const StyledButton = styled.button`
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: 400;
  font-style: normal;
  background: var(--vinoTinto);
  border-color: var(--vinoTinto);
  border-radius: 4px;
  border: 0;
  color: var(--almostWhite);
  display: inline-block;
  letter-spacing: 1px;
  margin: 0px 10px 10px 10px;
  padding: 5px 5px;
  transition: background-color 300ms ease-out;
  width: 75%;
`;

const StyledButtonInvisible = styled.button`
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: 400;
  font-style: normal;
  color: var(--vinoTinto);
  background: var(--almostWhite); 
  border: 0;
  display: inline-block;
  letter-spacing: 1px;
  margin: 0px 10px 10px 10px;
  padding: 5px 5px;
  width: 75%;
`;

export default function AddedPopup(props) {
  const { t } = useTranslation();

  const handleClick = () => {
    props.togglePopup();
    props.history.push("/cart");
  };

  return (
    <StyledPopupDiv >  
      <StyledPopupWrapperDiv>  
        <StyledPopupHeaderDiv>
          <StyledPopupHeaderH1>{t("Added to Cart!")}</StyledPopupHeaderH1>  
        </StyledPopupHeaderDiv>
        <StyledButton onClick={() => handleClick()}>{t("Go to Cart")}</StyledButton>
        <StyledButtonInvisible onClick={props.togglePopup}>{t("Keep Shopping")}</StyledButtonInvisible>
      </StyledPopupWrapperDiv>  
    </StyledPopupDiv>  
  ); 
};
