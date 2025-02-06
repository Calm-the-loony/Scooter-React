import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../cards/ProductCard';
import "../../style/SearchResults.scss";

const SearchResults = () => {
    const location = useLocation();
    const { results } = location.state || { results: [] };
    return (
        <div className="search-results">
            <h1 className="results-title">Результаты поиска</h1>
            {results.length > 0 ? (
                <div className="products-grid">
                    {results.map((product) => (
                        <ProductCard
                            id={product.id_product}
                            stock={product.quantity_product}
                            type={product.type_pr}
                            brand={product.brand_mark}
                            category={product.id_sub_category}
                            model={product.models}
                            image={product.photo.length > 0? product.photo[0].photo_url : null}
                            name={product.title_product}
                            price={product.price_product}
                            article={product.article_product}
                            extra={product.explanation_product}
                            dimensions={product.weight_product}
                            tags={product.label_product}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-results-wrapper">
                    <p className="no-results">По вашему запросу ничего не найдено.</p>
                    <img 
                        src="https://via.placeholder.com/400x200?text=No+Results+Found" 
                        alt="Нет результатов" 
                        className="no-results-image" 
                    />
                </div>
            )}
        </div>
    );
};

export default SearchResults;
