import React from 'react';
import { Container } from 'react-bootstrap';
import HeaderChild from './HeaderChild';

const Navbar = ({ headerNames, sticky }) => {
  console.log(headerNames);
  const items = Object.keys(headerNames.allDataJson.edges[0].node.data);
  console.log(items);
  const listBuilder = items.map((headerText) => (
    <HeaderChild className="navbar-item">{headerText}</HeaderChild>
  ));
  return (
    <Container className="navbar-container">
      <nav className={sticky ? 'navbar navbar-sticky' : 'navbar'}>{listBuilder}</nav>
    </Container>
  );
};

export default Navbar;
