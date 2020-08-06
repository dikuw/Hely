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

class CartItem extends React.Component {
  render() {
    const { item, index } = this.props;
    const isAvailable = item.available;
    const total = formatPrice(this.props.qty * item.price );
    if (!isAvailable) {
      return (
        <StyledGridWrapperDiv>
          <StyledItemDiv>
            <StyledGridPhotoImg src={`https://res.cloudinary.com/dikuw/image/upload/${item.image}`} alt={item.name} />
          </StyledItemDiv>
          <StyledItemDiv>Sorry <em>{item ? item.name : 'this'}</em> is no longer available.</StyledItemDiv>
          <StyledItemDiv>
            <StyledButton onClick={() => this.props.deleteFromCart(index)}>&times;</StyledButton>
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
            <StyledButton onClick={() => this.props.removeFromCart(index)}>-</StyledButton>
            <StyledQuantityDiv>
              {this.props.qty}
            </StyledQuantityDiv>
            <StyledButton onClick={() => this.props.addToCart(index)}>+</StyledButton>
          </StyledItemQuanityGroupDiv>
        </StyledItemDiv>
        <StyledItemDiv>
          <StyledGridPriceDiv>{total}</StyledGridPriceDiv>
        </StyledItemDiv>
        <StyledItemDiv>
          <StyledButton onClick={() => this.props.deleteFromCart(index)}>&times;</StyledButton>
        </StyledItemDiv>
      </StyledGridWrapperDiv>
    );
  };
};

export default CartItem;
