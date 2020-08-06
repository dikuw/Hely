import React from 'react';
import styled from 'styled-components';
import EditItemForm from './EditItemForm';

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

class Orders extends React.Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <StyledNoPermissionsDiv>You do not have permission to view this page.</StyledNoPermissionsDiv>
    }
    return (
      <StyledWrapperDiv>
        {Object.values(this.props.orders).map( (item, i) => 
          <EditItemForm 
            key={i} 
            index={i} 
            item={item} 
            inventory={this.props.inventory} 
            updateOrder={this.props.updateOrder}
          />)}
      </StyledWrapperDiv>
    );
  }
}

export default Orders;