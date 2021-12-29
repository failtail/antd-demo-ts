import React, { FC } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

/* Category component */
const Category = () => (
  <div>
    <h2>Category</h2>
  </div>
);

/* Products component */
const Products = () => (
  <div>
    <h2>Products</h2>
  </div>
);

const App: FC = () => (
  <div>
    <nav className="navbar navbar-light">
      <ul className="nav navbar-nav">
        <li>
          <Link to="/">Homes</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/category" component={Category} />
      <Route path="/products" component={Products} />
    </Switch>
  </div>
);

export default App;
