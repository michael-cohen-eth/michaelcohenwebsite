/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import firebase from 'gatsby-plugin-firebase';
import useSticky from '../hooks/useSticky';
import Navigation from './Header/Navbar';
import Hero from './Hero/Hero';
import About from './About/About';
import Skills from './Skills/Skills';
import Projects from './Projects/Projects';
import Work from './Work/Work';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';

import { PortfolioProvider } from '../context/context';

const myTheme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto Mono',
    body1: {
      fontSize: 12,
    },
    subtitle1: {
      fontSize: 14,
    },
  },
  palette: {
    background: {
      paper: '#f7f8f9',
    },
    divider: '#97ce8a',
    primary: {
      main: '#97ce8a',
    },
  },
});

const App = ({ data }) => {
  const [hero, setHero] = useState({});
  const [about, setAbout] = useState({});
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState({});
  const [footer, setFooter] = useState({});
  const { isSticky, stickyAnchor } = useSticky();

  const { allDataJson } = data;
  const portfolio = allDataJson.edges[0].node.data;
  const navigationData = portfolio.navigation;
  const heroData = portfolio.hero;
  const aboutData = portfolio.about;
  const projectsData = portfolio.projects;
  const contactData = portfolio.contact;
  const footerData = portfolio.footer;

  useEffect(() => {
    setHero({ ...heroData });
    setAbout({ ...aboutData });
    setProjects([...projectsData]);
    setContact({ ...contactData });
    setFooter({ ...footerData });

    if (!firebase) {
      return;
    }
    if (!process.env) {
      firebase.analytics.logEvent('page_visit', {
        branch: 'Not available',
      });
      return;
    }
    firebase.analytics().logEvent('page_visit', {
      branch: `${process.env.BRANCH}`,
    });
  }, []);

  // TODO: Add 'Home' empty component for anchoring
  return (
    <MuiThemeProvider theme={myTheme}>
      <PortfolioProvider value={{ hero, about, projects, contact, footer }}>
        <span id="home" />
        <Navigation navigationData={navigationData} sticky={isSticky} />
        <Hero stickyAnchor={stickyAnchor} />
        <About />
        <Work />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </PortfolioProvider>
    </MuiThemeProvider>
  );
};

export default App;
