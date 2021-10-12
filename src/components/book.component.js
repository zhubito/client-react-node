import React, { Component } from "react";
import BookDataService from "../services/book.service";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.getBook = this.getBook.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);

    this.state = {
      currentBook: {
        id: null,
        title: "",
        description: "",
        year: null,
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getBook(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        description: description
      }
    }));
  }

  onChangeYear(e) {
    const year = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        year: year
      }
    }));
  }


  getBook(id) {
    BookDataService.get(id)
      .then(response => {
        this.setState({
          currentBook: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentBook.id,
      title: this.state.currentBook.title,
      description: this.state.currentBook.description,
      published: status
    };

    BookDataService.update(this.state.currentBook.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentBook: {
            ...prevState.currentBook,
            published: status
          }
        }));
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBook() {
    BookDataService.update(
      this.state.currentBook.id,
      this.state.currentBook
    )
      .then(response => {
        this.setState({
          message: "El libro fue actualizado Satisfactoriamente!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBook() {    
    BookDataService.delete(this.state.currentBook.id)
      .then(response => {
        this.props.history.push('/books')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBook } = this.state;

    return (
      <div>
        {currentBook ? (
          <div className="edit-form">
            <h4>Libro</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBook.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentBook.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Año</label>
                <input
                  type="text"
                  className="form-control"
                  id="year"
                  value={currentBook.year}
                  onChange={this.onChangeYear}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Estado:</strong>
                </label>
                {currentBook.published ? "Publicado" : "Pendiente"}
              </div>
            </form>

            {currentBook.published ? (
              <button
                className="btn btn-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                Despublicar
              </button>
            ) : (
              <button
                className="btn btn-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publicar
              </button>
            )}

            <button
              className="btn btn-danger mr-2"
              onClick={this.deleteBook}
            >
              Borrar
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateBook}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor haz click sobre un libro...</p>
          </div>
        )}
      </div>
    );
  }
}