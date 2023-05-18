import React, { useEffect, useState } from 'react';


function Books() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 20;


    useEffect(() => {
        fetch('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json')
            .then(response => response.json())
            .then(books => setBooks(books))
    }, []);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    // Cambiar a la página siguiente
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Cambiar a la página anterior
    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div>
          {currentBooks.map((book, index) => (
            <div className='card' key={index}>
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>
              <h2>{book.year}</h2>
              <h2>{book.country}</h2>
            </div>
          ))}
          <div className='botones'>
            <button
              className={currentPage === 1 ? 'boton1off' : 'boton1on'}
              onClick={previousPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <button
              className='boton2'
              onClick={nextPage}
              disabled={indexOfLastBook >= books.length}
            >
              Siguiente
            </button>
          </div>
        </div>
      );
    };
    
    export default Books;