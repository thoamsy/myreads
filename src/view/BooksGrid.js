import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
const BooksGrid = ({ books, onMoveBook }) => (
  <ol className="books-grid">
    {
      !!books.length && books.map(( book ) => (
        <li key={book.id}>
          <Book
            { ...book }
            onMoveBook={onMoveBook}
          />
        </li>
      ))
    }
  </ol>
);

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })).isRequired,
  onMoveBook: PropTypes.func.isRequired
};

export default BooksGrid;
