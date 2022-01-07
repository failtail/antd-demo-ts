import warning from "warning";
import invariant from "invariant";
import React from "react";
import PropTypes from "prop-types";

/**
 * The public API for putting history on context.
 */
class Router extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  static contextTypes = {
    router: PropTypes.object,
  };
  // getChildContext 指定的传递给子组件的属性需要先通过 childContextTypes 来指定， 不然会产生错误
  static childContextTypes = {
    router: PropTypes.object.isRequired,
  };
  //  返回context对象， 指定子组件可以使用的信息
  getChildContext() {
    return {
      router: {
        ...this.context.router,
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match,
        },
      },
    };
  }

  state = {
    match: this.computeMatch(this.props.history.location.pathname),
  };

  computeMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/",
    };
  }

  componentWillMount() {
    const { children, history } = this.props;

    invariant(
      children == null || React.Children.count(children) === 1,
      "A <Router> may have only one child element"
    );

    // Do this here so we can setState when a <Redirect> changes the
    // location in componentWillMount. This happens e.g. when doing
    // server rendering using a <StaticRouter>.
    // 调用history的listen函数，将这个监听函数保存在handles中，等待call， 返回的unlisten函数，在componentWillUnmount时，删除监听
    this.unlisten = history.listen(() => {
      this.setState({
        match: this.computeMatch(history.location.pathname),
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    warning(
      this.props.history === nextProps.history,
      "You cannot change <Router history>"
    );
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { children } = this.props;
    // React.Children提供了处理this.props.children的工具，this.props.children可以任何数据（组件、字符串、函数等等）。
    // React.children有5个方法：React.Children.map()，React.Children.forEach()、React.Children.count()、React.Children.only()、React.Children.toArray()，
    // 通常与React.cloneElement()结合使用来操作this.props.children。
    // 验证children里只有唯一的孩子并返回他。否则这个方法抛出一个错误。
    return children ? React.Children.only(children) : null;
  }
}

export default Router;
