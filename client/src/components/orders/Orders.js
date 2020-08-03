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
        <StyledButton onClick={this.props.loadSampleOrders}>Load Sample Orders</StyledButton>
      </StyledWrapperDiv>
    );
  }
}

export default Orders;