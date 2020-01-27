import express from "express";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));

app.use((req, res) => {
  //load header and css right away.
  res.write(parts[0]);
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  //inserts the react markup in the "not rendered" place. It loads your react app one piece at a time.
  const stream = renderToNodeStream(reactMarkup);

  //Render all the pieces. Don't end until it's done.
  stream.pipe(res, { end: false });

  //Once finished, write the final part of the html and then end.
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log("listening on " + PORT);

app.listen(PORT);
