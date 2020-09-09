import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { InvisibleActionButton } from '../shared/index';

const StyledDiv = styled.div`
  margin-bottom: 12px;
`;

export default function Admin(props) {
  const { t } = useTranslation();

  const goBack = () => {
    props.history.push("/");
  };

  return (
    <StyledDiv>
      <InvisibleActionButton clickHandler={goBack} buttonLabel={t("Back to Site")} />
    </StyledDiv>
  );
}