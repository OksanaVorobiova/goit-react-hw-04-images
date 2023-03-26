import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreBtn } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Container } from './App.styled';
import { getImages } from 'api/api';
import { Notify } from 'notiflix';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  /*state = {
    query: '',
    images: [],
    status: STATUS.IDLE,
    totalHits: 0,
    error: null,
  };*/

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [totalHits, setTotalHits] = useState(0);
  //const [error, setError] = useState(null);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await getImages(query, 1);

        const { hits, totalHits } = res.data;

        if (hits.length !== 0) {
          setImages([...hits]);
          setStatus(STATUS.RESOLVED);
          setTotalHits(totalHits);

          Notify.success(`We found ${totalHits} images`);
        } else {
          setStatus(STATUS.REJECTED);
          Notify.failure('There are no images by this query');
        }
      } catch (error) {
        setStatus(STATUS.REJECTED);
        //  setError(error);
        console.log(error.message);
      }
    }

    loadImages();
  }, [query]);

  /* componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      try {
        getImages(this.state.query, 1).then(res => {
          const { hits, totalHits } = res.data;

          if (hits.length !== 0) {
            this.setState({
              images: [...hits],
              status: STATUS.RESOLVED,
              totalHits: totalHits,
            });

            Notify.success(`We found ${totalHits} images`);
          } else {
            //this.setState({ status: STATUS.REJECTED });
            this.changeStatus(STATUS.REJECTED);

            Notify.failure('There are no images by this query');
          }
        });
      } catch (error) {
        console.log(error.message);
        // this.setState({ status: STATUS.REJECTED });
        this.changeStatus(STATUS.REJECTED);
        this.setState({ error: error.message });

        Notify.failure('There are no images by this query');
      }
    }
  }*/

  const handleFormSubmit = value => {
    setQuery(value);
    setStatus(STATUS.PENDING);
  };

  const loadMoreImages = page => {
    /* try {
      this.setState({ status: STATUS.PENDING });
      getImages(this.state.query, page)
        .then(res =>
          this.setState(({ images }) => ({
            images: [...images, ...res.data.hits],
          }))
        )
        .then(this.changeStatus(STATUS.RESOLVED));
    } catch (error) {
      console.log(error.message);
      this.setState({ error: error.message });
      this.changeStatus(STATUS.REJECTED);
    } */

    setStatus(STATUS.PENDING);
    getImages(query, page)
      .then(res => {
        setImages(prev => [...prev, ...res.data.hits]);
      })
      .then(setStatus(STATUS.RESOLVED))
      .catch(error => {
        setStatus(STATUS.REJECTED);
        //  setError(error);
        console.log(error.message);
      });
  };

  // changeStatus = status => {
  // this.setState({ status });
  //};

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === STATUS.RESOLVED && images.length > 0 && (
        <ImageGallery images={images} />
      )}

      {status === STATUS.RESOLVED && totalHits > images.length && (
        <LoadMoreBtn page={loadMoreImages} />
      )}

      {status === STATUS.PENDING && <Loader />}

      {totalHits === images.length &&
        totalHits !== 0 &&
        Notify.info('That is all we have found')}
    </Container>
  );
};
