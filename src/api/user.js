import axios from "axios";

export default {
  login(user) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}login`, user)
  },
  register(user) {
    return axios.post(`${process.env.VUE_APP_BASE_URL}user`, user)
  }
}