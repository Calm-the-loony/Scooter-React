import axios from "axios";

export default class ProductApiService {
  /**
   * Поиск продуктов по фильтрам
   * @param {*} title
   * @param {*} id_category
   * @param {*} min_price
   * @param {*} max_price
   * @param {*} desc
   * @returns
   */
  static async filterProducts(
    title = null,
    id_category = null,
    id_subcategory = null,
    min_price = null,
    max_price = null,
    desc = "default",
    availability = false,
  ) {
    try {
      const req = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/product/all/filter",
        {
          params: {
            title_product: title,
            id_category: id_category,
            id_sub_category: id_subcategory,
            min_price: min_price,
            max_price: max_price,
            desc_or_not: desc,
            availability: availability,
          },
        },
      );
      return req.data.products;
    } catch {
      return [];
    }
  }

  /**
   * Получение информации о продукте по идентификатору
   * @param {*} id_product
   */
  static async productData(id_product) {
    const req = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/product/information/full",
      {
        params: {
          id_product: id_product,
        },
      },
    );
    return req.data;
  }

  /**
   * Поиск продуктов по марке и модели
   * @param {*} id_mark
   * @param {*} id_model
   */
  static async searchProduct(id_mark = null, id_model = null) {
    const req = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/product/all/search",
      {
        params: {
          mark: id_mark,
          model: id_model,
        },
      },
    );
    return req.data;
  }

  /**
   * Получение рекомендованных товаров
   * @returns
   */
  static async recommendsProduct() {
    try {
      const req = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/product/recommends",
      );
      return req.data;
    } catch {
      return false;
    }
  }

  /**
   * Получаем всю проданную продукцию (7шт - LIMIT)
   * @returns
   */
  static async allSalledProducts() {
    try {
      const req = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/product/last/sells",
      );
      return req.data;
    } catch {
      return false;
    }
  }

  /**
   * Получение всех типов транспорта
   * @returns
   */
  static async allTypeModels() {
    try {
      const req = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/mt/all",
      );
      return req.data;
    } catch {
      return [];
    }
  }

  /**
   * Получение всех моделей
   * @returns
   */
  static async allModels() {
    try {
      const req = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/model/all",
      );

      return req.data;
    } catch {
      return [];
    }
  }

  /**
   * Получение всех марок
   * @returns
   */
  static async allMarks() {
    try {
      const req = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/mark/all",
      );
      return req.data;
    } catch {
      return [];
    }
  }

  /**
   * Поиск моделей по марке
   * @param {*} id_mark
   */
  static async findModelByMark(id_mark = null) {
    const req = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/model/all/by/mark",
      {
        params: {
          id_mark: id_mark,
        },
      },
    );

    return req.data;
  }

  /**
   * Получение всех брендов магазина
   * @returns
   */
  static async allBrands() {
    try {
      const req = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/brand/all",
      );
      return req.data.brands;
    } catch {
      return [];
    }
  }

  /**
   * Создание отзыва на товар
   */
  static async createReview(dataUser) {
    const req = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/review/create",
      dataUser,
    );

    if (req.status === 201) {
      return true;
    } else {
      throw Error("Не удалось создать отзыв");
    }
  }

  /**
   * Все отзывы товара
   */
  static async getAllReviewByProductId(id_product) {
    const req = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/review/all/product/" + id_product,
    );
    if (req.status === 200) {
      return req.data;
    } else {
      throw Error("Не удалось найти отзывы продукта");
    }
  }
}
