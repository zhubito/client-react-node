import React, { Component } from "react";
import BookDataService from "../services/book.service";

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.newBook = this.newBook.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      year: null, 
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeYear(e) {
    if(isNaN(e.target.value)){
      return; //Solo numeros
    } else {
      this.setState({
        year: e.target.value
      });
    }
    
  }

  saveBook() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      year: this.state.year,
    };

    BookDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          year: response.data.year,
          published: response.data.published,

          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newBook() {
    this.setState({
      id: null,
      title: "",
      description: "",
      year: null,
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Libro agregado satisfactoriamente!</h4>
            <button className="btn btn-success" onClick={this.newBook}>
              Agregar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="description">Año</label>
              <input
                type="text"
                className="form-control"
                id="year"
                required
                value={this.state.year}
                onChange={this.onChangeYear}
                name="year"
              />
            </div>

            <button onClick={this.saveBook} className="btn btn-success mt-3">
              Agregar Libro
            </button>
          </div>
        )}
      </div>
    );
  }
}