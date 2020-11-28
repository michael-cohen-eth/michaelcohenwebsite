import React from 'react';
import { Col } from 'react-bootstrap';

export default ({ children }) => (
  <Col className="sticky-inner">
    <h1>{children}</h1>
  </Col>
);
