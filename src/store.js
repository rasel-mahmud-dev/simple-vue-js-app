import Vuex from 'vuex'
import Vue from 'vue'


import api from './apis/api'


Vue.use(Vuex)



const store = new Vuex.Store({

  state:{
    products: [],
    cartItems: { totalPrice: 0, totalItems: 0, carts: []},
    isShowAddProduct: false,
    isShowCheckCart: false
  },




  // this like redux action 
  actions: {
    FETCH_PRODUCTS ({ commit }) {
      api.get("/products")
      .then(products=>{
        commit('FETCH_PRODUCTS', products.data)
      })
    },

    FETCH_CARTS ({ commit }) {
      api.get("/cartItems")
      .then(data=>{
        commit('FETCH_CARTS', data.data)
      })
    },

    ADD_PRODUCT ({commit}, payload) {  
      const newProduct = { ...payload, id: Date.now() }
      api.post("/products", newProduct)
      .then(data=>{
        commit("ADD_PRODUCT", newProduct)
      })
    },

    DELETE_PRODUCT ({commit}, payload) { 
      commit("DELETE_PRODUCT", payload)
      api.delete("/products/"+payload).then(res=>console.log(res))
    },

    ToggleAddProductForm({commit}){
      commit("ToggleAddProductForm")
    },

    ToggleCheckCart({commit}){
      commit("ToggleCheckCart")
    },



    addToCart({commit}, item){

      let  cartItems  =  {...this.state.cartItems}
 
      let find_In_CartProduct_index = cartItems.carts.findIndex(i=>i.id === item.id)

      if(find_In_CartProduct_index === -1){
        cartItems.carts.push({...item, quantity: 1})      
      } else{
        let existProduct = cartItems.carts[find_In_CartProduct_index]
        existProduct.quantity =  existProduct.quantity + 1 ;
      }


      let totalPrice = 0;      
      let totalItems = 0;
      for (let i = 0; i < cartItems.carts.length; i++) {
        const e = cartItems.carts[i];
        totalItems =  totalItems + e.quantity        
        totalPrice = totalPrice + (e.price * e.quantity)        
      }
    
      cartItems.totalPrice =  totalPrice
      cartItems.totalItems =  totalItems    

      api.post("/cartItems", cartItems).then(data=>console.log(data))

      commit("addToCart", cartItems)
    },



    REMOVE_FROM_CART({commit}, id){
      const currentCart = this.state.cartItems
      let curr_carts = currentCart.carts

      let curr_totalItems = currentCart.totalItems
      let curr_totalPrice = currentCart.totalPrice
      
      const delateItemIndex = curr_carts.findIndex(i=>i.id === id)
      if(delateItemIndex !== -1){
        
        // frist reduce total Quantity and price from delete item quantity and price.
        curr_totalPrice  = curr_totalPrice - curr_carts[delateItemIndex].price
        curr_totalItems = curr_totalItems - 1

        if(curr_carts[delateItemIndex].quantity > 1){
          curr_carts[delateItemIndex].quantity  = curr_carts[delateItemIndex].quantity - 1
          
        }else{
          curr_carts.splice(delateItemIndex, 1)
        }       
      }

      currentCart.totalItems = curr_totalItems
      currentCart.totalPrice = curr_totalPrice

      api.post("/cartItems", currentCart).then(data=>console.log(data))
      commit("REMOVE_FROM_CART", currentCart)
    }

  },


  // change state
  mutations: {
    FETCH_PRODUCTS (state, payload) {
      state.products = payload
    },

    FETCH_CARTS (state, payload) {
      state.cartItems = payload
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
    },

    ToggleCheckCart (state) {
      state.isShowCheckCart = !state.isShowCheckCart 
    },

    addToCart(state, cartItems){
      state.cartItems.totalPrice =  cartItems.totalPrice    
      state.cartItems.totalItems =  cartItems.totalItems    
    },
     
    REMOVE_FROM_CART(state, updatedCart){
      state.cartItems = updatedCart
    }

  }



})



export default store