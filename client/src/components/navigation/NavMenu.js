import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-flow: row nowrap;
  z-index: 10;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    justify-content: flex-start;
    background-color: #fafafa;
    position: fixed;
    transform: ${({ menuOpen }) => menuOpen ? 'translateX(0)' : 'translateX(-100%)'};
    top: 0;
    left: 0;
    height: 100vh;
    width: 150px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: black;
      text-align: end;
    }
  }
`;

const Link = styled.a`
  color: black;
  cursor: pointer;
  :hover {
    text-decoration: none;
  }
`;

class NavMenu extends React.Component {
  myUl = React.createRef();

  handleClick(link, menuOpen) {
    this.props.history.push(link);
    this.myUl.current.style.transform='translateX(-100%)';
    this.myUl.current.style.removeProperty('transform');
  }

  render() {
    return (
      <Ul ref={this.myUl}  menuOpen={this.props.menuOpen}>
        <li><Link onClick={() => this.handleClick('/', this.props.menuOpen) } >Home</Link></li>
        <li><Link onClick={() => this.handleClick('/face', this.props.menuOpen) } >Face</Link></li>
        <li><Link onClick={() => this.handleClick('/eyes', this.props.menuOpen) } >Eyes</Link></li>
        <li><Link onClick={() => this.handleClick('/brushes', this.props.menuOpen) } >Brushes</Link></li>
        <li><Link onClick={() => this.handleClick('/cart', this.props.menuOpen) } >Cart</Link></li>
        <li><Link onClick={() => this.handleClick('/login', this.props.menuOpen) } >Log In</Link></li>
      </Ul>
    );
  }
}

export default NavMenu;