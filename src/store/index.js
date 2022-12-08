import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    movies: '/movies_info',
    cinema: '/cinema_info',
    city: '',
    isLogin: false,
    telephone: '',
    user_name: '',
    keepAlivePage:[],
    showInfo: {},
    tabName: 'now_showing'
  },
  mutations: {
    saveShowInfo(state, data){
      state.showInfo = data;
      window.localStorage.setItem("showInfo", data);//保存到localStorage 中
    },
    saveTabName(state, data){
      state.tabName = data;
      window.localStorage.setItem("tabName", data);//保存到localStorage 中
    },
    saveMoviesRoute(state, data){
      state.movies = data;
      window.localStorage.setItem("movies", data);//保存到localStorage 中
    },
    saveCinemaRoute(state, data){
      state.cinema = data;
      window.localStorage.setItem("cinema", data);//保存到localStorage 中
    },
    saveTelephone(state, data){
      state.telephone = data;
      window.localStorage.setItem("telephone", data);//保存到localStorage 中
    },
    saveIsLogin(state, data){
      state.isLogin = data;
      window.localStorage.setItem("isLogin", data);//保存到localStorage 中
    },
    saveUserName(state, data){
      state.user_name = data;
      window.localStorage.setItem("user_name", data);//保存到localStorage 中
    },
    saveCity(state, data){
      state.city = data;
      window.localStorage.setItem("city", data);//保存到localStorage 中
    },
    ADD_KEEP_ALIVE: (state, name) => {
      const keepAlivePage = state.keepAlivePage
      const index = keepAlivePage.indexOf(name)
      if (index == -1) {
        state.keepAlivePage = state.keepAlivePage.concat(name)
      }

    },
    CHANGE_KEEP_ALIVE: (state, name) => {
      const keepAlivePage = state.keepAlivePage
      const index = keepAlivePage.indexOf(name)
      if (index > -1) {
        keepAlivePage.splice(index, 1)
      }
    }
  },
  actions: {
    addKeepAlivePage ({ commit }, name) {
      commit('ADD_KEEP_ALIVE', name)
    },
    changeKeepAlive ({ commit }, name) {
      commit('CHANGE_KEEP_ALIVE', name)
    }
  },
  modules: {
  }
})
export default store