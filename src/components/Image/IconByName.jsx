import React from 'react';
import PropTypes from 'prop-types';
import IconResearchAudience from '@rhiza/nielsen-icons/react-icons/research-audience';
import { FaAmazon } from 'react-icons/fa';
import { Watson32 } from '@carbon/icons-react';

const IconName = {
  AMAZON: 'Amazon',
  IBM: 'IBM',
  NIELSEN: 'nielsen',
};

const IconByName = ({ iconName }) => {
  switch (iconName) {
    case IconName.NIELSEN:
      return <IconResearchAudience base="#2AACE2" accent="#000000" />;
    case IconName.AMAZON:
          return <FaAmazon color="#333333" />;
    case IconName.IBM:
      return <Watson32 color="#333333" />;
    default:
      return <IconResearchAudience base="#2AACE2" accent="#000000" />;
  }
};

IconByName.propTypes = {
  iconName: PropTypes.oneOf(Object.keys(IconName)),
};

export default IconByName;
