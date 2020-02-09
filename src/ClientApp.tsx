import React from "react";
import { hydrate } from "react-dom";
import App from "./App";

// any other browser-only things

// take over the existing markup (don't re-render). If we use render instead of hydrate, it will blow away every existing markup, and re-render everything.
hydrate(<App />, document.getElementById("root"));
