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
  border: 1px solid lightgray;
  background: white;
  position: relative;
`;

const StyledItemDiv = styled.div`

`;

const StyledGridPhotoImg = styled.img`
  width: 140px;
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const StyledGridNameDiv = styled.div`
  width: 10vw;
`;

const StyledItemQuanityGroupDiv = styled.div`
  flex-grow: 1;
  display: flex;
`;

const StyledGridPriceDiv = styled.div`
  width: 4vw;
`;

const StyledQuantityDiv = styled.div`
 border: 1px solid rgba(0,0,0,0.3);
 padding: 8px 12px;
 font-size: 0.8em;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  width: 20px;
  color: var(--rosaVieja);
`;

export default function CartItem(props) {
  const { t } = useTranslation();

  const { item } = props;

  const isAvailable = props.inventory.find(inventoryItem => inventoryItem.id===item.id).available;

  const total = formatPrice(props.qty * item.price );

  if (!isAvailable) {
    return (
      <StyledGridWrapperDiv>
        <StyledItemDiv>
          <StyledGridPhotoImg src={`https://res.cloudinary.com/dikuw/image/upload/${item.image}`} alt={item.name} />
        </StyledItemDiv>
        <StyledItemDiv>{t("Sorry")} <em>{isAvailable ? item.name : t("this")}</em> {t("is no longer available")}.</StyledItemDiv>
        <StyledItemDiv>
          <StyledButton onClick={() => props.deleteFromCart(item)}>&times;</StyledButton>
        </StyledItemDiv>
      </StyledGridWrapperDiv>
    )
  }
  return (
    <StyledGridWrapperDiv>
      <StyledItemDiv>
        <StyledGridPhotoImg src={`https://res.cloudinary.com/dikuw/image/upload/${item.image}`}  alt={item.name} />
      </StyledItemDiv>
      <StyledItemDiv>
        <StyledGridNameDiv>{item.name}</StyledGridNameDiv>
      </StyledItemDiv>
      <StyledItemDiv>
        <StyledItemQuanityGroupDiv>
          <StyledButton onClick={() => props.removeFromCart(item)}>-</StyledButton>
          <StyledQuantityDiv>
            {props.qty}
          </StyledQuantityDiv>
          <StyledButton onClick={() => props.addToCart(item)}>+</StyledButton>
        </StyledItemQuanityGroupDiv>
      </StyledItemDiv>
      <StyledItemDiv>
        <StyledGridPriceDiv>{total}</StyledGridPriceDiv>
      </StyledItemDiv>
      <StyledItemDiv>
        <StyledButton onClick={() => props.deleteFromCart(item)}>&times;</StyledButton>
      </StyledItemDiv>
    </StyledGridWrapperDiv>
  );
};
