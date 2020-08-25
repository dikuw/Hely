import React, { useState, useEffect }  from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';
import LoadingPopup from './LoadingPopup';
import apis from '../../api/index';

const StyledWrapperDiv = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  padding: 4px;
`;

const StyledButton = styled.button`
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

  useEffect(() => {
    return async () => {
      console.log('props.inventory', props.inventory);
      if (props.inventory.length > 0) await apis.putInventory({ ...props.inventory });
    }
  }, []);

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