import React, { Component } from "react";
import BookDataService from "../services/book.service";
import { Link } from "react-router-dom";

export default class BooksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.removeAllBooks = this.removeAllBooks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      books: [],
      currentBook: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveBooks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveBooks() {
    BookDataService.getAll()
      .then(response => {
        this.setState({
          books: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBooks();
    this.setState({
      currentBook: null,
      currentIndex: -1
    });
  }

  setActiveBook(book, index) {
    this.setState({
      currentBook: book,
      currentIndex: index
    });
  }

  removeAllBooks() {
    BookDataService.deleteAll()
      .then(response => {
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentBook: null,
      currentIndex: -1
    });

    BookDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          books: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, books, currentBook, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por título"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de libros</h4>

          <ul className="list-group">
            {books &&
              books.map((book, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBook(book, index)}
                  key={index}
                >
                  {book.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBooks}
          >
            Borrar todos
          </button>
        </div>
        <div className="col-md-6">
          {currentBook ? (
            <div>
              <h4>Libro:</h4>
              <div>
                <label>
                  <strong>Título:</strong>
                </label>{" "}
                {currentBook.title}
              </div>
              <div>
                <label>
                  <strong>Descripción:</strong>
                </label>{" "}
                {currentBook.description}
              </div>
              <div>
                <label>
                  <strong>Año:</strong>
                </label>{" "}
                {currentBook.year}
              </div>
              <div>
                <label>
                  <strong>Estado:</strong>
                </label>{" "}
                {currentBook.published ? "Publicado" : "Pendiente"}
              </div>

              <Link
                to={"/books/" + currentBook.id}
                className="btn btn-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Por favor, haga click sobre un libro...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}