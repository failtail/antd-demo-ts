import warning from "warning";
import React from "react";
import PropTypes from "prop-types";
import { createBrowserHistory as createHistory } from "../history/index.ts";
import Router from "./Router";

/**
 * The public API for a <Router> that uses HTML5 history.
 */
class BrowserRouter extends React.Component {
  static propTypes = {
    basename: PropTypes.string,
    forceRefresh: PropTypes.bool,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
    children: PropTypes.node
  };
// 在BrowserRouter中创建 history对象，在BrowserRouter中创建的是createBrowserHistory
// BrowserHistory 和 HashHistory主要区别一个是监听事件不同，一个是改变url方式不同
  history = createHistory(this.props);

  componentWillMount() {
    warning(
      !this.props.history,
      "<BrowserRouter> ignores the history prop. To use a custom history, " +
        "use `import { Router }` instead of `import { BrowserRouter as Router }`."
    );
  }

  render() {
    // 在 BrowserRouter中， 返回的是Router组件，其参数是 history对象，和BrowserRouter中包裹的children
    return <Router history={this.history} children={this.props.children} />;
  }
}

export default BrowserRouter;
