import { useState } from 'react';
import { Button } from './Button.styled';

export const LoadMoreBtn = ({ page }) => {
  /* state = {
    pageToFetch: 2,
  }; */

  const [pageToFetch, setPageToFetch] = useState(2);

  const handleClick = e => {
    //this.props.page(this.state.page);
    page(pageToFetch);
    setPageToFetch(prev => prev + 1);
    //this.setState({ page: this.state.page + 1 });
  };

  return (
    <Button type="button" onClick={handleClick}>
      Load more
    </Button>
  );
};
