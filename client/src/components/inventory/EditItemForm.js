import React from 'react';
import { useTranslation } from "react-i18next";
import apis from '../../api/index';
import styled from 'styled-components';

const StyledButton = styled.button`
  text-transform: uppercase;
  font-weight: 400;
  font-style: normal;
  background: var(--vinoTinto);
  border-color: var(--vinoTinto);
  border-radius: 2px;
  border: 0;
  color: var(--almostWhite);
  display: inline-block;
  letter-spacing: 1px;
  margin: 0;
  padding: 0 25px;
  transition: background-color 300ms ease-out;
  width: auto;
`;

const StyledDiv = styled.div`
  margin-bottom: 20px;
  border: 2px solid #000;
  overflow: hidden;
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  div, input, textarea, select {
    width: 33.33%;
    padding: 10px;
    line-height: 1;
    font-size: 1rem;
    border: 0;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    -webkit-appearance: none;
      -moz-appearance: none;
            appearance: none;
    border-radius: 0;
    background: #fff;
  }
  input:focus, textarea:focus, select:focus {
    outline: 0;
    background: #fef2de;
  }
  textarea {
    width: 100%;
  }
  button {
    width: 100%;
    border: 0;
  }
  @media (max-width: 768px) {
    div, input, textarea, select {
      width: 100%;
    }
  }
`;

const StyledImageUploadDiv = styled.div`
  > input {
    display: none;
  }
`;

const StyledImageUploadImg = styled.img`
  max-width: 50px;
`;

export default function EditItemForm(props) {
  const { t } = useTranslation();

  const handleChange = async (e) => {
    let updatedValue = e.currentTarget.value;
    let propName = e.currentTarget.name;

    if (updatedValue === "true" || updatedValue === "false") {
        updatedValue = JSON.parse(updatedValue);
    }

    if (propName === "image") {
      props.togglePopup();
      const formData = new FormData(); 
      formData.append('file', e.target.files[0]);
      const res = await apis.postImage(formData);
      updatedValue = `${res.data.fileName}`;
      props.togglePopup();
    };

    const updatedItem = {
        ...props.item,
        [propName]: updatedValue
    }

    props.updateItem(props.index, updatedItem);
  }

  return (
    <StyledDiv>
      <input type="text" name="id" value={props.item.id} readOnly />
      <input type="text" name="name" onChange={handleChange} value={props.item.name} />
      <input type="text" name="price" onChange={handleChange} value={props.item.price} />
      <select name="category" onChange={handleChange} value={props.item.category} >
        <option value="face">{t("Face")}</option>
        <option value="eyes">{t("Eyes")}</option>
        <option value="brushes">{t("Brushes")}</option>
      </select>
      <select name="available" onChange={handleChange} value={props.item.available} >
      <option value={true}>{t("Available")}</option>
        <option value={false}>{t("Not Available")}</option>
      </select>
      <StyledImageUploadDiv>
        <label key={props.index} htmlFor={`file-input${props.index}`}>
          <StyledImageUploadImg src={`https://res.cloudinary.com/dikuw/image/upload/${props.item.image}`} alt={props.item.image}/>
        </label>
        <input name="image" id={`file-input${props.index}`} type="file" accept="image/png, image/jpeg" onChange={handleChange} />
      </StyledImageUploadDiv>
      <textarea name="description" onChange={handleChange} value={props.item.description} />
      <StyledButton onClick={() => props.deleteItem(props.index)} >{t("Remove Item")}</StyledButton>
    </StyledDiv>
  );
}