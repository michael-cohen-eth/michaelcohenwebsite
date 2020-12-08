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

const formatProjectDate = (seconds) => {
  const ms = seconds * 1000;
  const dateObj = new Date(ms);
  return dateObj.toLocaleString("en-US", {month: 'long', year: "numeric"}) ;
};

const WorkTimeline = ({ workItems }) => {
  return (
    <VerticalTimeline animate>
      {workItems.map((workItem) => (
        <WorkItem
          company={workItem.company}
          team={workItem.team}
          start={workItem.start}
          end={workItem.end}
          key={workItem.team}
        />
      ))}
    </VerticalTimeline>
  )
};

const WorkItem = ({ company, team, start, end }) => {
  const startStr = formatProjectDate(start.seconds);
  const endStr = end ? formatProjectDate(end.seconds) : '';
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      textClassName="work-item"
      contentArrowStyle={{ borderRight: '7px solid  #52b788' }}
      date={`${startStr} - ${endStr}`}
      dateClassName="date"
      iconStyle={{ background: 'rgb(223, 223, 223)', color: '#fff' }}
      iconClassName="icon"
      icon={<IconByName iconName={company} />}
    >
      <Typography variant="h4" className="vertical-timeline-element-title">{company}</Typography>
      <Typography variant="h5" className="vertical-timeline-element-subtitle">{team}</Typography>
    </VerticalTimelineElement>
  );
};

WorkItem.propTypes = {
  company: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  start: PropTypes.shape({
    nanoseconds: PropTypes.number,
    seconds: PropTypes.number,
  }),
  end: PropTypes.shape({
    nanoseconds: PropTypes.number,
    seconds: PropTypes.number,
  }),
};

WorkTimeline.propTypes = {
  workItems: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
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
  useEffect(() => {
    firebase
      .firestore()
      .collection('portfolio')
      .doc('work')
      .collection('workItems')
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
            <WorkTimeline workItems={work} />
          </div>
        )}
      </Container>
    </section>
  );
};

export default Work;
