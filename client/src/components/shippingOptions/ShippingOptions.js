import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { NoPermissionDiv } from '../shared/index';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  padding: 4px;
`;

export default function ShippingOptions(props) {
  const { t } = useTranslation();

  if (!props.isLoggedIn) {
    return <NoPermissionDiv divLabel={t("Please log in to view this page")}></NoPermissionDiv>
  }
  return (
    <StyledWrapperDiv>
      <AddItemForm addShippingOption={props.addShippingOption} />
      {Object.values(props.shippingOptions).map( (item, i) => 
        <EditItemForm 
          key={i} 
          index={i} 
          item={item} 
          shippingOptions={props.shippingOptions}
          setShippingOptions={props.setShippingOptions} 
          updateShippingOption={props.updateShippingOption}
        />)}
    </StyledWrapperDiv>
  );
}