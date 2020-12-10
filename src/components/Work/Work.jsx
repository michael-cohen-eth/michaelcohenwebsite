import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container, Col, Row } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Loading from '../Utils/Loading';
import IconByName from '../Image/IconByName';
import Title from '../Title/Title';

const formatProjectDate = (seconds) => {
  const ms = seconds * 1000;
  const dateObj = new Date(ms);
  return dateObj.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};
function SimpleDialog(props) {
  const { open, company, role, team, onClose, details = [], dates } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
      <DialogTitle disableTypography>
        <Typography variant="h4">{company}</Typography>
        <Row>
          <Col className="mr-auto">
            <Typography variant="h5">{team}</Typography>
          </Col>
          <Col>
            <DialogContentText align="right">{dates}</DialogContentText>
          </Col>
        </Row>
        <Typography variant="body1">{role}</Typography>
      </DialogTitle>
      <DialogContent>
        {details.map((item) => (
          <DialogContentText key={item}>• {item}</DialogContentText>
        ))}
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  details: PropTypes.arrayOf(PropTypes.string),
};

const WorkItem = ({ company, team, role, start, end, details, color = '' }) => {
  const [open, setOpen] = React.useState(false);
  const [clickedAwayFlag, setClickedAwayFlag] = React.useState(true);

  const handleClickOpen = () => {
    if (clickedAwayFlag) {
      setOpen(true);
    }
    setClickedAwayFlag(true);
  };

  const handleClickClose = () => {
    setOpen(false);
    setClickedAwayFlag(false);
  };
  const startStr = formatProjectDate(start.seconds);
  const endStr = end ? formatProjectDate(end.seconds) : 'Now';
  const dateStr = `${startStr} - ${endStr}`;
  const iconStyle = {
    background: color,
    color: '#333333',
  };

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      textClassName="work-item"
      contentArrowStyle={{ borderRight: '7px solid  #C38D9E' }}
      date={dateStr}
      dateClassName="date"
      iconStyle={iconStyle}
      iconClassName="icon"
      icon={<IconByName iconName={company.toUpperCase()} />}
      onTimelineElementClick={handleClickOpen}
      iconOnClick={handleClickOpen}
    >
      <Typography variant="h4" className="vertical-timeline-element-title">
        {company}
      </Typography>
      <Typography variant="h5" className="vertical-timeline-element-subtitle">
        {team}
      </Typography>
      <SimpleDialog
        open={open}
        company={company}
        role={role}
        team={team}
        onClose={handleClickClose}
        details={details}
        dates={dateStr}
      />
    </VerticalTimelineElement>
  );
};

WorkItem.propTypes = {
  company: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  details: PropTypes.arrayOf(PropTypes.string),
  start: PropTypes.shape({
    nanoseconds: PropTypes.number,
    seconds: PropTypes.number,
  }),
  end: PropTypes.shape({
    nanoseconds: PropTypes.number,
    seconds: PropTypes.number,
  }),
  color: PropTypes.string,
};

const WorkTimeline = ({ workItems, animate }) => {
  return (
    <VerticalTimeline animate={animate}>
      {workItems.map((workItem) => (
        <WorkItem
          company={workItem.company}
          team={workItem.team}
          start={workItem.start}
          role={workItem.role}
          details={workItem.details}
          color={workItem.color}
          end={workItem.end}
          key={workItem.team}
        />
      ))}
    </VerticalTimeline>
  );
};

WorkTimeline.propTypes = {
  animate: PropTypes.bool.isRequired,
  workItems: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      color: PropTypes.string,
      details: PropTypes.arrayOf(PropTypes.string),
      start: PropTypes.shape({
        nanoseconds: PropTypes.number,
        seconds: PropTypes.number,
      }),
      end: PropTypes.shape({
        nanoseconds: PropTypes.number,
        seconds: PropTypes.number,
      }),
    })
  ),
};

const Work = ({ workData = [] }) => {
  const [work, setWork] = useState(workData);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection('portfolio')
      .doc('work')
      .collection('workItems')
      .orderBy('start', 'desc')
      .get()
      .then((snapshot) => {
        const items = [];
        snapshot.forEach((snapItem) => {
          items.push(snapItem.data());
        });
        setWork(items);
        setLoading(false);
      });
  }, []);

  return (
    <section id="work">
      <Container>
        {loading && <Loading />}
        {!loading && (
          <div className="work-wrapper">
            <Title title="Work" />
            <WorkTimeline workItems={work} animate={!isMobile}/>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Work;
