import React from 'react';
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

`;

const StyledGridPhotoImg = styled.img`
  width: 3vw;
  @media (max-width: 768px) {
    width: 60px;
  }
`;

const StyledGridNameDiv = styled.div`
  width: 10vw;
`;


const StyledGridPriceDiv = styled.div`
  width: 4vw;
`;

class OrderItem extends React.Component {
  render() {
    const { item, qty } = this.props;
    const total = formatPrice(qty * item.price);
    return (
      <StyledGridWrapperDiv>
        <StyledItemDiv>
          <StyledGridPhotoImg src={`https://res.cloudinary.com/dikuw/image/upload/${item.image}`}  alt={item.name} />
        </StyledItemDiv>
        <StyledItemDiv>
          <StyledGridNameDiv>{item.name}</StyledGridNameDiv>
        </StyledItemDiv>
        <StyledItemDiv>
          <StyledGridNameDiv>{qty} at {formatPrice(item.price)} each</StyledGridNameDiv>
        </StyledItemDiv>
        <StyledItemDiv>
          <StyledGridPriceDiv>{total}</StyledGridPriceDiv>
        </StyledItemDiv>
      </StyledGridWrapperDiv>
    );
  };
};

export default OrderItem;
