import React from 'react';
import { useTranslation } from "react-i18next";
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
      background-color: var(--rosaVieja);
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

export default function AdminNavMenu(props) {
  const { t } = useTranslation();

  const handleClick = (link, menuOpen) => {
    props.setOpen(!menuOpen)
    props.history.push(link);
  }
 
  return (
    <Ul menuOpen={props.menuOpen}>
      {props.isLoggedIn ? ( "" ) : (
          <Li><Link onClick={() => handleClick('/login', props.menuOpen) } >{t("Log In")}</Link></Li>
        )
      }
      {props.isAdmin ? (
        <>
          <Li><Link onClick={() => handleClick('/orders', props.menuOpen) } >{t("Orders")}</Link></Li>
          <Li><Link onClick={() => handleClick('/inventory', props.menuOpen) } >{t("Inventory")}</Link></Li>
          <Li><Link onClick={() => handleClick('/shippingOptions', props.menuOpen) } >{t("Shipping")}</Link></Li>
          <Li><Link onClick={() => handleClick('/', props.menuOpen) } >{t("Back to Site")}</Link></Li>
        </>
        ) : ( "" )
      }
    </Ul>
  );
}