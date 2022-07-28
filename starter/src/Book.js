import * as BooksAPI from "./BooksAPI";


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
            <select onChange={handleChange} value={book.shelf}>
              <option value="none" disabled>
                Move to...
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
