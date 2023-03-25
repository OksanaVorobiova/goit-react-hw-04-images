import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ closeModal, src, tags }) => {
  // state = {};

  /* componentDidMount() {
    window.addEventListener('click', this.closeModalByClick);
    window.addEventListener('keydown', this.closeModalByKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeModalByClick);
    window.removeEventListener('keydown', this.closeModalByKeydown);
  } */

  useEffect(() => {
    function closeModalByKeydown(e) {
      if (e.code === 'Escape') {
        closeModal();
      }
    }

    function closeModalByClick({ target }) {
      if (target.nodeName === 'DIV') {
        closeModal();
      }
    }

    window.addEventListener('click', closeModalByClick);
    window.addEventListener('keydown', closeModalByKeydown);

    return () => {
      window.removeEventListener('click', closeModalByClick);
      window.removeEventListener('keydown', closeModalByKeydown);
    };
  }, [closeModal]);

  return (
    <Overlay>
      <ModalWindow>
        <img src={src} alt={tags} />
      </ModalWindow>
    </Overlay>
  );
};
