import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BooksList from './view/BooksList';
import SearchBooks from './view/SearchBooks';
import {
  groupBy, project, compose, assoc,
  reject, propEq
} from 'ramda';
const groupByShelf = groupBy(({ shelf }) => shelf);
const needProps = ['title', 'authors', 'imageLinks', 'shelf', 'id'];
const projectBook = compose(groupByShelf, project(needProps));
import { Route } from 'react-router-dom';

class BooksApp extends React.PureComponent {
  state = {
    books: []
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books: projectBook(books) });
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

  render() {
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() =>
            <BooksList
              books={this.state.books}
              moveBooks={this.moveBooks}
            />}
        />
        <Route path="/search" component={SearchBooks} />
      </div>
    );
  }
}

export default BooksApp;
