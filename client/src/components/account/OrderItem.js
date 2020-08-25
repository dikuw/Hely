import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';

const StyledGridWrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0px;
  padding: 0.5rem;
  border: 1px solid darkgray;
  background: white;
  position: relative;
`;

const StyledItemDiv = styled.div`
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

const StyledGridPhotoImg = styled.img`
  width: 3vw;
  @media (max-width: 768px) {
    width: 60px;
  }
`;

const StyledGridNameDiv = styled.div`
  text-align: center;
`;

export default function OrderItem(props) {
  const { t } = useTranslation();

  const { item, qty } = props;
  return (
    <StyledGridWrapperDiv>
      <StyledItemDiv>
        <StyledGridPhotoImg src={`https://res.cloudinary.com/dikuw/image/upload/${item.image}`}  alt={item.name} />
      </StyledItemDiv>
      <StyledItemDiv>
        <StyledGridNameDiv>{item.name}</StyledGridNameDiv>
      </StyledItemDiv>
      <StyledItemDiv>
        <StyledGridNameDiv>{qty} @ {formatPrice(item.price)} {t("each")}</StyledGridNameDiv>
      </StyledItemDiv>
    </StyledGridWrapperDiv>
  );
};