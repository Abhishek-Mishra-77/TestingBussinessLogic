import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExcelReader from "./components/ExcelReader/ExcelReader";
import Pagination from "./components/Pagination/Pagination";
import CsvReader from "./components/CsvReader/CsvReader";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ExcelReader />} />
      <Route path="/csv" element={<CsvReader />} />
        <Route path="/pagination" element={<Pagination />} />
      </Routes>
    </Router>
  );
}

export default App;
