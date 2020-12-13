import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Loading from '../Utils/Loading';
import IconByName from '../Image/IconByName';
import Title from '../Title/Title';
import { WorkDialog, SchoolDialog } from './ItemDialog';
import { schoolType, workType } from '../AppProps';
import { School } from '@material-ui/icons';

const formatProjectDate = (seconds) => {
  const ms = seconds * 1000;
  const dateObj = new Date(ms);
  return dateObj.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

const WorkItem = ({ item }) => {
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
  const startStr = formatProjectDate(item.start.seconds);
  const endStr = item.end ? formatProjectDate(item.end.seconds) : 'Now';
  const dateStr = `${startStr} - ${endStr}`;
  const iconStyle = {
    background: item.color,
    color: '#333333',
  };
  const title = item.company ? item.company : item.college;
  const subtitle = item.team ? item.team : `${item.major}, ${item.minor}`;
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      textClassName="work-item"
      contentArrowStyle={{ borderRight: '7px solid  #C38D9E' }}
      date={dateStr}
      dateClassName="date"
      iconStyle={iconStyle}
      iconClassName="icon"
      icon={<IconByName iconName={title.toUpperCase()} />}
      onTimelineElementClick={handleClickOpen}
      iconOnClick={handleClickOpen}
    >
      <Typography variant="h4" className="vertical-timeline-element-title">
        {title}
      </Typography>
      <Typography variant="h5" className="vertical-timeline-element-subtitle">
        {subtitle}
      </Typography>
      {item.company && (
        <WorkDialog open={open} item={item} onClose={handleClickClose} dates={dateStr} />
      )}
      {item.college && (
        <SchoolDialog open={open} item={item} onClose={handleClickClose} dates={dateStr} />
      )}
    </VerticalTimelineElement>
  );
};

WorkItem.propTypes = {
  item: PropTypes.oneOfType([workType, schoolType])
};

const WorkTimeline = ({ workItems, animate }) => {
  return (
    <VerticalTimeline animate={animate}>
      {workItems.map((workItem) => (
        <WorkItem item={workItem} key={workItem.start} />
      ))}
    </VerticalTimeline>
  );
};

WorkTimeline.propTypes = {
  animate: PropTypes.bool.isRequired,
  workItems: PropTypes.arrayOf(PropTypes.oneOfType([workType, schoolType])),
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
