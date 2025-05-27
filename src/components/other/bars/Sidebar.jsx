import React from "react";
import categories from "../../../data/categories";
import { Link } from "react-router-dom";

const Sidebar = ({ isMobile, toggleSidebar }) => (
  <aside className={`sidebar ${isMobile ? "mobile-sidebar" : ""}`}>
    {isMobile && (
      <button className="close-sidebar" onClick={toggleSidebar}>
        &times;
      </button>
    )}
    <nav className="categories-nav">
      <h2>Категории</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;