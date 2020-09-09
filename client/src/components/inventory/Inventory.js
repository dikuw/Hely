import React, { useState }  from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { NoPermissionDiv } from '../shared/index';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';
import Popup from '../shared/Popup';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  padding: 4px;
`;

export default function Inventory(props) {
  const { t } = useTranslation();
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  if (!props.isLoggedIn) {
    return <NoPermissionDiv divLabel={t("Please log in to view this page")}></NoPermissionDiv>
  }
  return (
    <StyledWrapperDiv>
      {uploadingPhoto ? <Popup popupText="Uploading image..." /> : null}
      <AddItemForm addItem={props.addItem} uploadingPhoto={uploadingPhoto} setUploadingPhoto={setUploadingPhoto} />
      {Object.values(props.inventory).map( (item, i) => 
        <EditItemForm 
          key={i} 
          index={i} 
          item={item} 
          inventory={props.inventory}
          setInventory={props.setInventory}
          updateItem={props.updateItem}
          uploadingPhoto={uploadingPhoto}
          setUploadingPhoto={setUploadingPhoto}
        />)}
    </StyledWrapperDiv>
  );
}