<template>
  <!--여기는 일반 상품 진열 랜덤으로?-->
  <section class="newproduct bgwhite p-t-45 p-b-105">
    <div class="container">
      <div class="sec-title p-b-60">
        <h3 class="m-text5 t-center">
          List of products on discount
        </h3>
      </div>
      <!-- Slide2 -->
      <div class="wrap-slick2">
        <div class="slick2" ref="slick">
          <template v-for="product in products">
            <Product :product="product" />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { mapState } from 'vuex';

  import Product from '@/components/shop/Product.vue';

  export default {
    props:["baseURL"],
    computed: {
      ...mapState('product', {
        products: state => state.discountedProducts
      })
    },
    methods: {

    },
    created() {
      this.$store.dispatch('product/setDiscountedProducts').then(() => {
        $(this.$refs.slick).slick2();
      });
    },
    components: {
      Product
    }
  }
</script>