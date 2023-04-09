import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import firebase from 'gatsby-plugin-firebase';
import { Container, Row, Col } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';
import Title from '../Title/Title';
import AboutImg from '../Image/AboutImg';
import Loading from '../Utils/Loading';

const About = () => {
  const resumeInfo = useStaticQuery(graphql`
    {
      allFile(filter: { extension: { eq: "pdf" } }) {
        edges {
          node {
            publicURL
            name
          }
        }
      }
    }
  `).allFile.edges[0];
  const [about, setAbout] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      .doc('about')
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setAbout(snapshot.data());
          setLoading(false);
        }
      });
  }, []);

  return (
    <section id="about">
      <Container>
        <Title title="About Me" />
        {loading && <Loading />}
        {!loading && (
          <Row className="about-wrapper">
            <Col md={6} sm={12}>
              <Fade bottom duration={1000} delay={600} distance="30px">
                <div className="about-wrapper__image">
                  <AboutImg alt="profile picture" filename={about.img} />
                </div>
              </Fade>
            </Col>
            <Col md={6} sm={12}>
              <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
                <div className="about-wrapper__info">
                  <Typography variant="h5" className="about-wrapper__info-text-paragraph">
                    {about.paragraphOne}
                  </Typography>
                  <br />
                  <Typography variant="h5" className="about-wrapper__info-text-paragraph">
                    {about.paragraphTwo}
                  </Typography>
                  <br />
                  <Typography variant="h5" className="about-wrapper__info-text-paragraph">
                    {about.paragraphThree}
                  </Typography>
                  <br />
                  <br />
                  <Typography variant="h5" className="about-wrapper__info-text">
                    are you more oldschool?
                  </Typography>
                  <span className="d-flex mt-3">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-btn cta-btn--resume"
                      href={resumeInfo.node.publicURL}
                    >
                      read on at resume.pdf
                    </a>
                  </span>
                </div>
              </Fade>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default About;
