import React from 'react';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Title = ({ title }) => (
  <Fade bottom duration={1000} delay={300} distance="0px">
    <Typography variant="h2" className="section-title">{title}</Typography>
  </Fade>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
