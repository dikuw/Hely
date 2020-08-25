import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import EditItemForm from './EditItemForm';

const StyledLoadingDiv = styled.div`
  text-align: center;
`;

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  padding: 4px;
`;

const StyledNoPermissionsDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 30px auto;
  padding: 4px;
`;

export default function Orders(props) {
  const { t } = useTranslation();

  if (!props.isLoggedIn) {
    return <StyledNoPermissionsDiv>{t("Please log in to view this page")}.</StyledNoPermissionsDiv>
  }
  if (props.orders.length < 1 || props.inventory.length < 1) {
    return <StyledLoadingDiv>{t("Loading... please wait")}</StyledLoadingDiv>
  }
  if (props.orders) {
    return (
      <StyledWrapperDiv>
        {Object.values(props.orders).map( (item, i) => 
          <EditItemForm 
            key={i} 
            index={i} 
            item={item} 
            inventory={props.inventory} 
            updateOrder={props.updateOrder}
          />)}
      </StyledWrapperDiv>
    );
  }
}
