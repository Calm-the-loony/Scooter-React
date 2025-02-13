import { Pagination, Stack } from "@mui/material";
import { useState, Fragment, useEffect } from "react";
import ProductCard from "../../cards/ProductCard";


function PaginationScooter({items, type = "rounded"}) {
    
    // Продукты
    const [products, setProducts] = useState([]);
    
    // Страница
    const [currentPage, setCurrentPage] = useState(1);

    // Настройки
    const spacing = 2;
    const maxLength = 10;


    /**
     * Переход между страницами
     * @param {*} e 
     */
    const changePage = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({top: 0, behavior: "smooth"});
    
        let pageProductsList = [];
        let cnt = 0;
        value--;
    
        while (cnt < maxLength) {
          if ((maxLength*value+cnt) >= items.length) {
            break;
          } else {
            pageProductsList.push(items[maxLength*value+cnt]);
          }
          cnt++;
        }
    
        // Установка продуктов на страницу
        setProducts(pageProductsList);
    }


    /**
     * Прослушивание изменения items
     */
    useEffect(() => {
        if (items) {
            setProducts([...items]);
            changePage(null, currentPage);
        }
    }, [items]);


    return (
        <Fragment>
            <div className="cards-container">
                {products.length > 0 ? (
                    products.map((product) => (
                    <ProductCard 
                        id={product.id_product}
                        stock={product.quantity_product}
                        type={product.type_pr}
                        brand={product.brand_mark}
                        category={product.id_sub_category}
                        model={product.models}
                        image={product.photo[0]? product.photo[0].photo_url : null}
                        name={product.title_product}
                        price={product.price_product}
                        article={product.article_product}
                        extra={product.explanation_product}
                        dimensions={product.weight_product}
                        tags={product.label_product}
                    />
                    ))
                ) : (
                    <div className="no-products">
                    <p>Товаров, соответствующих вашему запросу, не обнаружено.</p>
                    </div>
                )}
            </div>
            <Stack spacing={spacing} alignItems="center">
                <Pagination 
                count={Math.round((items.length > products.length ? items.length : products.length) / maxLength)}
                shape={type}
                page={currentPage}
                onChange={(changePage)}
                />
            </Stack>
        </Fragment>
    )
}


export default PaginationScooter;