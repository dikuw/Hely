import React from 'react';
import styled from 'styled-components';

const StyledPopupDiv = styled.div`
  display: flex;
  position: fixed;  
  width: 100%;  
  height: 100%;  
  top: 0;  
  left: 0;  
  right: 0;  
  bottom: 0;  
  margin: auto;  
  background-color: rgba(0,0,0, 0.5);  
  z-index: 76;
`;

const StyledPopupWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;  
  width: 25%;
  left: 25%;  
  right: 25%;  
  top: 25%;  
  padding: 12px 0px;
  margin: auto;   
  background: white;
  z-index: 77;
  border-radius: 4px;
`;

const StyledPopupHeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem;
  background: white;
`;

const StyledPopupHeaderH1 = styled.h1`
  text-align: center;
  font-size: 1em;
`;

const StyledSpinnerImg = styled.img`
  width: 14rem;
`;


class AddedPopup extends React.Component {

  handleClick = (key) => {
    this.props.togglePopup();
    this.props.history.push("/cart");
  };

  render() {
    return (
      <StyledPopupDiv >  
        <StyledPopupWrapperDiv>  
          <StyledPopupHeaderDiv>
            <StyledPopupHeaderH1>Processing payment...</StyledPopupHeaderH1>  
            <StyledSpinnerImg src="images/spinner.gif" alt="uploading" />
          </StyledPopupHeaderDiv>
        </StyledPopupWrapperDiv>  
      </StyledPopupDiv>  
    ); 
  }
};

export default AddedPopup;
