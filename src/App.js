import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BooksList from './view/BooksList';
import SearchBooks from './view/SearchBooks';
import BooksGrid from './view/BooksGrid';
import { groupBy, project, compose, assoc, reject, propEq } from 'ramda';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
const groupByShelf = groupBy(({ shelf }) => shelf);
const needProps = ['title', 'authors', 'imageLinks', 'shelf', 'id'];
const projectBook = compose(groupByShelf, project(needProps));

class BooksApp extends React.PureComponent {
  state = {
    books: {},
    search: '',
    index: null,
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    let map = new Map();
    books.forEach(book => {
      map.set(book.id, book);
    });
    this.setState({
      books: projectBook(books),
      index: map,
    });
  }

  onSearch = value => {
    this.setState({ search: value });
  };

  moveBooks = (from, to, book) => {
    if (to === 'none' || from === to) return;
    BooksAPI.update(book, to);

    const newBook = assoc('shelf', to, book);
    this.setState(({ books, index }) => {
      const shelfAddBook = assoc(to, books[to].concat(newBook), books);
      const booksToShelf =
        from !== 'none'
          ? assoc(
              from,
              reject(propEq('id', book.id), books[from]),
              shelfAddBook
            )
          : shelfAddBook;
      index.set(newBook.id, newBook);
      return {
        books: booksToShelf,
        index,
      };
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route
              path="/search"
              render={props => (
                <SearchBooks
                  query={this.state.search}
                  changeSearch={this.onSearch}
                  index={this.state.index}
                  {...props}
                >
                  {books => (
                    <BooksGrid books={books} onMoveBook={this.moveBooks} />
                  )}
                </SearchBooks>
              )}
            />
            <Route
              path="/"
              render={() => (
                <BooksList
                  books={this.state.books}
                  moveBooks={this.moveBooks}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
