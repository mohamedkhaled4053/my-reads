import "./App.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

function App() {
  let [myBooks, setMyBooks] = useState([]);

  // get list of books from API
  useEffect(() => {
    BooksAPI.getAll().then((res) => setMyBooks(res));
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<ListBooks myBooks={myBooks} setMyBooks={setMyBooks} />}
        />
        <Route
          path="/search"
          element={<SearchBooks myBooks={myBooks} setMyBooks={setMyBooks} />}
        />
      </Routes>
    </div>
  );
}

function ListBooks({ myBooks, setMyBooks }) {
  // make array of shelfs names
  let shelfsNames = ['currentlyReading','wantToRead','read'];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfsNames.map((shelf) => (
            <BookShelf
              key={shelf}
              name={shelf}
              myBooks={myBooks}
              setMyBooks={setMyBooks}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

function BookShelf({ name, myBooks, setMyBooks }) {
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
              setMyBooks={setMyBooks}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

function Book({ book, myBooks, setMyBooks }) {
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
              backgroundImage: `url(${
                book.imageLinks ? book.imageLinks.thumbnail : ""
              })`,
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

function SearchBooks({ myBooks, setMyBooks }) {
  let [searchedBooks, setSearchedBooks] = useState([]);
  let [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    let mounted = true;
    if (query) {
      BooksAPI.search(query, 20).then((res) => {
        if (mounted) {
          !res.error ? setSearchedBooks(res) : setSearchedBooks([]);
        }
      });
    } else {
      setSearchedBooks([]);
    }

    return () => {
      mounted = false;
    };
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks.length !== 0
            ? searchedBooks.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  myBooks={myBooks}
                  setMyBooks={setMyBooks}
                />
              ))
            : "no books found"}
        </ol>
      </div>
    </div>
  );
}

export default App;
