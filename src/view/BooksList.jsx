import React from 'react'
import Bookshelf from './Bookshelf'
import { groupBy, project, compose, values } from 'ramda'

const groupByShelf = groupBy(({ shelf }) => shelf)
const needProps = ['title', 'authors', 'imageLinks', 'shelf', 'id']
const projectBook = compose(values, groupByShelf, project(needProps))

const BooksList = ({ books }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>
          My Reads
        </h1>
      </div>
      <div className="list-books-content">
        {!!books.length &&
          projectBook(books).map(
            (shelfOfBooks, i) => (
              <Bookshelf
                key={i}
                books={shelfOfBooks} />
            )
          )}
      </div>
    </div>
  )
}

export default BooksList
