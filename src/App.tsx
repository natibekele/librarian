import { useState, useEffect } from "react";
import { Search } from "./components/Search";
import { WavyCircleLoader } from "./components/WavyCircleLoader";
import { BookCard } from "./components/BookCard";
import { Book } from "./types/BookInterfaces";
import anime from "animejs";
import "./App.css";
import { v4 as uuid } from "uuid";

function App() {
  const [bookResults, setBookResults] = useState<Book[]>([]);
  const [booksByPublish, setBooksByPublish] = useState<Book[]>([]);
  const [sortMode, setSortMode] = useState<string>("default");
  const [loading, setLoading] = useState<boolean>(false);

  const API_ENDPOINT = "https://openlibrary.org/search.json?q=";

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.length == 0) return;
    //hit the api and get the books.
    setLoading(true);
    console.log("handle search called.", searchTerm);
    const res = await fetch(`${API_ENDPOINT}${searchTerm}`);
    const books = await res.json();
    setBookResults(books.docs);
    const toSort = [...books.docs];
    toSort.sort((a: Book, b: Book) => {
      if (
        a.first_publish_year === undefined &&
        b.first_publish_year === undefined
      ) {
        return 0; // Consider them equal if both are undefined
      }
      if (a.first_publish_year === undefined) {
        return 1;
      }
      if (b.first_publish_year === undefined) {
        return -1;
      }
      return a.first_publish_year - b.first_publish_year;
    });
    setBooksByPublish(toSort);
    setLoading(false);
  };

  useEffect(() => {
    var tl = anime.timeline({
      duration: 400,
      delay: 400,
      easing: "easeOutExpo",
    });
    tl.add({
      targets: ".title",
      opacity: 1,
      translateY: 0,
    }).add({
      targets: [".sort", ".sort-button"],
      opacity: 1,
      translateX: 0,
    });
  }, []);

  return (
    <div className="container">
      <h1 className="title"> Your Librarian </h1>
      <Search onSearch={handleSearch} />
      <div className="row">
        <h3 className="sort"> Sort: </h3>
        <button onClick={() => setSortMode("date")} className="sort-button">
          By Date
        </button>
        <button onClick={() => setSortMode("default")} className="sort-button">
          By Relevance
        </button>
      </div>
      <WavyCircleLoader visible={loading} />
      <div className="book-grid">
        {sortMode === "default"
          ? bookResults.map((book, index) => (
              <BookCard key={uuid()} {...book} />
            ))
          : booksByPublish.map((book, index) => (
              <BookCard key={uuid()} {...book} />
            ))}
      </div>
    </div>
  );
}

export default App;
