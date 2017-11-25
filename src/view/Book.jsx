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
    shelf: this.props.shelf
  }

  onChangeShelf = ({ target }) => {
    this.setState({ shelf: target.value });
  }

  componentDidUpdate (prevProps, prevState) {
    this.props.onMoveBook(
      prevState.shelf,
      this.state.shelf,
      this.props
    );
  }

  render () {
    const { props } = this;
    const { shelf } = this.state;
    return (
      <div className="book">
        <div className="book-top">
          <div
            alt={`The cover of ${props.title}`}
            className="book-cover"
            style={{
              ...coverStyle,
              backgroundImage: `url(${props.imageLinks.thumbnail})`
            }}
          />
          <MoveSelect
            currentSelected={shelf}
            onMoveBook={this.onChangeShelf}
          />
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.authors.join('\n')}</div>
      </div>
    );
  }
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string
  }).isRequired,
  shelf: PropTypes.string.isRequired,
  onMoveBook: PropTypes.func.isRequired
};
export default Book;
