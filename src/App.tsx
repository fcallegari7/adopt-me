import React, { useState, lazy, Suspense } from "react";
import { Router } from "@reach/router";
import Details from "./Details";
import SearchParams from "./SearchParams";
import ThemeContext from "./ThemeContext";
import NavBar from "./NavBar";

// ReactDOMServer does not yet support lazy-loaded components and Suspense.
// const Details = lazy(() => import("./Details"));
// const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  // if you want to use more values in the context, you can pass an object instead of a string and work with themeHook.buttonColor, themeHook.headingColor and so on.
  const themeHook = useState("darkblue");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <NavBar />
          {/* <Suspense fallback={<h1>Loading route...</h1>}> */}
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
          {/* </Suspense> */}
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

export default App;
