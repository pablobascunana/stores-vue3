import axios from "axios";

export default {
  register(user) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}user`, user)
  }
}