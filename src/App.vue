

<style scoped>
  h1{
    color: rgb(30, 255, 0);
  } 
</style>



<template>
  <div id="app">
    <ProductList />

    <div v-if="isShowAddProduct">
      <AddProduct  />
    </div>


  </div>
</template>



<script>
import '../public/@fontawesome-pro-5.12.0-web/css/all.css'

import Button from './components/Button/Button.vue'
import ProductList from './components/ProductList.vue'
import AddProduct from './components/AddProduct.vue'

import { mapState } from "vuex";
import store from './store'


export default { 
  components: { ProductList, AddProduct, Button },
  computed: mapState({
    isShowAddProduct: function(state){
      return state.isShowAddProduct
    }
  }), 
}


</script>