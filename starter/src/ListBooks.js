import { Link } from "react-router-dom";
import { BookShelf } from "./BookShelf";

export function ListBooks({ myBooks, setMyBooks }) {
  // make array of shelves names
  let shelvesNames = ['currentlyReading', 'wantToRead', 'read'];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelvesNames.map((shelf) => (
            <BookShelf
              key={shelf}
              name={shelf}
              myBooks={myBooks}
              setMyBooks={setMyBooks} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}
