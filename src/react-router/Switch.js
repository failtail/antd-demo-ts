import React from "react";
import PropTypes from "prop-types";
import warning from "warning";
import invariant from "invariant";
import matchPath from "./matchPath";

/**
 * The public API for rendering the first <Route> that matches.
 */
class Switch extends React.Component {
  // 调用context先定义静态属性，根据约定好的参数类型，否则会出现未定义
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.object.isRequired,
    }).isRequired,
  };

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
  };

  componentWillMount() {
    invariant(
      this.context.router,
      "You should not use <Switch> outside a <Router>"
    );
  }

  componentWillReceiveProps(nextProps) {
    warning(
      !(nextProps.location && !this.props.location),
      '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    );

    warning(
      !(!nextProps.location && this.props.location),
      '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    );
  }

  render() {
    const { route } = this.context.router;
    const { children } = this.props;
    const location = this.props.location || route.location;

    let match, child;
    React.Children.forEach(children, (element) => {
      if (match == null && React.isValidElement(element)) {
        // 此时的element, 就是 <Route exact path="/" component={Home} />中的一个
        // todo 这些属性具体是什么作用
        const {
          path: pathProp,
          exact,
          strict,
          sensitive,
          from,
        } = element.props;
        const path = pathProp || from;

        child = element;
        // 如果 此时浏览器地址的url和 Route对应的路径匹配上了， 就渲染那个Route， 绑定了location, computedMatch两个props
        match = matchPath(
          // 此时浏览器地址的url
          location.pathname,
          // path是Route对应的路径
          { path, exact, strict, sensitive },
          route.match
        );
      }
    });
    return match
      ? React.cloneElement(child, { location, computedMatch: match })
      : null;
  }
}

export default Switch;
