import axios from "axios";


export default class ProductApiService {

    /**
     * Получение рекомендованных товаров
     * @returns 
     */
    static async recommendsProduct() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/product/recommends");
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
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/product/last/sells");
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
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/mt/all");
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
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/model/all");
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
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/mark/all");
            return req.data;
        } catch {
            return [];
        }
    }

    /**
     * Получение всех брендов магазина
     * @returns 
     */
    static async allBrands() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/brand/all");
            return req.data.brands;
        } catch {
            return []
        }
    }
}