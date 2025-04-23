import { Pagination, Stack } from "@mui/material";
import { useState, Fragment, useEffect } from "react";

import ProductCard from "../../cards/ProductCard";
import NotFoundProducts from "../../notFound/notFoundProducts";


function PaginationScooter({items, type = "rounded", typePagination='product', methods={}}) {
    
    // Продукты
    const [dataItems, setItems] = useState([]);
    
    // Страница
    const [currentPage, setCurrentPage] = useState(1);

    const [notFoundProducts, setNotFoundProducts] = useState(false);

    // Настройки
    const spacing = 2;
    const maxLength = typePagination === "product" ? 10 : 4;


    /**
     * Переход между страницами
     * @param {*} e 
     */
    const changePage = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({top: 0, behavior: "smooth"});
    
        let pageList = [];
        let cnt = 0;
        value--;
    
        while (cnt < maxLength) {
          if ((maxLength*value+cnt) >= items.length) {
            break;
          } else {
            pageList.push(items[maxLength*value+cnt]);
          }
          cnt++;
        }
    
        // Установка продуктов на страницу
        setItems(pageList);
    }


    /**
     * Прослушивание изменения items
     */
    useEffect(() => {
        if (items.length < 1) {
          setNotFoundProducts(true);
        } else {
          setNotFoundProducts(false);
        }
        
        if (items) {
            setItems([...items]);
            changePage(null, currentPage);
        }
    }, [items]);

    
    let bodyPaginationData = null;

    switch (typePagination) {
        case "product":
            bodyPaginationData = <div className="cards-container">
                {
                    dataItems.map((item) => (
                    <ProductCard
                        key={item.id_product}
                        id={item.id_product}
                        stock={item.quantity_product}
                        type={item.type_pr}
                        brand={item.brand_mark}
                        category={item.id_sub_category}
                        model={item.models}
                        image={item.photo[0]? item.photo[0].photo_url : null}
                        name={item.title_product}
                        price={item.price_product}
                        article={item.article_product}
                        extra={item.explanation_product}
                        dimensions={item.weight_product}
                        tags={item.label_product}
                    />
                    ))
                }
            </div>;
            break;
        case "order":
            bodyPaginationData = <div className="cards-container">
            {
                dataItems.map((item, index) => (
                    <div key={index} className="order-card">
                    <h3 className="order-title">Заказ №{item.product_data.id}</h3>
                    <div className="order-info">
                      <p>
                        <span>Дата:</span> {item.product_data.date_buy}
                      </p>
                      <p>
                        <span>Статус:</span>{''}
                        <span
                          style={{
                            color: ["Доставлен", "В процессе"].includes(item.product_data.type_operation) ? 'green' : 'orange',
                            fontWeight: 'bold',
                          }}
                        >
                          {item.product_data.type_operation}
                        </span>
                      </p>
                      <p>
                        <span>Способ доставки:</span> {item.deliveryMethod}
                      </p>
                      <p>
                        <span>Способ оплаты:</span> {'Картой'}
                      </p>
                      <p>
                        <span>Сумма:</span> {item.product_data.price} ₽
                      </p>
                    </div>
                    <h4>Товары:</h4>
                    <ul className="order-items">
                      <li key={item.product_data.title_product}>
                        <span>{item.product_data.title_product}</span> — {item.product_data.count_buy} шт. ({item.product_data.price} ₽/шт)
                      </li>
                    </ul>
                  </div>
                ))
            }
            </div>;
            break;
        case "favourite":
            bodyPaginationData = dataItems.map((item) => (
                <div key={item.product_info.id_favourite} className="favorite-item">
                  <img src={item.product_info.photos[0]?item.product_info.photos[0].photo_url : ""} alt={item.product_name} className="favorite-image" />
                  <div className="favorite-details">
                    <p className="favorite-name">{item.product_info.product_name}</p>
                    <p className="favorite-price">{item.product_info.price_product} ₽</p>
                    <p className="favorite-stock">
                      {item.product_info.quantity > 0 ? `В наличии (${item.product_info.quantity} шт)` : "Нет в наличии"}
                    </p>
                  </div>
                  <div className="favorite-actions">
                    <button className="favorite-remove" onClick={(e) => methods.deleteFavouriteProduct(item.product_info.id_favourite)}>
                      Удалить
                    </button>
                    {item.product_info.quantity > 0 && (
                      <button className="favorite-add-to-cart" onClick={() => methods.handleAddToCart(item.product_info.id_product)}>
                        В корзину
                      </button>
                    )}
                  </div>
                </div>
              ));
              break;
    }


    return (
        <div style={{marginTop: "25px"}}>
          {notFoundProducts ? 
          <NotFoundProducts />
          :
          <Fragment>
              {bodyPaginationData}
              <Stack spacing={spacing} alignItems="center" style={{margin: "auto", marginTop: "20px"}}>
                <Pagination 
                count={Math.round((items.length > dataItems.length ? items.length : dataItems.length) / maxLength)}
                shape={type}
                page={currentPage}
                onChange={(changePage)}
                />
            </Stack>
          </Fragment>
        }
        </div>
    )
}


export default PaginationScooter;