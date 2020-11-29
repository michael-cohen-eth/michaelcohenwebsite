import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-scroll';
import Typist from 'react-typist';

import PortfolioContext from '../../context/context';

const Header = ({ stickyAnchor }) => {
  const { hero } = useContext(PortfolioContext);
  const { title, name, subtitle1, subtitle2, cta } = hero;

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [typistKey, setTypistKey] = useState('');
  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
    setTypistKey('typistKey');
  }, []);

  return (
    <section id="hero" className="jumbotron">
      <Container>
        <Typist left={isDesktop} bottom={isMobile} key={typistKey} cursor={{ show: false }}>
          <h1 className="hero-title">{title}</h1>
          <h2 className="hero-title">
            <Typist.Delay ms={500} />
            {subtitle1} <span className="text-color-main">{name}</span>.
            <br />
            <Typist.Delay ms={500} />
            {subtitle2}
          </h2>
        </Typist>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={6000} distance="30px">
          <p className="hero-cta">
            <span className="cta-btn cta-btn--hero">
              <Link to="about" smooth duration={1000} offset={-70}>
                {cta}
              </Link>
            </span>
          </p>
        </Fade>
      </Container>
      <Container ref={stickyAnchor} />
    </section>
  );
};

export default Header;
