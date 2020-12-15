import React, { useContext, useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import Fade from 'react-reveal/Fade';
import Tilt from 'react-tilt';
import { Container, Row, Col } from 'react-bootstrap';
import PortfolioContext from '../../context/context';
import Title from '../Title/Title';
import ProjectImg from '../Image/ProjectImg';

const ProjectItem = (props) => {
  const { isDesktop, isMobile, project } = props;
  const { name, description, url, repo, img, id } = project;
  return (
    <Row key={id}>
      <Col lg={4} sm={12}>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={500} distance="30px">
          <div className="project-wrapper__text">
            <h3 className="project-wrapper__text-title">{name}</h3>
            <div>
              <p>{description}</p>
            </div>
            {url && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-btn--resume"
                href={url || '#!'}
              >
                See Live
              </a>
            )}
            {repo && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn text-color-main"
                href={repo}
              >
                Source Code
              </a>
            )}
          </div>
        </Fade>
      </Col>
      <Col lg={8} sm={12}>
        <Fade right={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
          <div className="project-wrapper__image">
            <a
              href={url || '#!'}
              target="_blank"
              aria-label="Project Link"
              rel="noopener noreferrer"
            >
              <Tilt
                options={{
                  reverse: false,
                  max: 8,
                  perspective: 1000,
                  scale: 1,
                  speed: 300,
                  transition: true,
                  axis: null,
                  reset: true,
                  easing: 'cubic-bezier(.03,.98,.52,.99)',
                }}
              >
                <div data-tilt className="thumbnail rounded">
                  <ProjectImg alt={name} filename={img} />
                </div>
              </Tilt>
            </a>
          </div>
        </Fade>
      </Col>
    </Row>
  );
};

const Projects = () => {
  const { projects } = useContext(PortfolioContext);

  const [projectsCollection, setProjectsCollection] = useState([]);
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
      .collection('projects')
      .get()
      .then((snapshot) => {
        snapshot.forEach((project) => {
          setProjectsCollection((projectsCollection) => [
            ...projectsCollection,
            { [project.id]: project.data() },
          ]);
        });
      });
  }, []);

  const projectsObj = projectsCollection.reduce((map, obj) => {
    Object.keys(obj).forEach(projectTree => {
      map[projectTree] = obj[projectTree];
    });
    return map;
  }, {});
  const allProjects = Object.keys(projectsObj).flatMap((key) => projectsObj[key]);
  // console.log(allProjects);
  // const allProjectsSorted = allProjects.sort((a, b) => b.order - a.order);
  // console.log(allProjectsSorted);
  return (
    <section id="projects">
      <Container>
        <div className="project-wrapper">
          <Title title="Projects" />
          {allProjects.map((projectUnwrapped) => {
            return Object.keys(projectUnwrapped)
              .sort((a, b) => projectUnwrapped[b].order - projectUnwrapped[a].order)
              .map((projectKey) => {
                const project = projectUnwrapped[projectKey];
                return (
                  <ProjectItem
                    isDesktop={isDesktop}
                    isMobile={isMobile}
                    project={project}
                    key={project.id}
                  />
                );
            });
          })}
        </div>
      </Container>
    </section>
  );
};

export default Projects;
