import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapperDiv = styled.div`
  position: relative;
`;

const SytledLinkWrapperDiv = styled.div`
  position: absolute;
  top: -10px;
`;

const StyledCartIconDiv = styled.div`
  display: flex;
  font-size: 1rem;
  height: 20px;
  background: url('images/cart.svg') center no-repeat;
  background-size: contain;
  padding: 0 1rem;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
     align-items: center;
  }
`;

const CartIcon = () => {
  return (
    <StyledWrapperDiv>
      <SytledLinkWrapperDiv><Link to="/cart"><StyledCartIconDiv></StyledCartIconDiv></Link></SytledLinkWrapperDiv>     
    </StyledWrapperDiv>
  );
};

export default CartIcon;