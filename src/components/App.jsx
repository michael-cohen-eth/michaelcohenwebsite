/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import useSticky from '../hooks/useSticky.js';
import Navigation from './Header/Navbar';
import Hero from './Hero/Hero';
import About from './About/About';
import Projects from './Projects/Projects';
import Work from './Work/Work';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';

import { PortfolioProvider } from '../context/context';

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
  }, []);

  // TODO: Add 'Home' empty component for anchoring
  return (
    <PortfolioProvider value={{ hero, about, projects, contact, footer }}>
      <span id="home" />
      <Navigation navigationData={navigationData} sticky={isSticky} />
      <Hero stickyAnchor={stickyAnchor} />
      <About />
      <Work workData={[]} />
      <Projects />
      <Contact />
      <Footer />
    </PortfolioProvider>
  );
};

export default App;
