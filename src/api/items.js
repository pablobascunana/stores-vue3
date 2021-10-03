import axios from "axios";

export default {
  items(storeId) {
    return axios.get(`${process.env.VUE_APP_BASE_URL}item/${storeId}`);
  }
}
