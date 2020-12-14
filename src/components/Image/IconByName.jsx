import React from 'react';
import PropTypes from 'prop-types';
import IconResearchAudience from '@rhiza/nielsen-icons/react-icons/research-audience';
import { FaAmazon, FaAws, FaJava, FaSwift, FaPython, FaCoffee } from '@meronex/icons/fa';
import { GiHexes } from '@meronex/icons/gi';
import { SiFlutter, SiAndroid, SiReact } from '@meronex/icons/si';
import { GrStackOverflow } from '@meronex/icons/gr';
import { CgWebsite } from '@meronex/icons/cg';
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
  FS: 'FULL STACK',
  JAVA: 'JAVA',
  CATAN: 'CATAN',
  UF: 'UNIVERSITY OF FLORIDA',
  WEBDEV: 'WEBDEV',
  SWIFT: 'SWIFT',
  PYTHON: 'PYTHON',
  COFFEE: 'COFFEE',
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
      return <GiHexes size={size} color={color} />;
    case IconName.UF:
      return <UFIcon size={size} color={color} />;
    case IconName.FS:
      return <GrStackOverflow size={size} color={color} />;
    case IconName.WEBDEV:
      return <CgWebsite size={size} color={color} />;
    case IconName.SWIFT:
      return <FaSwift size={size} color={color} />;
    case IconName.PYTHON:
      return <FaPython size={size} color={color} />;
    case IconName.COFFEE:
      return <FaCoffee size={size} color={color} />;
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
