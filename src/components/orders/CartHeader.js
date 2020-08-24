import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';

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

export default function EditItemForm(props) {
  const { t } = useTranslation();

  return (
    <StyledWrapperDiv>
      <StyledSubTotalDiv>{t("Total")}: {formatPrice(props.total)}</StyledSubTotalDiv>
    </StyledWrapperDiv>
  )
};