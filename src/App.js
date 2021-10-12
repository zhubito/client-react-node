import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import BooksList from "./components/books-list.component";
import AddBook from "./components/add-book.component";
import Book from "./components/book.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/books" className="navbar-brand">
            Multi-Libros
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/books"} className="nav-link">
                Libros
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Agregar
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/books"]} component={BooksList} />
            <Route exact path="/add" component={AddBook} />
            <Route path="/books/:id" component={Book} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;