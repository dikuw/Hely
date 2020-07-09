import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';

const StyledGridFigure = styled.figure`
  flex-basis: calc(33.333% - 4rem);
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0 2rem 2rem 2rem;
  padding: 2rem;
  border: 1px solid lightgray;
  background: white;
  box-shadow: 0 0 0 5px rgba(0,0,0,0.03);
  position: relative;
`;

const StyledGridPhotoWrapDiv = styled.div`
  position: relative;
`;

const StyledGridPhotoImg = styled.img`
  width: calc(100% + 4rem);
  margin-left: -2rem;
  margin-top: -2rem;
  max-width: none;
`;

class Card extends React.Component {
  render() {
    const { item, index } = this.props;
    const isAvailable = item.available;
    return (
      <StyledGridFigure>
        <StyledGridPhotoWrapDiv>
          <StyledGridPhotoImg src={item.image} alt={item.name} />
        </StyledGridPhotoWrapDiv>
        <figcaption>
          <p>{item.description}</p>
          <p>{formatPrice(item.price)}</p>
        </figcaption>
        <button disabled={!isAvailable} onClick={() => this.props.addToCart(index)}>{isAvailable ? 'Add to Cart' : 'Sold Out'}</button>
      </StyledGridFigure>
    );
  };
};

export default Card;
