import axios from "axios";

export default {
  items(storeUuid) {
    return axios.get(`${process.env.VUE_APP_BASE_URL}item/${storeUuid}`);
  },
  add(storeUuid, item) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}item/${storeUuid}`, item);
  },
  edit(storeUuid, item) {
    return axios.put(`${process.env.VUE_APP_BASE_URL}item/${storeUuid}`, item);
  },
  delete(storeUuid, itemUuid) {    
    return axios.delete(`${process.env.VUE_APP_BASE_URL}item/${storeUuid}`, { data: { uuid: itemUuid } });
  }
}
