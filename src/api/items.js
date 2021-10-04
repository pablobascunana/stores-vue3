import axios from "axios";

export default {
  items(storeUuid) {
    return axios.get(`${process.env.VUE_APP_BASE_URL}item/${storeUuid}`);
  },
  delete(storeUuid, itemUuid) {    
    return axios.delete(`${process.env.VUE_APP_BASE_URL}item/${storeUuid}`, { data: { uuid: itemUuid } });
  }
}
