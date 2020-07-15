import React from 'react';
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

class Inventory extends React.Component {
  state = {
    uid: "admin",
    isAuthorized: null,
    uploadingPhoto: false
  }

  authHandler = async () => {
    //  TODO Authenticate and update  //
    //  ** 🔑🔑🔑 **  //
    this.setState({
      uid: "1",
      isAuthorized: true
    })
  }
 
  componentWillUnmount = async () => {
    await apis.putInventory({ ...this.props.inventory });
  }

  togglePopup = () => {   
    this.setState(prevState => ({
      uploadingPhoto: !prevState.uploadingPhoto
    }))
  } 

  render() {
    //  TODO replace -- this is for testing purposes
    if (!this.state.uid) {
      return <div>You do not have permission to view this page.</div>
    }
    return (
      <StyledWrapperDiv>
        {this.state.uploadingPhoto ? <LoadingPopup /> : null}
        <AddItemForm addItem={this.props.addItem} uploadingPhoto={this.state.uploadingPhoto} togglePopup={this.togglePopup} />
        {Object.values(this.props.inventory).map( (item, i) => 
          <EditItemForm 
            key={i} 
            index={i} 
            item={item} 
            updateItem={this.props.updateItem}
            deleteItem={this.props.deleteItem}
            uploadingPhoto={this.state.uploadingPhoto}
            togglePopup={this.togglePopup}
          />)}
        <StyledButton onClick={this.props.loadSampleInventory}>Load Sample Data</StyledButton>
      </StyledWrapperDiv>
    );
  }
}

export default Inventory;