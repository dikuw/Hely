import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../../helpers.js';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledSubTotalDiv = styled.div`
  text-align: right;
  padding-right: 20px;
  font-weight: 600;
  @media (max-width: 768px) {
    padding-right: 8wv;
  }
`;

class CartHeader extends React.Component {

  render() {
    return (
      <StyledWrapperDiv>
        <StyledSubTotalDiv>Subtotal: {formatPrice(this.props.total)}</StyledSubTotalDiv>
      </StyledWrapperDiv>
    )
  }
};

export default CartHeader;