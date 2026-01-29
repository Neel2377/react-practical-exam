import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Addproduct from "./components/Addproduct";
import Viewproduct from "./components/Viewproduct";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Addproduct />} />
        <Route path="/view-product" element={<Viewproduct />} />
      </Routes>
    </>
  );
};

export default App;
