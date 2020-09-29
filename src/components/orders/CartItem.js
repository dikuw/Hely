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
  img {
    width: 3vw;
    object-fit: contain;
    @media (max-width: 768px) {
      width: 60px;
    }
  }
  .item {
    @media (max-width: 768px) {
      font-size: 0.8em;
    }
  }
  .name {
    text-align: center;
  }
`;

export default function CartItem(props) {
  const { t } = useTranslation();
  const { item, qty } = props;
  
  return (
    <StyledGridWrapperDiv>
      <div className="item">
        <img src={`https://res.cloudinary.com/dikuw/image/upload/${item.image}`}  alt={item.name} />
      </div>
      <div className="item">
        <div className="name">{item.name}</div>
      </div>
      <div className="item">
        <div className="name">{qty} @ {formatPrice(item.price)} {t("each")}</div>
      </div>
    </StyledGridWrapperDiv>
  );
};
