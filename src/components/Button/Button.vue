


<template>
  <div>

    <button ref="container"  @mousedown="addRipple" v-bind:class="[classes]"  >

      <slot/>

      <div class="ripple" v-for="ripple in ripples" 
        :key="ripple.id" 
        :style="{
            top: ripple.top,
            left: ripple.left,
            width: ripple.width,
            height: ripple.height
          
          }">
        
      </div>
    </button>  
  </div>


</template>


<script>
import classnames from "classnames"



export default {
  props: [ "color", "block", "outline", "icon" ],

  data() { 
    const { color, icon, block, outline } = this
    let classes = classnames(
      "btn ripple_parent",  
      icon && 'btn_icon',
      color && icon && `btn_icon_${color}`,
      color && !icon && `btn_${color}`,
      block && `btn_block`,
      outline && `btn_outline`,
      outline && outline !== (undefined || true) ? `outline_btn_${outline}` : '',
      outline && outline === (undefined || true) ? `outline_btn_default` : '',
      outline != "undefined"  ? `outline_btn` : '',
    ) 
    return { 
      classes: classes,
      ripples: [],
    }
  },

  mounted() {
    // react like componentDidMount
    const width = this.$refs.container.offsetWidth;
    const height = this.$refs.container.offsetHeight;
    this.rippleWidth  = width > height ? width : height;
    this.halfRippleWidth  = this.rippleWidth / 2;


    // equivalent for react props.children
    // console.log(this.$slots.default);

    // window.addEventListener("mouseup", this.purgeRipples);
    
 },

  // beforeDestroy() {  
  //   window.removeEventListener("mouseup", this.purgeRipples)
  // },

  methods:{
    addRipple(e) {
      const { left, top } = this.$refs.container.getBoundingClientRect();
      const rippleId      = Date.now();
      this.ripples.push({
        width : `${this.rippleWidth}px`,
        height: `${this.rippleWidth}px`,
        left  : `${e.clientX - left - this.halfRippleWidth}px`,
        top   : `${e.clientY - top - this.halfRippleWidth}px`,
        id    : rippleId
      });


    // console.log(this.$children);

    setTimeout(()=>{
        this.$refs.container.removeChild(this.$refs.container.children[0])
      }, 900)
    }

    
  }
};

</script>

<style  scoped>
 
.ripple{
  position: absolute;
  animation: ripple_effect .88s 1;
  pointer-events: none;
  border-radius: 50%;
  opacity: 0;
  /* background: rgb(0, 0, 0); */
  background: rgb(36, 36, 36);
  transform: scale(0)
}

@keyframes ripple_effect {
  0% {
      transform: scale(0);
      opacity: 0.5;
  }

  100% {
      transform: scale(2);
      opacity: 0;
  }
}

.ripple_parent{
  position: relative;
  overflow: hidden;
  
}


.btn{
  font-weight: 400;
  position: relative;
  background: #fffcfc;
  color: #2b2b2b;
  border: none;
  padding: 5px 8px;
  margin: 5px;
  outline: none;
  box-shadow:0 2px 5px -1px #28252585;
  box-sizing: border-box;
  font-family: roboto;
  font-size: 14px;
  user-select: none;
  &:hover,
  &:focus{
    box-shadow: 0px 2px 4px 0px #888888;
  }
  &:active{
    box-shadow: 0px 2px 4px 1px #888888;
  }
}
.btn_icon{
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 2px 6px;
}

.btn_block{
  width: 100%;
  display: block;
}


.btn_green,
.btn_icon_green{
  background: rgb(97, 235, 127) ;
  color: #353535;
  &:hover,
  &:focus{
    box-shadow: 0px 2px 4px 0px rgb(97, 235, 127) ;
  }
  &:active{
    box-shadow: 0px 2px 4px 1px rgb(97, 235, 127) ;
  }
}
.btn_red,
.btn_icon_red{
  background: rgb(253, 57, 57) ;
  color: #ffffffe8;
  &:hover,
  &:focus{
    box-shadow: 0 2px 5px -1px #ff0000f7;;
  }
  &:active{
    box-shadow: 0px 2px 4px 1px rgb(253, 57, 57) ;
  }
}
.btn_pink,
.btn_icon_pink{
  background: rgb(255, 55, 155) ;
  color: #ffffffe8;
  &:hover,
  &:focus{
    box-shadow: 0px 2px 4px 0px rgb(255, 55, 155);
  }
  &:active{
    box-shadow: 0px 2px 4px 1px rgb(255, 55, 155);
  }
}
.btn_orange,
.btn_icon_orange{
  background: rgb(238, 236, 95) ;
  color: #272727e8;
  &:hover,
  &:focus{
    box-shadow: 0px 2px 4px 0px #888888;
  }
  &:active{
    box-shadow: 0px 2px 4px 1px #888888;
  }
}
.btn_blue,
.btn_icon_blue{
  background: rgb(69, 88, 255) ;
  color: #ffffffe8;
  &:hover,
  &:focus{
    box-shadow: 0px 2px 4px 0px rgb(69, 88, 255);
  }
  &:active{
    box-shadow: 0px 2px 4px 1px rgb(69, 88, 255);
  }
}
.btn_primary,
.btn_icon_primary{
  background: rgb(69, 218, 255) ;
  color: #ffffffe8;
  &:hover,
  &:focus{
    box-shadow: 0px 2px 4px 0px  rgb(69, 218, 255);
  }
  &:active{
    box-shadow: 0px 2px 4px 1px  rgb(69, 218, 255);
  }
} 

