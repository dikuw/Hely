import React, { useState }  from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';
import LoadingPopup from './LoadingPopup';

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

export default function Inventory(props) {
  const { t } = useTranslation();
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  if (!props.isLoggedIn) {
    return <StyledNoPermissionsDiv>{t("Please log in to view this page")}.</StyledNoPermissionsDiv>
  }
  return (
    <StyledWrapperDiv>
      {uploadingPhoto ? <LoadingPopup /> : null}
      <AddItemForm addItem={props.addItem} uploadingPhoto={uploadingPhoto} setUploadingPhoto={setUploadingPhoto} />
      {Object.values(props.inventory).map( (item, i) => 
        <EditItemForm 
          key={i} 
          index={i} 
          item={item} 
          updateItem={props.updateItem}
          uploadingPhoto={uploadingPhoto}
          setUploadingPhoto={setUploadingPhoto}
        />)}
    </StyledWrapperDiv>
  );
}