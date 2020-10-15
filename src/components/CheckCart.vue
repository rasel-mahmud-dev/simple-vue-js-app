<template>
  <div>
    <h2>Check Cart</h2>
      <h3 class="title_sub" v-if="cartItems.carts.length <= 0">
        You haven't add to cart any product 
      </h3>
      <div class="cartItems-wrapper">
        <li class="cart-item" v-for="cartitem in cartItems.carts" :key="cartitem.id" >

          <div class="cart-item_name"><strong>{{cartitem.name}}</strong></div>
          <div>Quantity: <strong>{{cartitem.quantity}}</strong></div>
          <div>Unit Price: <strong>{{cartitem.price}}</strong></div>
          <div @click="removeFromCart(cartitem.id)" class="remove-cart"><i class="far fa-trash    "></i></div>
        </li>
      </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import store from '../store'

export default {
 mounted: function(){
    store.dispatch("FETCH_CARTS")
  },
  computed: mapState({
    cartItems: state=>state.cartItems
  }),
  methods: {
    removeFromCart(id){
      store.dispatch("REMOVE_FROM_CART", id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .cartItems-wrapper{
    list-style: none;

    .cart-item{
      display: flex;
      background: rgb(90, 156, 112);
      color: rgb(238, 238, 238);
      margin: 0px 0px;
      padding: 4px 5px;
      // justify-content: space-between;
      &:not(:last-child){
        border-bottom: 1px solid rgb(226, 153, 204);
      }
      &>div{
        flex: 10;
      }
      .remove-cart{
        flex: 1;
        cursor: pointer;
      }
      
      
    }
  }
  .title_sub{
    color: rgb(68, 68, 68);
    font-size: 15px;
    font-weight: 500;
    margin: 0;
    padding: 0 5px;
  }
  
</style>

<style lang="scss" >
h2{
    margin: 0;
    padding: 0;
    margin: 15px 0px;
  }
</style>