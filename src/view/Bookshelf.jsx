import React from 'react';
import PropTypes from 'prop-types';
const titles = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
}
import BooksGrid from './BooksGrid'
const Bookshelf = ({ books }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{titles[books[0].shelf]}</h2>
    <div className="bookshelf-books">
      <BooksGrid books={books}/>
    </div>
  </div>
);

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    shelf: PropTypes.string.isRequired
  })).isRequired
}

export default Bookshelf;
