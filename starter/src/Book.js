import * as BooksAPI from "./BooksAPI";
import PropTypes from 'prop-types';


export function Book({ book, myBooks, setMyBooks }) {
  function handleChange(e) {
    let newShelf = e.target.value;
    // remove the book from the array of books
    let newBooks = myBooks.filter((b) => b.id !== book.id);
    // change the shelf of the book
    book.shelf = newShelf;
    // add the updated book to the array of books
    newBooks = [...newBooks, book];
    setMyBooks(newBooks);
    // update the API
    BooksAPI.update(book, newShelf);
  }

  // recognize the books in the book list when we search
  // when we search the book has no shelf so we add a shelf to it if it was in ours shelves already
  myBooks.forEach(b => {
    if(b.id === book.id ){
      book.shelf = b.shelf
    }
  });

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ""})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select onChange={handleChange} value={book.shelf || 'none'}>
              <option  disabled>
                {book.shelf? 'Move to...': 'Add to...'}
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(", ") : "no authors found"}
        </div>
      </div>
    </li>
  );
}


Book.propTypes={
  book: PropTypes.object.isRequired,
  myBooks: PropTypes.array.isRequired,
  setMyBooks: PropTypes.func.isRequired
}