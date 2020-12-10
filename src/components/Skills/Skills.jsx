import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state';
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
    },
  },
  indicator: {
    width: '10px',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  },
  cards: {
    maxWidth: '12em',
    minWidth: '6em',
    margin: '1em',
    textAlign: 'center',
    padding: 12,
    [theme.breakpoints.down('sm')]: {
      width: '8em',
      textSize: 9,
    },
  },
  tabLabel: {
    marginRight: '2em',
    fontSize: 14,
    '&:hover': {
      borderRight: `10px solid ${theme.palette.divider}`,
    },
  },
}));

const SkillItem = ({ skill }) => {
  const classes = useStyles();
  return (
    <PopupState variant="popover" popupId="popoverSkill">
      {(popupState) => (
        <Col>
          <Card className={classes.cards} {...bindHover(popupState)}>
            <IconByName iconName={skill.logo.toUpperCase()} size={iconSize} color={skill.iconColor} />
            <Typography variant="subtitle1">{skill.name}</Typography>
          </Card>
          <Popover
            {...bindPopover(popupState)}
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            disableRestoreFocus
          >
            <Typography>{skill.description}</Typography>
          </Popover>
        </Col>
      )}
    </PopupState>
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
  const allSkills = Object.keys(skillsObj).flatMap((key) => skillsObj[key]);
  const skillsLabels = Object.keys(skillsObj);
  const skillTabItems = (skillTree) => {
    return Object.keys(skillTree).map((key) => <SkillItem skill={skillTree[key]} key={key} />);
  };
  const allTabPanel = (
    <SkillsTabPanel value={value} index={0} key="allSkillsTab">
      {allSkills.map((skillUnwrapped) => {
        return Object.keys(skillUnwrapped).map(skillKey => <SkillItem skill={skillUnwrapped[skillKey]} key={skillKey} />);
      })}
    </SkillsTabPanel>
  );
  const skillTabsPanels = Object.keys(skillsObj).map((skill, index) => (
    <SkillsTabPanel value={value} index={index + 1} key={skill}>
      {skillTabItems(skillsObj[skill])}
    </SkillsTabPanel>
  ));
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        indicatorColor="primary"
        classes={{ indicator: classes.indicator }}
        value={value}
        onChange={handleChange}
        aria-label="Skills tabs"
        className={classes.tabs}
      >
        <Tab label="ALL" className={classes.tabLabel} key="ALL-0" {...a11yProps(0)} />
        {skillsLabels.map((tabLabel, index) => (
          <Tab
            label={tabLabel}
            className={classes.tabLabel}
            key={`${tabLabel}-${index + 1}`}
            {...a11yProps(index + 1)}
          />
        ))}
      </Tabs>
      {allTabPanel}
      {skillTabsPanels}
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
