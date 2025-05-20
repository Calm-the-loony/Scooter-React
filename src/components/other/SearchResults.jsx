import React from "react";
import { useLocation } from "react-router-dom";
import "../../style/SearchResults.scss";
import PaginationScooter from "./pagination/Pagination";

const SearchResults = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <div className="search-results">
      <h1 className="results-title">Результаты поиска</h1>
      <PaginationScooter items={results} type="rounded" />
    </div>
  );
};

export default SearchResults;