.btn_outline{
  color: rgb(32, 32, 32);
  background: #fffcfc;
  border: 2px solid #c7c7c7;
  margin: 5px;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 0 2px 1px #5a5a5a85;
  box-sizing: border-box;
  font-family: roboto;
  font-size: 14px;
}

.outline_btn_default{
  background: transparent;
  border: 2px solid #c7c7c7;
  box-shadow: 0 0 2px 1px #5a5a5a85;
}
.outline_btn_default:hover,
.outline_btn_default:focus{
  background: transparent;
  border: 2px solid #c7c7c7;
  box-shadow: 0px 1px 3px 1px #888888;
}
.outline_btn_default:active{
  background: transparent;
  border: 2px solid #c7c7c7;
  box-shadow:0px 2px 4px 0px #464646;
}


.outline_btn_red{
  background: transparent;
  border: 2px solid rgb(253, 57, 57) ;
  box-shadow: 0 0 2px 1px #ec414185;
}
.outline_btn_red:hover,
.outline_btn_red:focus{
  border: 2px solid #ff0000;
  box-shadow: 0px 1px 4px 0px #ff0000c7;
}

.outline_btn_red:active{
  border: 2px solid rgb(253, 57, 57) ;
  box-shadow:0px 2px 4px 0px #ff0000c7;
}



.outline_btn_green{
  background: transparent;
  border: 2px solid  rgb(97, 235, 127) ;
  box-shadow: 0 0 2px 0px #5ad374;
}
.outline_btn_green:hover,
.outline_btn_green:focus{
  background: transparent;
  border: 2px solid  rgb(97, 235, 127) ;
  box-shadow: 0 0.5px 2px 1px #58d173;
}

/* .outline_btn_green:hover,
.outline_btn_green:focus{
  background: transparent;
  border: 2px solid  rgb(97, 235, 127) ;
  box-shadow: 0px 1px 4px 0px  #5ad374;
} */


.outline_btn_green:active{
  background: transparent;
  border: 2px solid  rgb(97, 235, 127) ;
  box-shadow:0px 2px 4px 0px #5ad374;
}




.outline_btn_blue{
  background: transparent;
  border: 2px solid rgb(69, 88, 255) ;
}
.outline_btn_blue:hover,
.outline_btn_blue:focus{
  background: transparent;
  border: 2px solid rgb(69, 88, 255) ;
  box-shadow: 0 0.5px 2px 1px rgb(69, 88, 255) ;
}
.outline_btn_blue:active{
  background: transparent;
  border: 2px solid rgb(69, 88, 255) ;
  box-shadow:0px 2px 4px 0px rgb(69, 88, 255) ;
}



.outline_btn_pink{
  background: transparent;
  border: 2px solid rgb(255, 55, 155) ;
}
.outline_btn_pink:hover,
.outline_btn_pink:focus{
  background: transparent;
  border: 2px solid rgb(255, 55, 155) ;
  box-shadow: 0 0.5px 2px 1px rgb(255, 55, 155) ;
}
.outline_btn_pink:active{
  background: transparent;
  border: 2px solid rgb(255, 55, 155) ;
  box-shadow:0px 2px 4px 0px rgb(255, 55, 155) ;
}



.outline_btn_orange{
  background: transparent;
  border: 2px solid rgb(238, 236, 95) ;
}
.outline_btn_orange:hover,
.outline_btn_orange:focus{
  background: transparent;
  border: 2px solid rgb(238, 236, 95) ;
  box-shadow: 0 0.5px 2px 1px rgb(238, 236, 95) ;
}
.outline_btn_orange:active{
  background: transparent;
  border: 2px solid rgb(238, 236, 95) ;
  box-shadow:0px 2px 4px 0px rgb(238, 236, 95) ;
}


.outline_btn_primary{
  background: transparent;
  border: 2px solid rgb(69, 218, 255) ;
  box-shadow:0px 2px 4px 0px rgb(69, 218, 255);
}
.outline_btn_primary:hover,
.outline_btn_primary:focus{
  background: transparent;
  border: 2px solid rgb(69, 218, 255) ;
  box-shadow: 0 0.5px 2px 1px rgb(69, 218, 255) ;;
}
.outline_btn_primary:active{
  background: transparent;
  border: 2px solid rgb(69, 218, 255) ;
  box-shadow:0px 2px 4px 0px rgb(69, 218, 255) ;;
}

</style>
