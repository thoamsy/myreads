import React, { PureComponent } from 'react';
import MoveSelect from './MoveSelect';
import PropTypes from 'prop-types';

const coverStyle = {
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: 128,
  height: 192
};

class Book extends PureComponent {
  state = {
    shelf: this.props.shelf || 'none',
    error: null
  }

  onChangeShelf = ({ target }) => {
    this.setState({ shelf: target.value });
  }

  componentDidCatch (error, info) {
    console.log('???', info);
    this.setState({ error: error });
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.shelf && this.state.shelf !== prevState.shelf) {
      this.props.onMoveBook(
        prevState.shelf,
        this.state.shelf,
        this.props
      );
    }
  }

  render () {
    const { imageLinks, title, authors = [] } = this.props;
    const { shelf, error } = this.state;
    // 有些结果没有封面，奇怪……
    const cover = imageLinks ? imageLinks.thumbnail : '';
    return (
      <div className="book">
        <div className="book-top">
          <div
            alt={`The cover of ${title}`}
            className="book-cover"
            style={{
              ...coverStyle,
              backgroundImage: `url(${cover})`
            }}
          />
          <MoveSelect
            currentSelected={shelf}
            onMoveBook={this.onChangeShelf}
          />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(' & ')}</div>
      </div>
    );
  }
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string
  }),
  shelf: PropTypes.string,
  onMoveBook: PropTypes.func.isRequired
};
export default Book;
