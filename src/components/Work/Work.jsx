import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import PropTypes from 'prop-types';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import { Container } from 'react-bootstrap';
import Loading from '../Utils/Loading';
import IconImg from '../Image/IconImg';
import Title from '../Title/Title';

function toDateTime(secs) {
  const t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  return t;
}

const WorkItem = ({ company, team, start, end, icon }) => {
  const startStr = toDateTime(start.seconds).toISOString().split('T')[0];
  const endStr = end ? toDateTime(end.seconds).toISOString().split('T')[0] : '';
  return (
    <TimelineItem>
      <TimelineOppositeContent>
        <h4>
          {startStr} - {endStr}
        </h4>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot>
          <IconImg filename={icon} />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className="paper">
          <h2>{company}</h2>
          <h3>{team}</h3>
        </Paper>
      </TimelineContent>
    </TimelineItem>
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
  icon: PropTypes.string.isRequired,
};
const WorkTimeline = ({ workItems }) => {
  return (
    <Timeline align="alternate">
      {workItems.map((workItem) => (
        <WorkItem
          company={workItem.company}
          team={workItem.team}
          start={workItem.start}
          end={workItem.end}
          icon={workItem.icon}
          key={workItem.team}
        />
      ))}
    </Timeline>
  );
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
      icon: PropTypes.string,
    })
  ),
};

const Work = ({workData}) => {
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
        // console.log(snapshot);
        // if (snapshot.exists) {
        const items = [];
        snapshot.forEach((snapItem) => {
          console.log(snapItem.data());
          items.push(snapItem.data());
        });
        setWork(items);
        setLoading(false);
        // }
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
