import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';
import { VisibleActionButton } from '../shared/index';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledSubTotalDiv = styled.div`
  text-align: right;
  padding-right: 20px;
  font-weight: 600;
  @media (max-width: 768px) {
    padding-right: 8wv;
  }
`;

const StyledNoteDiv = styled.div`
  text-align: right;
  padding-right: 20px;
  margin-bottom: 4px;
  font-size: 0.8em;
  @media (max-width: 768px) {
    padding-right: 8wv;
  }
`;

export default function CartFooter(props) {
  const { t } = useTranslation();

  const handleClick = () => {
    props.history.push("/checkout");
  };

  return (
    <StyledWrapperDiv>
      <StyledSubTotalDiv>{t("Subtotal")}: {formatPrice(props.total)}</StyledSubTotalDiv>
      <StyledNoteDiv>{t("Shipping calculated at checkout")}</StyledNoteDiv>
      <VisibleActionButton  clickHandler={handleClick} buttonLabel={t("Checkout")} />
    </StyledWrapperDiv>
  )
};