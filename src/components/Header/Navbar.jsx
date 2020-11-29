import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';
import LogoImg from '../Image/LogoImg';

//TODO: get name from data source
const Navigation = ({ navigationData, sticky }) => {
  const { navigation_items, logo } = navigationData;

  const navPrefix = 'nav-item-';
  const listBuilder = navigation_items.map((headerText) => (
    <li className="nav-item col" key={`${navPrefix}${headerText}`}>
      <Link
        to={headerText}
        activeClass="active"
        className="nav-link"
        offset={-70}
        duration={1000}
        spy
        smooth
      >
        {headerText}
      </Link>
    </li>
  ));

  const navbarSticky = sticky ? 'top' : null;
  return (
    <Navbar
      expand="lg"
      sticky={navbarSticky}
      className={sticky ? 'navbar navbar-sticky' : 'navbar'}
      defaultExpanded={false}
    >
      <Container>
        <li className="navbar nav-link" key={`${navPrefix}logo`}>
          <Link to="home" duration={1000} smooth spy>
            <LogoImg className="ml-auto" alt="Michael Cohen" filename={logo} />
          </Link>
        </li>
      </Container>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">{listBuilder}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
