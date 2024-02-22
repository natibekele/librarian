import React, { MouseEventHandler, useEffect } from "react";
import anime from "animejs";
import { Book } from "../types/BookInterfaces";
import "./Book.css";
import { v4 as uuid } from "uuid";

export const BookCard: React.FC<Book> = (book) => {
  const {
    title,
    author_name,
    first_publish_year,
    isbn,
    number_of_pages_median,
  } = book;

  useEffect(() => {
    anime({
      targets: ".book-details",
      opacity: 1,
      delay: 100,
      duration: 300,
      translateY: 0,
    });
  }, []);
  return (
    <div className="book-details">
      <h2 className="book-details__title">{title}</h2>
      <p className="book-details__author">Author: {author_name}</p>
      <p className="book-details__date">
        First Published: {first_publish_year}
      </p>
      <p className="book-details__isbn">ISBN: {isbn}</p>
      <p className="book-details__pages">
        Number of Pages: {number_of_pages_median}
      </p>
    </div>
  );
};
