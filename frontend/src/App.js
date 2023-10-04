import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Router/Layout";
import Home from "./Router/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
