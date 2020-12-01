import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';
import LogoImg from '../Image/LogoImg';

// TODO: get name from data source
const Navigation = ({ navigationData, sticky = false }) => {
  const { navigationItems, logo } = navigationData;

  const navPrefix = 'nav-item-';
  const listBuilder = navigationItems.map((headerText) => (
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
      <li className="navbar nav-link" key={`${navPrefix}logo`}>
        <Link to="home" duration={1000} smooth spy>
          <LogoImg className="ml-auto" alt="Michael Cohen" filename={logo} />
        </Link>
      </li>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">{listBuilder}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  navigationData: PropTypes.shape({
    navigationItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
  sticky: PropTypes.bool,
};

export default Navigation;
