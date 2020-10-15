

<style scoped>
.container {
  max-width: 500px;
}
h1 {
  color: rgb(30, 255, 0);
}
</style>



<template>
  <div id="app">
    <div class="container">
      <ProductList />

      <div v-if="isShowAddProduct">
        <AddProduct />
      </div>

      <div v-if="isShowCheckCart">
        <CheckCart />
      </div>
    </div>
  </div>
</template>



<script>
import { mapState } from "vuex";

import "../public/@fontawesome-pro-5.12.0-web/css/all.css";

import Button from "./components/Button/Button.vue";
import ProductList from "./components/ProductList.vue";
import AddProduct from "./components/AddProduct.vue";
import CheckCart from "./components/CheckCart.vue";

import store from "./store";

export default {
  components: { ProductList, AddProduct, CheckCart, Button },
  computed: mapState({
    isShowAddProduct: function (state) {
      return state.isShowAddProduct;
    },
    isShowCheckCart: function (state) {
      return state.isShowCheckCart;
    },
  }),
};
</script>