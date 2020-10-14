
<template>

    <div class="addProduct">

      <h2 class="add_product_title">Add Product</h2>

      <form v-on:submit="addProduct">


        <div class="form-control">
          <input 
            name="name" 
            class="input" type="text" 
            placeholder="Product Name" 
            v-model="name" 
            @keydown="handleChange">
         </div>

        <div class="form-control">
          <input 
            name="price" 
            class="input" 
            type="number"  
            placeholder="Price"
            v-model="price" 
            @keydown="handleChange">
        </div>


        <button type="submit">Add</button>

      </form>


    </div>


</template>



<script>

import store from '../store'

export default {

  data: function(e){
    return {
      name: "",
      price: "",
    }
  },


  methods: {
    handleChange(e){
      // this[e.target.name] = e.target.value
      console.log( e.target.value);
    },
    addProduct(e){
      e.preventDefault()
      if(this.name && this.price){
        store.dispatch("ADD_PRODUCT", {name: this.name, price: this.price})
        store.dispatch("ToggleAddProductForm")
      }
    }
  }



}


</script>



<style lang="scss" scoped>

.addProduct{
  max-width: 500px;
  margin: auto;
  margin-top: 30px;
}


.form-control{
  .input{
    width: 100%;
    color: rgb(36, 36, 36);
    outline: none;
    border: 1px solid grey;
    margin: 5px 0px;
    padding: 5px ;
    box-sizing: border-box;
    font-size: 14px;
    font-family: Roboto;
    box-shadow: 
    0 0 0px 0px rgb(58, 58, 58), 
    0 0 0px 0px rgb(82, 82, 82), 
    0 0 1px 0px grey,
    0 0 3px .5px rgba(102, 101, 101, 0.541), 
    0 0 4px 2px rgba(155, 155, 155, 0.295);
  }

}

.add_product_title{
  font-family: roboto;
  font-size: 16px;
  color: rgb(53, 53, 53);;
}
</style>