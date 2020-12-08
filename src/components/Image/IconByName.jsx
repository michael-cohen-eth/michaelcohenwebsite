import React from 'react';
import PropTypes from 'prop-types';
import IconResearchAudience from '@rhiza/nielsen-icons/react-icons/research-audience';
import { FaAmazon, FaAws } from 'react-icons/fa';
import { Watson32 } from '@carbon/icons-react';

const IconName = {
  AMAZON: 'AMAZON',
  AWS: 'AWS',
  IBM: 'IBM',
  NIELSEN: 'NIELSEN',
};

const IconByName = ({ iconName }) => {
  switch (iconName.toUpperCase()) {
    case IconName.NIELSEN:
      return <IconResearchAudience accent="#00adef" base="#00adef" />;
    case IconName.AMAZON:
      return <FaAmazon />;
    case IconName.AWS:
      return <FaAws />;
    case IconName.IBM:
      return <Watson32 color="#262626" />;
    default:
      return <IconResearchAudience accent="#000000" />;
  }
};

IconByName.propTypes = {
  iconName: PropTypes.oneOf(Object.keys(IconName)),
};

export default IconByName;
