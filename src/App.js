import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BooksList from './view/BooksList';
import SearchBooks from './view/SearchBooks';
import { BrowserRouter, Route } from 'react-router-dom'; 

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route
            path="/"
            exact
            render={() => <BooksList books={this.state.books} />} />
          <Route path="/search" component={SearchBooks}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
