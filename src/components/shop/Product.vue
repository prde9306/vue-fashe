<template xmlns:router-link="http://www.w3.org/1999/html">
  <div class="item-slick2 p-l-15 p-r-15">
    <!-- Block2 -->
    <div class="block2">
      <div class="block2-img wrap-pic-w of-hidden pos-relative" :class="{'block2-labelnew': product.badge === 'new', 'block2-labelsale': product.badge === 'sale'}">
        <img :src="product.titleImg" alt="IMG-PRODUCT">

        <div class="block2-overlay trans-0-4">
          <a href="#" class="block2-btn-addwishlist hov-pointer trans-0-4">
            <i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
            <i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
          </a>

          <div class="block2-btn-addcart w-size1 trans-0-4">
            <!-- Button -->
            <button class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4" @click="addToCart">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div class="block2-txt p-t-20">
        <button @click="sendProductId" class="block2-name dis-block s-text3 p-b-5">
          <router-link :to="{name:'productDetails'}" > {{ product.productName }}</router-link>
        </button>

        <span class="block2-price m-text6 p-r-5">
									{{ product.unitPrice }}원
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from "@/EventBus";

export default {

  props : ["product"],

  data() {
    return {
      productId: this.product.productId,
      cartQuantity: null
    }
  },

  methods: {
    async addToCart(e) {
       e.preventDefault();
      this.jwt = localStorage.getItem('token');

      const cartQty = {
          productId: this.product.productId,
          cartQuantity: 1
      }
      await axios({
        method : 'post',
        url : "http://localhost:3030/api/cart/addProduct",
        data: JSON.stringify(cartQty),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + this.jwt
        }
      }).then(res => {
          alert(res.data);
        //home에서 cart새로고침하지 않고 데이터가져오기
        this.$store.dispatch('cart/getMyCart');
      }).catch(err => {
          alert(err.response.data.message)
      });
    },
    sendProductId(){
      EventBus.$emit('sendId', this.product.productId);
    }
  }
}
</script>