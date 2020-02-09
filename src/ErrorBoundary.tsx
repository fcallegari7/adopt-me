// mostly code from reactjs.org/docs/error-boundaries.html

import React, { Component, ErrorInfo } from "react";
import { Link, Redirect } from "@reach/router";

// Error Boundaries can only be used with class components. It doesn't work with Hooks.
class ErrorBoundary extends Component {
  public state = { hasError: false, redirect: false };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  // this lifecycle method is called when props or state change. It's similar to useEffect().
  public componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  public render() {
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
    // Render always needs to return something. In this case it works as a pass-through as if it was ignored if there are no errors.
    return this.props.children;
  }
}

export default ErrorBoundary;
