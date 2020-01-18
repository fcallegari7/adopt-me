// mostly code from reactjs.org/docs/error-boundaries.html

import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

//Error Boundaries can only be used with class components. It doesn't work with Hooks.
class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  //this lifecycle method is called when props or state change. It's similar to useEffect().
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to return to the homepage or wait five seconds.
        </h1>
      );
    }
    //Render always needs to return something. In this case it works as a pass-through as if it was ignored if there are no errors.
    return this.props.children;
  }
}

export default ErrorBoundary;
