import React from 'react';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';
import styled from 'styled-components';

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
  background: #ec419f;
  border-color: #ebebeb;
  border-radius: 2px;
  border: 0;
  color: #ffffff;
  display: inline-block;
  height: 45px;
  letter-spacing: 1px;
  line-height: 45px;
  margin: 0;
  padding: 0 25px;
  transition: background-color 300ms ease-out;
  width: auto;
`;

class Inventory extends React.Component {
  state = {
    uid: "admin",
    isAuthorized: null
  }

  authHandler = async () => {
    //  TODO Authenticate and update
    this.setState({
      uid: "1",
      isAuthorized: true
    })
  }

  render() {
    //  TODO replace -- this is for testing purposes
    if (!this.state.uid) {
      return <div>You do not have permission to view this page.</div>
    }
    return (
      <StyledWrapperDiv>
        {Object.keys(this.props.inventory).map(key => 
          <EditItemForm 
            key={key} 
            index={key} 
            item={this.props.inventory[key]} 
            updateItem={this.props.updateItem}
            deleteItem={this.props.deleteItem}
          />)}
        <AddItemForm addItem={this.props.addItem}/>
        <StyledButton onClick={this.props.loadSampleInventory}>Load Sample Data</StyledButton>
      </StyledWrapperDiv>
    );
  }
}

export default Inventory;