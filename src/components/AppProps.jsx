import PropTypes from 'prop-types';

export const workType = PropTypes.shape({
  company: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  color: PropTypes.string,
  details: PropTypes.arrayOf(PropTypes.string),
  start: PropTypes.shape({
    nanoseconds: PropTypes.number,
    seconds: PropTypes.number,
  }),
  end: PropTypes.shape({
    nanoseconds: PropTypes.number,
    seconds: PropTypes.number,
  }),
});

export const schoolType = PropTypes.shape({
  college: PropTypes.string.isRequired,
  major: PropTypes.string.isRequired,
  minor: PropTypes.string.isRequired,
  color: PropTypes.string,
  start: PropTypes.shape({
    nanoseconds: PropTypes.number,
    seconds: PropTypes.number,
  }),
  end: PropTypes.shape({
    nanoseconds: PropTypes.number,
    seconds: PropTypes.number,
  }),
});

export const skillType = PropTypes.shape({
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

export const serviceType = PropTypes.shape({
  service: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});
