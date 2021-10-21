<template>
  <div>
    <section class="bg-title-page p-t-50 p-b-40 flex-col-c-m"
             :style="'background-image: url(https://picsum.photos/1920/239/?image=523);'">
      <h2 class="l-text2 t-center">
        Product Details
      </h2>
      <p class="m-text13 t-center">
        Welcome SpringBoot ShoppingMall 2021~!!
      </p>
    </section>

    <body>

    <div class="container">
      <div class="card">
        <div class="container-fliud">
          <div class="wrapper row">
            <div class="preview col-md-6">

              <div class="preview-pic tab-content">
                <div class="tab-pane active" id="pic-1" style="height: 500px; width: 400px;"><img
                    :src="productDetails.titleImg"/></div>
                <div class="tab-pane" id="pic-2" style="height: 500px; width: 400px;"><img
                    :src="productDetails.titleImg"/></div>
                <div class="tab-pane" id="pic-3" style="height: 500px; width: 400px;"><img
                    :src="productDetails.titleImg"/></div>
                <div class="tab-pane" id="pic-4" style="height: 500px; width: 400px;"><img
                    :src="productDetails.titleImg"/></div>
                <div class="tab-pane" id="pic-5" style="height: 500px; width: 400px;"><img
                    :src="productDetails.titleImg"/></div>
              </div>
              <ul class="preview-thumbnail nav nav-tabs">
                <li class="active"><a data-target="#pic-1" data-toggle="tab"><img :src="productDetails.titleImg"/></a>
                </li>
                <li><a data-target="#pic-2" data-toggle="tab"><img :src="productDetails.titleImg"/></a></li>
                <li><a data-target="#pic-3" data-toggle="tab"><img :src="productDetails.titleImg"/></a></li>
                <li><a data-target="#pic-4" data-toggle="tab"><img :src="productDetails.titleImg"/></a></li>
                <li><a data-target="#pic-5" data-toggle="tab"><img :src="productDetails.titleImg"/></a></li>
              </ul>

            </div>
            <div class="details col-md-6">
              <h2>Product Name</h2>
              <h3 class="product-title">{{ productDetails.productName }}</h3>
              <div class="rating">
                <div class="stars">
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                </div>
                <span class="review-no">{{ productDetails.rateAvg }}</span>
              </div>
              <h2>Product Description</h2>
              <p class="product-description">{{ productDetails.description }}</p>
              <br>
              <h5 class="price">current price: <span>{{ productDetails.unitPrice }}원</span></h5>
              <h5 class="price">현재 할인율: <span>{{ productDetails.discountPercent }}%</span></h5>
              <h5 class="price">재고량: <span>{{ productDetails.stockQty }}개</span></h5>

              <!--여기 수정해줘-->
              <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>

              <div class="action">
                <button class="add-to-cart btn btn-default" type="button" @click="addToCart">add to cart</button>
                <button class="add-to-cart btn btn-default" type="button" @click="orderProduct">바로 구매하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </body>
  </div>
</template>


<script>
import EventBus from "@/EventBus";

import {mapState} from 'vuex';

export default {

  methods: {
    async addToCart(e) {
      e.preventDefault();
      this.jwt = localStorage.getItem('token');

      const cartQty = {
        productId: this.productDetails.productId,
        cartQuantity: 1
      }
      await axios({
        method: 'post',
        url: "http://localhost:3030/api/cart/addProduct",
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
    orderProduct() {
      const cartItems = [
        {
          productId: this.productDetails.productId,
          cartQuantity: 1
        }
      ]
      this.$store.dispatch('order/orderProduct', cartItems);
      this.$router.push('/orderList');
    }
  }
  ,
  computed: {
    ...mapState('product', {
      productDetails: state => state.productDetails
    })
  },
  created() {
    EventBus.$on('sendId', (payload) => {
      this.$store.dispatch('product/setProductDetails', payload)
    });
  },
  beforeDestroy() {
    EventBus.$off('sendId');
  }
}

</script>


<style>

/*****************globals*************/
body {
  font-family: 'open sans';
  overflow-x: hidden;
}

img {
  max-width: 100%;
}

.preview {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

@media screen and (max-width: 996px) {
  .preview {
    margin-bottom: 20px;
  }
}

.preview-pic {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.preview-thumbnail.nav-tabs {
  border: none;
  margin-top: 15px;
}

.preview-thumbnail.nav-tabs li {
  width: 18%;
  margin-right: 2.5%;
}

.preview-thumbnail.nav-tabs li img {
  max-width: 100%;
  display: block;
}

.preview-thumbnail.nav-tabs li a {
  padding: 0;
  margin: 0;
}

.preview-thumbnail.nav-tabs li:last-of-type {
  margin-right: 0;
}

.tab-content {
  overflow: hidden;
}

.tab-content img {
  width: 100%;
  -webkit-animation-name: opacity;
  animation-name: opacity;
  -webkit-animation-duration: .3s;
  animation-duration: .3s;
}

.card {
  margin-top: 50px;
  background: #eee;
  padding: 3em;
  line-height: 1.5em;
}

@media screen and (min-width: 997px) {
  .wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
}

.details {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.colors {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.product-title, .price, .sizes, .colors {
  text-transform: UPPERCASE;
  font-weight: bold;
}

.checked, .price span {
  color: #ff9f1a;
}

.product-title, .rating, .product-description, .price, .vote, .sizes {
  margin-bottom: 15px;
}

.product-title {
  margin-top: 0;
}

.size {
  margin-right: 10px;
}

.size:first-of-type {
  margin-left: 40px;
}

.color {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  height: 2em;
  width: 2em;
  border-radius: 2px;
}

.color:first-of-type {
  margin-left: 20px;
}

.add-to-cart, .like {
  background: #ff9f1a;
  padding: 1.2em 1.5em;
  border: none;
  text-transform: UPPERCASE;
  font-weight: bold;
  color: #fff;
  -webkit-transition: background .3s ease;
  transition: background .3s ease;
}

.add-to-cart:hover, .like:hover {
  background: #b36800;
  color: #fff;
}

.not-available {
  text-align: center;
  line-height: 2em;
}

.not-available:before {
  font-family: fontawesome;
  content: "\f00d";
  color: #fff;
}

.orange {
  background: #ff9f1a;
}

.green {
  background: #85ad00;
}

.blue {
  background: #0076ad;
}

.tooltip-inner {
  padding: 1.3em;
}

@-webkit-keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
    -webkit-transform: scale(3);
    transform: scale(3);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

</style>