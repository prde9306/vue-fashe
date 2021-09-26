<template>
  <div class="container-table-cart pos-relative">
    <div class="wrap-table-shopping-cart bgwhite">
      <table class="table-shopping-cart">
        <tr class="table-head">
          <th class="column-1"></th>
          <th class="column-2">Product</th>
          <th class="column-3">Unit Price</th>
          <th class="column-4 p-l-90">Quantity</th>
          <th class="column-5">Total</th>
        </tr>

        <template v-for="item in cartItems">
          <tr class="table-row">
            <td class="column-1">
              <div class="cart-img-product b-rad-4 o-f-hidden" @click="delItem(item)">
                <img :src="item.imagePath" alt="IMG-PRODUCT">
              </div>
            </td>
            <td class="column-2">{{ item.productName }}</td>
            <td class="column-3">${{ item.productPrice }}</td>
            <td class="column-4 p-l-60">
              <div class="flex-w bo5 of-hidden w-size17">
                <button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2" @click="decrease(item)">
                  <i class="fs-12 fa fa-minus" aria-hidden="true"></i>
                </button>
                <input class="size8 m-text18 t-center num-product" type="number" name="num-product1" :value="item.cartQuantity">
                <button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2" @click="increase(item)">
                  <i class="fs-12 fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            </td>
            <td class="column-5">${{ item.cartQuantity * item.productPrice }}</td>
          </tr>
        </template>
      </table>
    </div>
      <P class="totalPrice float-right">Total Price: ${{totalCartPrice}}</P>
  </div>
</template>
<script>
  import { mapState, mapGetters } from 'vuex';

  export default {
    props: ["baseURL"],
    data(){
      return{
        productId: null,
        productName: null,
        productPrice: null,
        cartQuantity: null,
      }
    },

    computed: {
      ...mapState('cart', {
        cartItems: state => state.myCart
      }),
      ...mapGetters('cart',{
        totalCartPrice:'totalPrice',
        totalCartQty: 'totalQty'
      })
    },
    methods: {
      delItem(item) {
        this.$store.dispatch('cart/delItem', item);
        this.$router.go(this.$router.currentRoute);
      },
      increase(item) {
        this.$store.dispatch('cart/increaseQty',item);
      },
      decrease(item) {
        this.$store.dispatch('cart/decreaseQty', item);
      }
    },

    created(){
      this.$store.dispatch('cart/getMyCart')
    }
  }
</script>