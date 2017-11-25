import React from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';
const Bookshelf = ({ books, onMoveBook, shelf }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{shelf}</h2>
    <div className="bookshelf-books">
    {
        !!books.length
          ? <BooksGrid books={books} onMoveBook={onMoveBook}/>
          : <h3>There are no books</h3>
    }
    </div>
  </div>
);

BooksGrid.propTypes = {
  books: PropTypes.array,
  onMoveBook: PropTypes.func.isRequired,
  shelf: PropTypes.string.isRequired
};

export default Bookshelf;
