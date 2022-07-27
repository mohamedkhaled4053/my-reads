import "./App.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

function App() {
  let [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((res) => setMyBooks(res));
  });

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ListBooks myBooks={myBooks}/>} />
        <Route path="/search" element={<SearchBooks />} />
      </Routes>
    </div>
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

function ListBooks({myBooks}) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShilf name='currentlyReading' myBooks={myBooks}/>
          <BookShilf name='wantToRead'myBooks={myBooks}/>
          <BookShilf name='read'myBooks={myBooks}/>

        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

function BookShilf({name, myBooks}) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <Book />
          <Book />
        </ol>
      </div>
    </div>
  );
}

function Book() {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
            }}
          ></div>
          <div className="book-shelf-changer">
            <select>
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
        <div className="book-title">To Kill a Mockingbird</div>
        <div className="book-authors">Harper Lee</div>
      </div>
    </li>
  );
}

export default App;
