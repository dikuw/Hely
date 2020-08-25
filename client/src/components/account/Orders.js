import React from 'react';
import { useTranslation } from "react-i18next";
import Order from './Order';
import styled from 'styled-components';

const StyledLoadingDiv = styled.div`
  text-align: center;
`;

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const StyledUl = styled.ul`
  width: 100%;
`;

export default function Orders(props) {
  const { t } = useTranslation();

  const userOrders = props.userOrders;

  if (!userOrders || userOrders===[]) {
    return (
      <StyledWrapperDiv>{t("No orders found")}.</StyledWrapperDiv>
    )
  };
  if (userOrders.length < 1 || props.inventory.length < 1) {
    return <StyledLoadingDiv>{t("Loading... please wait")}</StyledLoadingDiv>
  }
  return (
    <StyledWrapperDiv>
      <StyledUl>
        {userOrders.map((item, i) => (
          <Order key={item._id} index={item._id} order={item} inventory={props.inventory} />
        ))}
      </StyledUl>
    </StyledWrapperDiv>
  )
};
