import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'gatsby-plugin-firebase';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';
import Loading from '../Utils/Loading';
import LogoImg from '../Image/LogoImg';

// TODO: get name from data source
const Navigation = ({ navigationData, sticky = false }) => {
  const [logo, setLogo] = useState(navigationData.logo);
  const [headers, setHeaders] = useState(navigationData.navigationItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection('portfolio')
      .doc('meta')
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const meta = snapshot.data();
          setHeaders(meta.headers);
          setLogo(meta.logo);
          setLoading(false);
        }
      });
  }, []);

  const navPrefix = 'nav-item-';
  const listBuilder = headers.map((headerText) => {
    if (process.env.BRANCH !== 'services-section' && headerText === 'services') {
      return <span key={`${navPrefix}${headerText}`} />;
    }
    return (
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
    );
  });

  const navbarSticky = sticky ? 'top' : null;
  let className = 'navbar';
  if (sticky) {
    className = className.concat(' navbar-sticky');
  }
  if (loading) {
    className = className.concat(' justify-content-center');
  }
  return (
    <Navbar expand="lg" sticky={navbarSticky} className={className} defaultExpanded={false}>
      {loading && <Loading />}
      {!loading && (
        <>
          <li className="navbar nav-link" key={`${navPrefix}logo`}>
            <Link to="home" duration={1000} smooth spy>
              <LogoImg className="ml-auto" alt="Michael Cohen" filename={logo} />
            </Link>
          </li>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">{listBuilder}</Nav>
          </Navbar.Collapse>
        </>
      )}
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
