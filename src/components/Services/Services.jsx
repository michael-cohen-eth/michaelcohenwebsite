import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { Container, Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Title from '../Title/Title';
import ServiceImage from '../Image/ServiceImage';
import { serviceType } from '../AppProps';
import Loading from '../Utils/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '40em',
    backgroundColor: theme.palette.divider,
    display: 'flex',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  },
  cards: {
    maxWidth: 354,
    minWidth: '6em',
    margin: '1em',
    textAlign: 'center',
    padding: 12,
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0.5em',
      marginRight: '0.5em',
      textSize: 9,
    },
  },
  media: {
    height: 240,
  },
}));

const ServiceItem = ({ service }) => {
  const classes = useStyles();
  return (
    <PopupState variant="popover" popupId="popoverSkill">
      {(popupState) => (
        <>
          <Card className={classes.cards} {...bindHover(popupState)}>
            <CardMedia className={classes.media}>
              <ServiceImage filename={service.image} alt={service.service} />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h4">
                {service.service}
              </Typography>
            </CardContent>
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
            <Typography>{service.description}</Typography>
          </Popover>
        </>
      )}
    </PopupState>
  );
};
ServiceItem.propTypes = {
  service: serviceType,
};

const Services = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
      .collection('portfolio')
      .doc('services')
      .collection('serviceItems')
      .get()
      .then((snapshot) => {
        const items = [];
        snapshot.forEach((snapItem) => {
          items.push(snapItem.data());
        });
        setServices(items);
        setLoading(false);
      });
  }, []);

  return (
    <section id="services">
      <Container className="project-wrapper">
        <Title title="Services" />
        {loading && <Loading />}
        {!loading && (
          <Container>
            <Row>
              {services.map((service) => (
                <Col key={service.service}>
                  <ServiceItem service={service} />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </Container>
    </section>
  );
};

export default Services;
