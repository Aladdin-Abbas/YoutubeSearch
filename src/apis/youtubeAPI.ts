import axios from "axios";
const BASE_URL = "https://www.googleapis.com/youtube/v3/";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: "Bearer AIzaSyBMxc3zON1lj_BClfxjkOfQZISaBV-oVfU",
  },
});
