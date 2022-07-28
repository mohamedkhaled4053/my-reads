import { Book } from "./Book";
import PropTypes from 'prop-types';

export function BookShelf({ name, myBooks, setMyBooks }) {
  let books = myBooks.filter((book) => book.shelf === name);
  return (
    <div className="bookshelf">
      <h2 style={{ textTransform: "capitalize" }} className="bookshelf-title">
        {name.replace(/([A-Z])/g, " $1")}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              myBooks={myBooks}
              setMyBooks={setMyBooks} />
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes  = {
  name: PropTypes.string.isRequired,
  myBooks: PropTypes.array.isRequired,
  setMyBooks: PropTypes.func.isRequired
}