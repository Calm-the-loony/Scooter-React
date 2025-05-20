import axios from "axios";

export default class GarageApiService {
  static async productForGarage(id_mark, id_moto_type, id_model) {
    try {
      id_mark ??= null;
      id_model ??= null;
      id_moto_type ??= null;

      const req = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/product/all/garage/filter",
        {
          params: {
            id_brand: id_mark,
            id_model: id_model,
            id_moto_type: id_moto_type,
          },
        },
      );

      return req.data;
    } catch {
      return [];
    }
  }

  /**
   * Добавление транспорта в гараж
   * @param {*} newTrasport
   * @returns
   */
  static async addedGarage(newTrasport) {
    const req = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/garage/create",
      newTrasport,
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          }
        },
    );

    return req.data;
  }

  /**
   * Пользовательский гараж
   * @returns
   */
  static async myGarage() {
    const req = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/garage/all",
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          }
        },
    );

    return req.data;
  }

  /**
   * Удаление транспорта с гаража
   * @param {*} id_mt
   * @returns
   */
  static async deleteTransport(id_mt) {
    await axios.delete(import.meta.env.VITE_BACKEND_URL + "/garage/delete", {
      params: {
        id_mt: id_mt,
      },
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      }
    });

    return true;
  }
}
