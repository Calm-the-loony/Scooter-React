import React from "react";
import { useParams } from "react-router-dom";
import categories from "../data/categories";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return <h2>Категория не найдена</h2>;
  }

  return (
    <main className="containers">
      <Sidebar />
      <section className="main-content">
        <div className="breadcrumbs">
          <a href="/">Главная</a> &raquo; <span>{category.name}</span>
        </div>
        <h2>{category.name}</h2>
        <hr className="dashed-line" />
        <section className="cards-container">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default CategoryPage;
