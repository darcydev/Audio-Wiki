import axios from "axios";

export default axios.create({
  baseURL:
    "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&redirects=true&origin=*&titles="
});
