import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types'
import { pick } from 'ramda'
const BookGrid = ({ books }) => (
  <ol className="books-grid">
    {
      !!books.length && books.map(( book ) => (
        <li key={book.id}>
          <Book
            key={book.id}
            { ...pick(['title', 'authors'], book) }
            coverSrc={book.imageLinks.thumbnail}
          />
        </li>
      ))
    }
  </ol>
);

BookGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })).isRequired
}

export default BookGrid;
