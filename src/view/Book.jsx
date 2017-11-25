import React from 'react';
import MoveSelect from './MoveSelect';
import PropTypes from 'prop-types';

const coverStyle = {
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: 128,
  height: 192
};

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div
        alt={`The cover of ${props.title}`}
        className="book-cover"
        style={{
          ...coverStyle,
          backgroundImage: `url(${props.coverSrc})`
        }}
      />
      <MoveSelect currentSelected={props.shelf}/>
    </div>
    <div className="book-title">{props.title}</div>
    <div className="book-authors">{props.authors.join('\n')}</div>
  </div>
);

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  coverSrc: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired
};
export default Book;
