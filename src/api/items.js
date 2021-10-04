import axios from "axios";
import i18n from '@/i18n';
import { utils } from "@/helpers/commons";

const t = i18n.global.t;

export default {
  async items(storeUuid) {
    try {
      let { data } = await axios.get(`${process.env.VUE_APP_BASE_URL}item/${storeUuid}`);
      return data;
    } catch (error) {
      utils.prepareToastAndShowIt(`${t('items.messages.error')}`);
    }
  },
  add(storeUuid, item) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}item/${storeUuid}`, item);
  },
  delete(storeUuid, itemUuid) {    
    return axios.delete(`${process.env.VUE_APP_BASE_URL}item/${storeUuid}`, { data: { uuid: itemUuid } });
  }
}
