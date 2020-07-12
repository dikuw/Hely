import React from 'react';
import Card from './Card'
import styled from 'styled-components';

const StyledGrid = styled.div`
  min-height: 500px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 30px auto;
`;

class Grid extends React.Component {
  render() {
    return (
      <StyledGrid>
        {Object.values(this.props.inventory).map((item) => 
          <Card key={item.id} index={item.id} item={item} addToCart={this.props.addToCart} togglePopup={this.props.togglePopup} />
        )}
      </StyledGrid>
    )
  }
}

export default Grid;