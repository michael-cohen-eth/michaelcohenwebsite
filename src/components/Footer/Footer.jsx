import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { Navbar } from 'react-bootstrap';
import PortfolioContext from '../../context/context';
import GithubButtons from '../GithubButtons/GithubButtons';
import LogoImg from '../Image/LogoImg';

import { githubButtons } from '../../mock/data';

const Footer = () => {
  const { footer } = useContext(PortfolioContext);
  const { networks } = footer;
  const { isEnabled } = githubButtons;

  return (
    <footer className="footer navbar-static-bottom">
      <Container>
        <span className="back-to-top">
          <Link to="hero" smooth duration={1000}>
            <i className="fa fa-angle-up fa-2x" aria-hidden="true" />
          </Link>
        </span>
        <div className="social-links">
          {networks &&
            networks.map((network) => {
              const { id, name, url } = network;
              return (
                <a
                  key={id}
                  href={url || 'https://github.com/cobidev/mickeyjk'}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={name}
                >
                  <i className={`fa fa-${name || 'refresh'} fa-inverse`} />
                </a>
              );
            })}
        </div>
        <hr />
        <p className="footer__text">
          © {new Date().getFullYear()} - Designed and developed by{' '}
          <a href="https://github.com/mickeyjk" target="_blank" rel="noopener noreferrer">
            Michael Cohen
          </a>
          {' '}with a ton of help from the internet!
        </p>

        {isEnabled && <GithubButtons />}
      </Container>
      <Navbar className="navbar">
        <li className="navbar nav-link" key="footer-logo">
          <Link to="home" duration={1000} smooth spy>
            <LogoImg className="ml-auto" alt="Michael Cohen" filename="logo_foot.png" />
          </Link>
        </li>
      </Navbar>
    </footer>
  );
};

export default Footer;
