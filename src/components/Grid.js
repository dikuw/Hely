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
        {Object.values(this.props.inventory).map((item, i) => 
          <Card key={item.id} index={item.id} item={item} />)}
      </StyledGrid>
    )
  }
}

export default Grid;