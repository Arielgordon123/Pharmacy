import axios from "axios";

export default {
  search: query => axios.get("/api/search/" + query),
  cats: {
    getAllCats: () => axios.get("/api/categories"),
    addCategory: category => axios.post("/api/categories", category),
  },
  items: {
    getItemsByCatName: catName => axios.get("/api/items?cat=" + catName),
    getItemById: id => axios.get("/api/items/" + id),
    addItem: item => axios.post("/api/items", item),
    editItem: item => axios.patch("/api/items", item),
    deleteItem: id => axios.delete("/api/items/"+id),
  },
  auth: {
    me: () => axios.get("/api/auth/user"),
    login: data => axios.post("/api/auth/login", data),
    register: data => axios.post("/api/auth/register", data)
  }
};
