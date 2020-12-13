import React from 'react';
import PropTypes from 'prop-types';
import IconResearchAudience from '@rhiza/nielsen-icons/react-icons/research-audience';
import { FaAmazon, FaAws, FaJava } from 'react-icons/fa';
import { FiHexagon } from 'react-icons/fi';
import { SiFlutter, SiAndroid, SiReact } from 'react-icons/si';
import { Watson32 } from '@carbon/icons-react';
import UFIcon from './Icons/UFIcon';

const IconName = {
  AMAZON: 'AMAZON',
  AWS: 'AWS',
  IBM: 'IBM',
  NIELSEN: 'NIELSEN',
  FLUTTER: 'FLUTTER',
  ANDROID: 'ANDROID',
  REACT: 'REACT',
  JAVA: 'JAVA',
  CATAN: 'CATAN',
  UF: 'UNIVERSITY OF FLORIDA',
};

const IconByName = ({ iconName, size = '5em', color = '#333333' }) => {
  switch (iconName.toUpperCase()) {
    case IconName.NIELSEN:
      return <IconResearchAudience accent="#262626" base="#262626" />;
    case IconName.AMAZON:
      return <FaAmazon size={size} color={color} />;
    case IconName.AWS:
      return <FaAws size={size} color={color} />;
    case IconName.IBM:
      return <Watson32 color="#ffffff" />;
    case IconName.ANDROID:
      return <SiAndroid size={size} color={color} />;
    case IconName.REACT:
      return <SiReact size={size} color={color} />;
    case IconName.JAVA:
      return <FaJava size={size} color={color} />;
    case IconName.CATAN:
      return <FiHexagon size={size} color={color} />;
    case IconName.UF:
      return <UFIcon size={size} color={color} />;
    case IconName.FLUTTER:
    default: {
      return <SiFlutter size={size} color={color} />;
    }
  }
};

IconByName.propTypes = {
  iconName: PropTypes.oneOf(Object.values(IconName)),
};

export default IconByName;
