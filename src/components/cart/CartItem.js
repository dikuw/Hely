import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';

const StyledGridFigure = styled.figure`
  display: flex;
  width: 100%;
  margin: 0 2rem;
  padding: 2rem;
  border: 1px solid lightgray;
  background: white;
  position: relative;
`;

const StyledGridPhotoWrapDiv = styled.div`
  position: relative;
`;

const StyledGridPhotoImg = styled.img`
  width: 4rem;
  margin-left: -2rem;
  margin-top: -2rem;
  max-width: none;
`;

class CartItem extends React.Component {
  render() {
    const { item, index } = this.props;
    console.log(item);
    const isAvailable = item.available;
    return (
      <StyledGridFigure>
        <StyledGridPhotoWrapDiv>
          <StyledGridPhotoImg src={item.image} alt={item.name} />
        </StyledGridPhotoWrapDiv>
        <figcaption>
          <p>{item.name}</p>
          <p>{formatPrice(item.price)}</p>
        </figcaption>
        <button disabled={!isAvailable} onClick={() => this.props.addToCart(index)}>{isAvailable ? 'Add to Cart' : 'Sold Out'}</button>
      </StyledGridFigure>
    );
  };
};

export default CartItem;
