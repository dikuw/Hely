import React from 'react';
import { useTranslation } from "react-i18next";
import OrderItem from './OrderItem';
import styled from 'styled-components';
import { format } from 'date-fns'
import { formatPrice } from '../../helpers.js';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
`;

const StyledGridWrapperDiv = styled.div`
  width: 100%;
  margin: 1vw 0 0 0;
  padding: 0.5rem;
  border: 1px solid darkgray;
  border-radius: 4px 0 0 0;
  background: #f5f5f5;
`;

const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const StyledSubHeaderDiv = styled.div`
  text-transform: uppercase;
  font-size: 0.8em;
  @media (max-width: 768px) {
    margin-right: 0.25em;
    font-size: 0.9em;
  }
`;

const StyledValueDiv = styled.div`
  font-size: 0.9em;
`;

const StyledUl = styled.ul`
  width: 100%;
`;

export default function Orders(props) {
  const { t } = useTranslation();

  return (
    <StyledWrapperDiv>
      <StyledGridWrapperDiv>
        <StyledHeaderDiv>
          <StyledDiv>
            <StyledSubHeaderDiv>{t("Order placed")}:</StyledSubHeaderDiv>
            <StyledValueDiv>{format(new Date(props.order.orderDate), 'MMMM dd, yyyy')}</StyledValueDiv>
          </StyledDiv>
          <StyledDiv>
            <StyledSubHeaderDiv>{t("Total")}:</StyledSubHeaderDiv>
            <StyledValueDiv>{formatPrice(props.order.total)}</StyledValueDiv>
          </StyledDiv>
          <StyledDiv>
            <StyledSubHeaderDiv>{t("Ship to")}:</StyledSubHeaderDiv>
            <StyledValueDiv>{props.order.customer.firstName + " " + props.order.customer.lastName}</StyledValueDiv>
          </StyledDiv>
          <StyledDiv>
            <StyledSubHeaderDiv>{t("Status")}:</StyledSubHeaderDiv>
            <StyledValueDiv>{props.order.status}</StyledValueDiv>
          </StyledDiv>
          <StyledDiv>
            <StyledSubHeaderDiv>{t("Order #")}:</StyledSubHeaderDiv>
            <StyledValueDiv>{props.order._id}</StyledValueDiv>
          </StyledDiv>
        </StyledHeaderDiv>
      </StyledGridWrapperDiv>
      <StyledUl>
        {props.order.cart.map((cartItem) => (
          <OrderItem key={cartItem.item._id} index={cartItem.item._id} qty={cartItem.qty} item={cartItem.item} />
        ))}
      </StyledUl>
    </StyledWrapperDiv>
  )
};