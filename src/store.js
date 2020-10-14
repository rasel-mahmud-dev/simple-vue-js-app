import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)


const store = new Vuex.Store({

  state:{
    products: [{name: "Laptop", price: 20, id: 2}],
    cartItems: [],
    isShowAddProduct: false
  },




  // this like redux action 
  actions: {
    FETCH_PRODUCTS ({ commit }) {
      commit('FETCH_PRODUCTS', {
        products: [{name: "Laptop", id: 2}, { name: "Tablet", id : 5 }]
      })
    },

    ADD_PRODUCT ({commit}, payload) {  
      commit("ADD_PRODUCT", payload)
    },

    DELETE_PRODUCT ({commit}, payload) {  
      commit("DELETE_PRODUCT", payload)
    },

    ToggleAddProductForm({commit}){
      commit("ToggleAddProductForm")
    }

  },


  // change state
  mutations: {
    FETCH_PRODUCTS (state, payload) {
      state.products = payload.products
    },

    ADD_PRODUCT (state, payload) {
      state.products = [...state.products, { ...payload, id: Date.now() }]
    },

    DELETE_PRODUCT (state, payload) {
    
      let p = state.products.filter(product=> product.id !== payload )
      state.products = p;

    },

    ToggleAddProductForm (state) {
      state.isShowAddProduct = !state.isShowAddProduct 
    }
  }
})


// store.dispatch('increment')


export default store