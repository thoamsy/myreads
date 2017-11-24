import React from 'react';
import PropTypes from 'prop-types';
const titles = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
}
import BooksGrid from './BooksGrid'
const Bookshelf = ({ shelf, books }) => (
  <div className="bookshelf">
    <div className="bookshelf-title">{titles[shelf]}</div>
    <div className="bookshelf-books">
      <BooksGrid books={books}/>
    </div>
  </div>
);

BooksGrid.propTypes = {
  shelf: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Bookshelf;
