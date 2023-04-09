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
// import Gallery from './Gallery/Gallery';
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
  const [contact, setContact] = useState({});
  const [footer, setFooter] = useState({});
  const { isSticky, stickyAnchor } = useSticky();

  const { allDataJson } = data;
  const portfolio = allDataJson.edges[0].node.data;
  const navigationData = portfolio.navigation;
  const heroData = portfolio.hero;
  const aboutData = portfolio.about;
  const contactData = portfolio.contact;
  const footerData = portfolio.footer;

  useEffect(() => {
    setHero({ ...heroData });
    setAbout({ ...aboutData });
    setContact({ ...contactData });
    setFooter({ ...footerData });

    if (!firebase) {
      return;
    }
    if (typeof window !== `undefined`) {
      const { search } = window.location;
      const params = new URLSearchParams(search);
      const greetingSubject = params.get('greet') ? params.get('greet') : '';
      firebase.analytics().setUserProperties({ greeted: greetingSubject });
      firebase.analytics().logEvent('greets', {
        greeted: greetingSubject,
      });
    }
    if (!process.env) {
      firebase.analytics().logEvent('page_visit', {
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
      <PortfolioProvider value={{ hero, about, contact, footer }}>
        <span id="home" />
        <Navigation navigationData={navigationData} sticky={isSticky} />
        <Hero stickyAnchor={stickyAnchor} />
        <About />
        <Work />
        <Skills />
        <Projects />
        {/* <Gallery /> */}
        <Contact />
        <Footer />
      </PortfolioProvider>
    </MuiThemeProvider>
  );
};

export default App;
