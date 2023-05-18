import React, { useEffect, useState } from 'react';


function Books() {
    // Aquí definimos los estados iniciales utilizando el hook useState.
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    //Variable que utilizaremos para la paginación
    const booksPerPage = 20;

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json')
            // Una vez que haga fetch, se obtiene una respuesta que es convertida en un objeto json que podemos manipular
            .then(response => response.json())
            .then(books => {
                // La información que tenemos ya en json, se la pasamos a los hooks de estado (setBooks y setFilteredBooks)
                setBooks(books);
                // 
                setFilteredBooks(books);
            });
    }, []);

    // Cálculo de los libros actuales, calcula el índice del primer y último libro de la pág actual
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Cambiar a la página siguiente
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Cambiar a la página anterior
    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Función para manejar el cambio en el filtro
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Filtrar los libros por título, autor, año o país 
    useEffect(() => {
        const filtered = books.filter(
            book =>
                book.title.toLowerCase().includes(filter.toLowerCase()) ||
                book.author.toLowerCase().includes(filter.toLowerCase()) ||
                book.year.toString().includes(filter) ||
                book.country.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredBooks(filtered);
        setCurrentPage(1); // Resetear la página actual al aplicar un filtro
    }, [books, filter]);


    return (
        <div>
            <div className='filtro'>
                <input className='inputFiltro' type="text" value={filter} onChange={handleFilterChange} placeholder="Filtrar por título, autor, año o país" />
            </div>
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
                    //Produce el cambio de apariencia del botón 'anterior' en la primera página, y después la normaliza en las siguientes
                    className={currentPage === 1 ? 'boton1off' : 'boton1on'}
                    onClick={previousPage}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <button
                    onClick={nextPage}
                    //Produce el cambio de apariencia del botón siguiente cuando llega a la última página
                    className={`boton2 ${indexOfLastBook >= filteredBooks.length || currentBooks.length === 0 ? 'boton2off' : 'boton2on'}`}
                    disabled={indexOfLastBook >= filteredBooks.length || currentBooks.length === 0}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Books;
