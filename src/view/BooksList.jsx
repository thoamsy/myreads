import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';
import {
  groupBy, project, compose, assoc,
  reject, propEq
} from 'ramda';
import { Link } from 'react-router-dom';

const groupByShelf = groupBy(({ shelf }) => shelf);
const needProps = ['title', 'authors', 'imageLinks', 'shelf', 'id'];
const projectBook = compose(groupByShelf, project(needProps));
const titles = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
};

class BooksList extends PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    books: []
  }

  moveBooks = (from, to, book) => {
    if (to === 'none') return; 
    this.setState(({ books }) => {
      const shelfAddBook = assoc(
        to,
        books[to].concat(assoc('shelf', to, book)),
        books
      );
      const booksToShelf = assoc(
        from,
        reject(propEq('id', book.id), books[from]),
        shelfAddBook
      );
      return {
        books: booksToShelf
      };
    });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.books.length !== nextProps.books.length) {
      this.setState({
        books: projectBook(nextProps.books)
      });
    }
  }

  render () {
    const books = Object.entries(this.state.books);
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
                  onMoveBook={this.moveBooks}
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
  }
};

export default BooksList;
