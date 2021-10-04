import axios from "axios";

export default {
  stores(userUuid) {
    return axios.get(`${process.env.VUE_APP_BASE_URL}store/${userUuid}`);
  },
  add(store) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}store/${store.userId}`, store);
  },
  delete(userId, storeUuid) {
    return axios.delete(`${process.env.VUE_APP_BASE_URL}store/${userId}`, { data: { uuid: storeUuid } });
  }
}
