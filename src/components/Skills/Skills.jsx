import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Title from '../Title/Title';
import IconByName from '../Image/IconByName';

const iconSize = '5em';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '40em',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    '&$selected': {
      backgroundColor: theme.palette.divider,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      backgroundColor: theme.palette.divider,
    }
  },
  cards: {
    maxWidth: '12em',
    minWidth: '6em',
    margin: '1em',
    textAlign: 'center',
    padding: 12,
    [theme.breakpoints.down('sm')]: {
      width: '6em',
      textSize: 9,
    },
  },
  tabLabel: {
    marginRight: '2em',
    fontSize: 14,
  },
}));

const SkillItem = ({ skill }) => {
  const styles = useStyles();
  return (
    <Col>
      <Card className={styles.cards}>
        <IconByName iconName={skill.logo} size={iconSize} color={skill.iconColor} />
        <Typography>{skill.name}</Typography>
      </Card>
    </Col>
  );
};
const SkillsTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Container
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Row xs={2} md={6} lg={6}>
          {children}
        </Row>
      )}
    </Container>
  );
};

SkillsTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const SkillsTabs = ({ skillsCollection }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const skillsObj = skillsCollection.reduce((map, obj) => {
    Object.keys(obj).forEach(skillTree => {
      map[skillTree] = obj[skillTree];
    });
    return map;
  }, {});
  const skillsLabels = Object.keys(skillsObj);
  const skillTabItems = (skillTree) => {
    return Object.keys(skillTree).map((key) => <SkillItem skill={skillTree[key]} key={key} />);
  };
  const skillTabs = Object.keys(skillsObj).map((skill, index) => (
    <SkillsTabPanel value={value} index={index} key={skill}>
      {skillTabItems(skillsObj[skill])}
    </SkillsTabPanel>
  ));
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        aria-label="Skills tabs"
        className={classes.tabs}
      >
        {skillsLabels.map((tabLabel, index) => (
          <Tab label={tabLabel} className={classes.tabLabel} {...a11yProps(index)} />
        ))}
      </Tabs>
      {skillTabs}
    </div>
  );
};

const Skills = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [skillsCollections, setSkillsCollections] = useState([]);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
    firebase
      .firestore()
      .collection('skills')
      .get()
      .then((snapshot) => {
        snapshot.forEach((newCollection) => {
          setSkillsCollections((skillsCollections) => [
            ...skillsCollections,
            { [newCollection.id]: newCollection.data() },
          ]);
        });
      });
  }, []);

  return (
    <section id="skills">
      <Container className="project-wrapper">
        <Title title="Skills" />
        <SkillsTabs skillsCollection={skillsCollections} />
      </Container>
    </section>
  );
};

export default Skills;
