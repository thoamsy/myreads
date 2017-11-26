import React from 'react';
const options = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read',
  none: 'None'
};

const MoveSelect = ({ currentSelected, onMoveBook }) => {
  return (
    <div className="book-shelf-changer">
      <select
        value={currentSelected}
        onChange={onMoveBook}
      >
        <option disabled>
          Move to...
      </option>
        {
          Object.entries(options).map(([value, text]) => (
            <option
              value={value}
              key={value}
            >{text}</option>
          ))
        }
      </select>
    </div>
  );
};

MoveSelect.defaultProps = {
  currentSelected: 'none'
};

export default MoveSelect;
