import React, { FC, Component } from "react";
import Switch from "./react-router-dom/Switch";
import Route from "./react-router-dom/Route";
import Link from "./react-router-dom/Link";

import "./App.css";
// /* Home component */
// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// );

// /* Category component */
// const Category = () => (
//   <div>
//     <h2>Category</h2>
//   </div>
// );

// /* Products component */
// const Products = () => (
//   <div>
//     <h2>Products</h2>
//   </div>
// );

// const App: FC = () => (
//   <div>
//     <nav className="navbar navbar-light">
//       <ul className="nav navbar-nav">
//         <li>
//           <Link to="/">Homes</Link>
//         </li>
//         <li>
//           <Link to="/category">Category</Link>
//         </li>
//         <li>
//           <Link to="/products">Products</Link>
//         </li>
//       </ul>
//     </nav>

//     <Switch>
//       <Route exact path="/" component={Home} />
//       <Route path="/category" component={Category} />
//       <Route path="/products" component={Products} />
//     </Switch>
//   </div>
// );
class App extends Component {
  
  add = (e:any) =>{
    console.log('原生dom事件',e?.nativeEvent);
    
  }
  render() {

    return (
      <div className="App">
      <h3>合成时间保存了原生DOM事件的引用</h3>
      <button onClick={this.add}>点击我</button>
      </div>
    );
  }
}

export default App;
