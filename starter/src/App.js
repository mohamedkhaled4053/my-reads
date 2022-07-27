import "./App.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

function App() {
  let [myBooks, setMyBooks] = useState([]);

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
        <Route path="/search" element={<SearchBooks />} />
      </Routes>
    </div>
  );
}

function ListBooks({ myBooks, setMyBooks }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            name="currentlyReading"
            myBooks={myBooks}
            setMyBooks={setMyBooks}
          />
          <BookShelf
            name="wantToRead"
            myBooks={myBooks}
            setMyBooks={setMyBooks}
          />
          <BookShelf name="read" myBooks={myBooks} setMyBooks={setMyBooks} />
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
    let newBooks = myBooks.filter((b) => b.id !== book.id);
    book.shelf = e.target.value
    newBooks = [...newBooks, book]
    setMyBooks(newBooks);
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
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
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
        <div className="book-authors">{book.authors.join(", ")}</div>
      </div>
    </li>
  );
}

function SearchBooks() {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title, author, or ISBN" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  );
}

export default App;
