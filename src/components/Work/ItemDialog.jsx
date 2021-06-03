import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Col, Row } from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { schoolType, workType } from '../AppProps';

const itemProps = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dates: PropTypes.string,
  item: PropTypes.oneOfType([workType, schoolType]),
};

export const SchoolDialog = (props) => {
  const { onClose, open, item, dates } = props;
  const handleClose = () => {
    onClose();
  };

  const title = item.college;
  const subtitle = item.major;
  const subtitle1 = item.minor;
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
      <DialogTitle disableTypography>
        <Typography variant="h4">{title}</Typography>
        <DialogContentText>{dates}</DialogContentText>
        <Typography variant="subtitle1">
          <span className="font-weight-bold">Major: </span>
          {subtitle}
        </Typography>
        <Typography variant="body1">
          <span className="font-weight-bold">Minor: </span>
          {subtitle1}
        </Typography>
      </DialogTitle>
    </Dialog>
  );
};

export const WorkDialog = (props) => {
  const { onClose, open, item, dates } = props;

  const handleClose = () => {
    onClose();
  };

  const title = item.company;
  const subtitle = item.team !== '' ? item.team : item.role;
  const subtitle1 = item.role !== subtitle ? item.role : '';
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
      <DialogTitle disableTypography>
        <Typography variant="h4">{title}</Typography>
        <Row>
          <Col className="mr-auto">
            <Typography variant="h5">{subtitle}</Typography>
          </Col>
          <Col>
            <DialogContentText align="right">{dates}</DialogContentText>
          </Col>
        </Row>
        <Typography variant="body1">{subtitle1}</Typography>
      </DialogTitle>
      {item.details && (
        <DialogContent>
          {item.details.map((detail) => (
            <DialogContentText key={detail}>• {detail}</DialogContentText>
          ))}
        </DialogContent>
      )}
    </Dialog>
  );
};

WorkDialog.propTypes = itemProps;
SchoolDialog.propTypes = itemProps;
