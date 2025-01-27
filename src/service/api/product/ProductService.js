import axios from "axios";


export default class ProductApiService {

    /**
     * Получение рекомендованных товаров
     * @returns 
     */
    static async recommendsProduct() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/product/recommends_products");
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
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/product/last_sells");
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
        const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/mt/all");
        return req.data;
    }
}