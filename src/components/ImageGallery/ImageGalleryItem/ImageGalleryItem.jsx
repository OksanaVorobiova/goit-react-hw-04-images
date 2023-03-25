import { useState } from 'react';
import { ImageCard } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  //state = {
  //showModal: false,
  //};

  const [showModal, setShowModal] = useState(false);

  /*const handleItemClick = e => {
    //this.setState({ showModal: true });
    setShowModal(true);
  };

  const closeModal = () => {
    //this.setState({ showModal: false });
    setShowModal(false);
  }; */

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  //const { webformatURL, largeImageURL, tags } = this.props;

  return (
    <>
      <ImageCard onClick={toggleModal}>
        <img src={webformatURL} alt={tags} />
      </ImageCard>

      {showModal && (
        <Modal src={largeImageURL} tags={tags} closeModal={toggleModal} />
      )}
    </>
  );
};
