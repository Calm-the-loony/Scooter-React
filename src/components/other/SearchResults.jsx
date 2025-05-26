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
{results && results.length > 0 ? (
  <PaginationScooter items={results} type="rounded" />
) : (
  <div className="no-results-wrapper">
    <div className="emoji">🔍</div>
    <p className="no-results">Увы! По вашему запросу ничего не найдено.</p>
    <p className="suggestion">Попробуйте изменить ключевые слова или проверьте орфографию.</p>
  </div>
)}

    </div>
  );
};

export default SearchResults;
