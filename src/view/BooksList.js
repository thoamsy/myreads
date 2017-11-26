import React from 'react';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';

const titles = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
};

const BooksList = (props) => {
  const books = Object.entries(props.books);
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>
          My Reads
        </h1>
      </div>
      <div className="list-books-content">
        {!!books.length ?
          books.map(
            ([shelf, shelfOfBooks], i) => (
              <Bookshelf
                onMoveBook={props.moveBooks}
                shelf={titles[shelf]}
                key={i}
                books={shelfOfBooks} />
            )
          ) : <h3>加载中……</h3>}
      </div>
      <div className="open-search">
        <Link to='/search'>Add a Book</Link>
      </div>
    </div>
  );
};

BooksList.propTypes = {
  books: PropTypes.shape({
    currentlyReading: PropTypes.array,
    read: PropTypes.array,
    wantToRead: PropTypes.array
  }),
  moveBooks: PropTypes.func.isRequired
};

export default BooksList;
