import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { SearchBooks } from "./SearchBooks";
import { ListBooks } from "./ListBooks";

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

export default App;
