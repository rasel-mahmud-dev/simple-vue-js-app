


<template>
  <div class="products_page">
    <ul class="products_wrapper">
      <div class="products_header">
        <h2 class="product_title">Products total {{products.length}}</h2>
        <div  @click="toggleAddProduct" class="your-cart">
          Your Cart: 
          <strong>{{cartItems.totalItems > 0 ? cartItems.totalItems + " items" : 'Empty' }}</strong>
          <strong>{{cartItems.totalPrice > 0 ? "$" +cartItems.totalPrice : ''}}</strong> 
          <i @click="toggleCheckCart" class="fas fa-cart-plus    "></i>
        </div>
        <span @click="toggleAddProduct" class="addProduct">
           <i class="far fa-plus"></i>
        </span>
      </div>

      <li class="product" v-for="product in products" :key="product.id">
        <div class="product_details">
          <span class="product_name">{{ product.name }}</span>
          <span class="product_name">${{ product.price }}</span>
        </div>
        <div class="controller">
          <span class="delete_product"  @click="deleteProduct(product.id)">
            <i class="far fa-trash" aria-hidden="true"></i>
          </span>
          <span @click="addToCart(product)" class="addToCart">
            <i class="far fa-cart-plus"></i>
          </span>
        </div>
      </li>

    </ul>
  </div>
</template>


<script>
import { mapState } from "vuex";

import store from "../store";

export default {

  mounted: function(){
    store.dispatch("FETCH_PRODUCTS")
    store.dispatch("FETCH_CARTS")
  },

  computed: mapState({
    products: (state) => state.products,
    cartItems: state=>state.cartItems
  }),

  methods: {
    clickHandle: () => {
      console.log("clicked");
    },
    deleteProduct: (id) => {
      store.dispatch("DELETE_PRODUCT", id);
    },
    toggleAddProduct(e){
      store.dispatch("ToggleAddProductForm")
    },

    toggleCheckCart(e){
      store.dispatch("ToggleCheckCart")
    },
    addToCart: (item)=>{
      store.dispatch("addToCart", item)
    }
  },
};
</script>


<style lang="scss" scoped>
.products_page {
  margin: auto;
}
.product_title{
  color: rgb(33, 100, 243);
}
.products_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  .addProduct {
    margin-left: 10px;
     cursor: pointer;
    i {
      color: rgb(3, 201, 3);
    }
  }
}
.products_wrapper {
  list-style: none;
  margin: 0 auto;
  padding: 0;
}
.product {
  display: flex;
  justify-content: space-between;
  background: rgb(236, 236, 236);
  padding: 5px 10px;
  .product_name {
    font-family: roboto;
    font-weight: 500;
    color: black;
  }

  &:not(:last-child){
      border-bottom: 1px solid #77777730;
  } 
}

.product::last-child {
  border-bottom: 1px solid #3551f130;
}

.product_details {
  flex: 10;
  display: flex;
  justify-content: space-between;
}

.controller {
  display: flex;
  justify-content: flex-end;
  flex: 2;
  & > span {
    padding: 0 3px;
    cursor: pointer;
  }
  .delete_product {
    &:hover {
      color: red;
    }
  }
  .addToCart {
    &:hover {
      color: green;
    }
  }
}

.your-cart{
  cursor: pointer;
  user-select: none;
  &:hover{
    color: rgb(82, 71, 243);
    font-weight: 500;
  }
}

</style>