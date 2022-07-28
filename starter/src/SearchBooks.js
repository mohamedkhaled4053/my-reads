import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { Book } from "./Book";

export function SearchBooks({ myBooks, setMyBooks }) {
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
            onChange={handleChange} />
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
                setMyBooks={setMyBooks} />
            ))
            : "no books found"}
        </ol>
      </div>
    </div>
  );
}
