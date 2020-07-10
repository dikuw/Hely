import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center; /* align vertical */
  z-index: 10;
  margin-bottom: 0px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: flex-end;
    background-color: #fafafa;
    border-right: solid 1px black;
    position: fixed;
    transform: ${({ menuOpen }) => menuOpen ? 'translateX(0)' : 'translateX(-100%)'};
    top: 0;
    left: 0;
    height: 100vh;
    width: 150px;
    padding: 20vh 12px;
    transition: transform 0.3s ease-in-out;
    li {
      color: black;
      text-align: end;
    }
  }
`;

const Li = styled.li`
  text-align: center;
  flex-grow: 1;
  height: 100%;
  @media (min-width: 768px) {
    :hover {
      background-color: #ffd7d7;
    }
  }
`;

const Link = styled.a`
  display:block;
  width: 100%;
  color: black;
  cursor: pointer;
  :hover {
    text-decoration: none;
  }
`;

class NavMenu extends React.Component {
  myUl = React.createRef();

  handleClick(link, menuOpen) {
    this.props.setOpen(!menuOpen)
    this.props.history.push(link);
  }

  render() {
    return (
      <Ul ref={this.myUl}  menuOpen={this.props.menuOpen}>
        <Li><Link onClick={() => this.handleClick('/', this.props.menuOpen) } >Home</Link></Li>
        <Li><Link onClick={() => this.handleClick('/face', this.props.menuOpen) } >Face</Link></Li>
        <Li><Link onClick={() => this.handleClick('/eyes', this.props.menuOpen) } >Eyes</Link></Li>
        <Li><Link onClick={() => this.handleClick('/brushes', this.props.menuOpen) } >Brushes</Link></Li>
        <Li><Link onClick={() => this.handleClick('/cart', this.props.menuOpen) } >Cart</Link></Li>
        <Li><Link onClick={() => this.handleClick('/login', this.props.menuOpen) } >Log In</Link></Li>
        <Li><Link onClick={() => this.handleClick('/Inventory', this.props.menuOpen) } >Inventory</Link></Li>
      </Ul>
    );
  }
}

export default NavMenu;