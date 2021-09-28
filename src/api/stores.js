import axios from "axios";

export default {
  stores(userId) {
    return axios.get(`${process.env.VUE_APP_BASE_URL}store/${userId}`);
  },
  addStore(store) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}store/${store.userId}`, store);
  }
}