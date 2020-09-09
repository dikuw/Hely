import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapperDiv = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    position: relative;
  }
`;

const StyledLinkWrapperDiv = styled.div`
  display: flex;
  position: absolute;
  top: -10px;
  left: -26px;
`;

const StyledCountDiv = styled.div`
  text-indent: 0.5em;
  color: black;
  text-decoraction: none;
`;

export default function CartIcon(props) {
  return (
    <StyledWrapperDiv>
      <StyledLinkWrapperDiv>
        <Link to="/cart" style={{width: '24px'}}>
          <img src="images/cart.svg" alt="Cart Icon" />
        </Link>
        <StyledCountDiv>({props.getCartItemCount()})</StyledCountDiv>
      </StyledLinkWrapperDiv>     
    </StyledWrapperDiv>
  );
}