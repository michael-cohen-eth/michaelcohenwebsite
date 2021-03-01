/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'gatsby-plugin-firebase';
import { Container } from 'react-bootstrap';
import { NFTE } from '@nfte/react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Title from '../Title/Title';
import { galleryType } from '../AppProps';

const GalleryItem = ({ itemData }) => {
  return (
    <NFTE key={itemData.name} contract={itemData.contractAddress} tokenId={itemData.tokenId} />
  );
};

GalleryItem.propTypes = {
  itemData: galleryType,
};

const GallerySection = ({ sectionTitle, sectionData }) => {
  return (
    <Paper className="gallery-section" elevation={0}>
      <Typography variant="h4" className="section-title">
        {sectionTitle}
      </Typography>
      {Object.keys(sectionData).map((artistKey) => {
        return (
          <NFTE
            darkMode
            key={sectionData[artistKey].name}
            contract={sectionData[artistKey].contractAddress}
            tokenId={sectionData[artistKey].tokenId}
          />
        );
      })}
    </Paper>
  );
};

GallerySection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  sectionData: PropTypes.shape.isRequired,
};

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('collectables')
      .get()
      .then((snapshot) => {
        snapshot.forEach((newCollection) => {
          setGallery((g) => [...g, { [newCollection.id]: newCollection.data() }]);
        });
      });
  }, []);
  const galleryObj = gallery.reduce((map, obj) => {
    Object.keys(obj).forEach((galleryTree) => {
      map[galleryTree] = obj[galleryTree];
    });
    return map;
  }, {});
  return (
    <section id="gallery">
      <Container className="gallery-wrapper">
        <Title title="Gallery" />
        {Object.keys(galleryObj).map((galleryKey) => (
          <GallerySection sectionTitle={galleryKey} sectionData={galleryObj[galleryKey]} />
        ))}
      </Container>
    </section>
  );
};

export default Gallery;
