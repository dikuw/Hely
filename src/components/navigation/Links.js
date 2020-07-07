import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Collapse = styled.div`

`;

const List = styled.div`

`;

const Item = styled.div`

`;

class Links extends React.Component {
  render() {
    return (
      <Collapse className="Collapse">
          <List id="navMenu" className="List">
              <Item className="Item">
                <Link to="/" className="nav-link">Home</Link>
              </Item>
              <Item className="Item">
                <Link to="/face" className="nav-link">Face</Link>
              </Item>
              <Item className="Item">
                <Link to="/eyes" className="nav-link">Eyes</Link>
              </Item>
              <Item className="Item">
                <Link to="/brushes" className="nav-link">Brushes</Link>
              </Item>
              <Item className="Item">
                <Link to="/cart" className="nav-link">Cart</Link>
              </Item>
          </List>
      </Collapse>
    )
  }
};

export default Links;