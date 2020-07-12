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
  left: 25%;  
  right: 25%;  
  top: 25%;  
  padding: 12px 0px;
  margin: auto;   
  background: var(--almostWhite); 
  z-index: 77;
`;

const StyledPopupHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
`;

const StyledPopupHeaderH1 = styled.h1`
  font-size: 1em;
`;

const StyleButton = styled.button`
  font-size: 0.8em;
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
  margin: 0px 10px 10px 10px;
  padding: 5px 5px;
  transition: background-color 300ms ease-out;
  width: 75%;
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
            <StyledPopupHeaderH1>Added to Cart!</StyledPopupHeaderH1>  
          </StyledPopupHeaderDiv>
          <StyleButton onClick={() => this.handleClick()}>Go to Cart</StyleButton>
          <StyleButton onClick={this.props.togglePopup}>Keep Shopping</StyleButton>
        </StyledPopupWrapperDiv>  
      </StyledPopupDiv>  
    ); 
  }
};

export default AddedPopup;
