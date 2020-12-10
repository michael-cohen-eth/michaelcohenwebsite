import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-scroll';
import Typing, { Cursor } from 'react-typing-animation';
import Typography from '@material-ui/core/Typography';

import { PortfolioConsumer } from '../../context/context';

const Greeting = ({ originalGreeting, typingKey, greetingSubject = '', onTypingDone, cursor }) => {
  let greeting;
  if (typingKey.length === 0 || greetingSubject.length === 0) {
    greeting = '.';
  } else {
    greeting = (
      <>
        <span variant="h1" className="text-color-main-hero">
          <Typing.Delay ms={400} />
          <Typing.Backspace count={5} />
          {greetingSubject}
        </span>
        .
      </>
    );
  }
  return (
    <Typing
      key={typingKey}
      onFinishedTyping={onTypingDone}
      cursor={cursor}
      hideCursor={false}
      speed={30}
    >
      <Typography variant="h1" className="hero-title">
        {originalGreeting}
        {greeting}
      </Typography>
    </Typing>
  );
};

Greeting.propTypes = {
  originalGreeting: PropTypes.string.isRequired,
  typingKey: PropTypes.string.isRequired,
  greetingSubject: PropTypes.string,
  onTypingDone: PropTypes.func.isRequired,
  cursor: PropTypes.node.isRequired,
};

class Hero extends React.Component {
  constructor(props) {
    super(props);
    let greetingSubject;
    if (typeof window !== `undefined`) {
      const { search } = window.location;
      const params = new URLSearchParams(search);
      greetingSubject = params.get('greet') ? params.get('greet') : '';
    } else {
      greetingSubject = '';
    }

    let isDesktop = true;
    let isMobile = false;
    if (typeof window !== `undefined`) {
      if (window.innerWidth > 769) {
        isDesktop = true;
        isMobile = false;
      } else {
        isDesktop = false;
        isMobile = true;
      }
    }

    this.state = {
      isDesktop,
      isMobile,
      typingKey: '',
      typingDone: false,
      headerTypingDone: false,
      greetingSubject,
    };
  }

  componentDidMount() {
    // This is required to properly render the typing animation
    this.setState({
      typingKey: 'typingKey',
    });
  }

  componentDidUpdate() {
    if (typeof window === `undefined`) {
      return;
    }
    if (window.innerWidth > 769) {
      this.setIsDesktop(true);
      this.setIsMobile(false);
    } else {
      this.setIsDesktop(false);
      this.setIsMobile(true);
    }
  }

  setIsDesktop(newDesktopVal) {
    const { isDesktop } = this.state;
    if (isDesktop !== newDesktopVal) {
      this.setState({
        isDesktop: newDesktopVal,
      });
    }
  }

  setIsMobile(newMobileVal) {
    const { isMobile } = this.state;
    if (isMobile !== newMobileVal) {
      this.setState({
        isMobile: newMobileVal,
      });
    }
  }

  setTypingKey(typingKey) {
    this.setState({
      typingKey,
    });
  }

  setHeaderTypingDone = () => {
    this.setState({
      headerTypingDone: true,
    });
  };

  onTypingDone = () => {
    this.setState({
      typingDone: true,
    });
  };

  cursorBuilder = () => <Cursor />;

  render() {
    const { stickyAnchor } = this.props;
    const {
      isDesktop,
      isMobile,
      typingKey,
      typingDone,
      headerTypingDone,
      greetingSubject,
    } = this.state;
    const cursor = <Cursor />;
    return (
      <PortfolioConsumer>
        {(portfolio) => {
          const { title, name, subtitle1, subtitle2, cta } = portfolio.hero;
          return (
            <section id="hero" className="jumbotron">
              <Container fluid>
                <Row>
                  {typingKey && title && subtitle1 && subtitle2 && (
                    <Greeting
                      originalGreeting={title}
                      typingKey={typingKey}
                      greetingSubject={greetingSubject}
                      onTypingDone={this.setHeaderTypingDone}
                      cursor={cursor}
                    />
                  )}
                </Row>
                <Row>
                  {headerTypingDone && subtitle1 && subtitle2 && (
                    <Typing
                      left={isDesktop}
                      bottom={isMobile}
                      key={`${typingKey}-2`}
                      onFinishedTyping={this.onTypingDone}
                      cursor={cursor}
                      hideCursor={false}
                      speed={30}
                    >
                      <Typing.Delay ms={400} />
                      <Typography variant="h2" className="hero-title">
                        {subtitle1} <Typing.Delay ms={200} />
                        <span className="text-color-main-hero">{name}</span>.
                        <Typing.Delay ms={200} />
                        <br />
                        {subtitle2}
                      </Typography>
                    </Typing>
                  )}
                </Row>{' '}
                <Row>
                  <Fade
                    left={isDesktop}
                    bottom={isMobile}
                    duration={1500}
                    distance="30px"
                    when={typingDone}
                  >
                    <div className="hero-cta">
                      <Typography className="cta-btn cta-btn--hero">
                        <Link to="about" smooth duration={1000} offset={-70}>
                          {cta}
                        </Link>
                      </Typography>
                    </div>
                  </Fade>
                </Row>
                <Row ref={stickyAnchor} />
              </Container>
            </section>
          );
        }}
      </PortfolioConsumer>
    );
  }
}

Hero.propTypes = {
  stickyAnchor: PropTypes.node.isRequired,
};
export default Hero;
