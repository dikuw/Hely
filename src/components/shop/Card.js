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
  background: var(--almostWhite);
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
  margin-bottom: 1rem;
  max-width: none;
`;

const StyledAddToCartWrapperDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledAddToCartButton = styled.button`
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 400;
  font-style: normal;
  background: var(--vinoTinto);
  border-color: var(--vinoTinto);
  border-radius: 2px;
  border: 0;
  color: var(--almostWhite);
  display: inline-block;
  height: 45px;
  letter-spacing: 1px;
  line-height: 45px;
  margin: 0;
  padding: 0 25px;
  transition: background-color 300ms ease-out;
  width: auto;
`;

class Card extends React.Component {

  handleClick = (key) => {
    this.props.addToCart(key);
    this.props.togglePopup();
  };

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
        <StyledAddToCartWrapperDiv>
          <StyledAddToCartButton disabled={!isAvailable} onClick={() => this.handleClick(index)}>{isAvailable ? 'Add to Cart' : 'Sold Out'}</StyledAddToCartButton>
        </StyledAddToCartWrapperDiv>
      </StyledGridFigure>
    );
  };
};

export default Card;