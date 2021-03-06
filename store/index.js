import cookie from "cookie";
import { mapGetters } from "vuex";
import * as Ccookie from "js-cookie";
import api from "~/api";

import {
  setAuthToken,
  resetAuthToken,
  setRefreshToken,
  resetRefreshToken
} from "~/utils/auth";

export const state = () => ({
  user: null,
  usersList: [],
  token: null,
  categories: [],
  items: [],
  item: null,
  searchDialog: false,
  refresh_token: null
});

export const getters = {
  user(state) {
    return state.user;
  },
  token(state) {
    return state.token;
  },
  refresh_token(state) {
    return state.refresh_token;
  },
  get_categories(state) {
    return state.categories;
  },
  get_items(state) {
    return state.items;
  },
  get_item(state) {
    return state.item;
  },
  get_searchDialog(state) {
    return state.searchDialog;
  },
  get_users(state){
    return state.usersList;
  }
};
export const computed = {
  // mix the getters into computed with object spread operator
  ...mapGetters([
    "get_categories",
    // ...
  ])
};

export const mutations = {
  set_user(store, data) {
    store.user = data;
  },
  set_token(store, token) {
    store.token = token;
  },
  set_refresh_token(store, refresh_token) {
    store.refresh_token = refresh_token;
  },
  reset_user(store) {
    store.user = null;
    store.token = null;
    store.refresh_token = null;
  },
  set_categories(store, categories) {
    store.categories = categories;
  },
  set_items(store, items) {
    store.items = items;
  },
  set_item(store, item) {
    store.item = item;
  },
  set_searchDialog(store, value) {
    store.searchDialog = value;
  },
  set_usersList(store, value){
    store.usersList = value
  },
  addCategory(store, {_id, name, enName}) {
    store.categories.push({_id,name,enName});
  },
  deleteItem(store, id) {
    store.items = store.items.filter(item=> item._id != id)
    store.item = null
    store.searchDialog = false
  },
};

export const actions = {
  getItemById({ dispatch, commit }, id) {
    return api.items
      .getItemById(id)
      .then(res => {
        commit("set_item", res.data);
        commit("set_searchDialog", true)
      })
      .catch(err => {
        return Promise.reject(new Error("cant get item"));
      });
  },

  getItemsByCatName({ dispatch, commit }, catName) {
    // console.log("in store catName:", catName);
    return api.items
      .getItemsByCatName(catName)
      .then(res => {
        commit("set_items", res.data);
      })
      .catch(err => {
        return Promise.reject(new Error("cant get items"));
      });
  },
  getAllCategories({ dispatch, commit }) {
    return api.cats
      .getAllCats()
      .then(cat => {
        commit("set_categories", cat.data);
      })
      .catch(err => {
        return Promise.reject(new Error("cant get categories"));
      });
  },
  getUsers({dispatch, commit}){
    return api.users
    .getAllUsers()
    .then(users => {
      commit("set_usersList", users.data);
    })
    .catch(err => {
      return Promise.reject(new Error("cant get users"));
    });
  },
  fetch({ dispatch, commit, state }) {
    // console.log(' Call TO FETCH' );
    return api.auth
      .me()
      .then(response => {
        // console.log('commit :', response.data.result)
        commit("set_user", response.data.result);
        commit("set_token", response.data.token);
        commit("set_refresh_token", response.data.refreshToken);
        return response;
      })
      .catch(error => {
        console.error(error.response.data);
        // console.log('error.response.data.message :', error.response.data.message);
        dispatch("reset");

        return Promise.resolve(error.response.data);
      });
  },
  login({ commit }, data) {
    // commit('set_user', response.data.user)
    return api.auth
      .login(data)
      .then(response => {
        // console.log('response.data.token :', response.data.token);
        commit("set_token", response.data.token);
        commit("set_refresh_token", response.data.refresh_token);
        setRefreshToken(response.data.refresh_token);
        setAuthToken(response.data.token);
        Ccookie.set("x-access-token", response.data.token, {
          expires: 10
        });
        Ccookie.set("refresh-token", response.data.refresh_token, {
          expires: 365 * 2
        });

        return response;
      })
      .catch(error => {
        // console.error(error);
        return Promise.reject(error);
      });
  },
  register({ commit }, data) {
    // commit('set_user', response.data.user)
    console.log("call to register :", data);
    return api.auth
      .register(data)
      .then(response => response)
      .catch(error => {
        // console.error(error);
        return Promise.reject(error);
      });
  },
  refreshToken({ commit, state }) {
    console.log("refreshToken (on store/auth");
    // If this is the first time the refreshToken has been called, make a request
    // otherwise return the same promise to the caller
    if (!state.refreshTokenPromise) {
      const p = UserService.refreshToken();
      commit("refreshTokenPromise", p);

      // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
      // Clear the promise on error as well.
      p.then(
        response => {
          commit("refreshTokenPromise", null);
          commit("loginSuccess", response);
        },
        error => {
          commit("refreshTokenPromise", null);
        }
      );
    }

    return state.refreshTokenPromise;
  },
  reset({ commit }) {
    console.log("reset :");
    commit("reset_user");
    resetAuthToken();
    resetRefreshToken();

    Ccookie.remove("x-access-token");
    Ccookie.remove("refresh-token");

    return Promise.resolve(true);
  },
  nuxtServerInit({ dispatch }, { req }) {
    if (process.server) {
      try {
        const cookies = cookie.parse(req.headers.cookie || "");
        if (cookies["x-access-token"] && cookies["refresh-token"]) {
          return dispatch("fetch")
            .then(result => {
              console.log(
                "cookies['refresh-token'] :",
                cookies["refresh-token"]
              );
              setAuthToken(cookies["x-access-token"]);
              setRefreshToken(cookies["refresh-token"]);
              return result;
            })
            .catch(error => {
              console.error("Provided token is invalid:", error);

              return dispatch("reset");
            });
        }
      } catch (error) {
        console.log("error :", error);
        return Promise.resolve(error);
      }
    } else {
      console.log(process.client);
      return Promise.resolve();
    }

    return Promise.resolve();
  }
};
