import { useState } from 'react';
import { SearchbarStyled } from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';

export const Searchbar = ({ onSubmit }) => {
  // state = {
  //    query: '',
  // };

  const [query, setQuery] = useState('');

  const handleChange = ({ target: { value } }) => {
    //  this.setState({ query: e.target.value });
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <SearchbarStyled>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <AiOutlineSearch size="30px" color="black" />
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </SearchbarStyled>
  );
};
