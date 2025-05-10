import React from "react";
import categories from "../../../data/categories";
import {Link} from "react-router-dom";

const Sidebar = () => (
  <aside className="sidebar">
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
