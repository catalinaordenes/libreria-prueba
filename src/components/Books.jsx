import React, { useEffect, useState } from 'react';


function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json')
            .then(response => response.json())
            .then(books => setBooks(books))
        }, []);

    return (
       
        books.map((book, index) => (
            <div className='card' key={index}>
                <h1>{book.title}</h1>
                <h2>{book.author}</h2>
                <h2>{book.year}</h2>
                <h2>{book.country}</h2>
            </div>
        ))
      
    )
}

export default Books