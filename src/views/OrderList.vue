<template>
  <div>
  <section class="bg-title-page p-t-40 p-b-50 flex-col-c-m"
           style="background-image: url(https://picsum.photos/1920/239/?image=134);">
    <h2 class="l-text2 t-center">
      My Order List
    </h2>
  </section>
  <section class="cart bgwhite p-t-70 p-b-100">
    <div class="container">
      <h2><span style="border-bottom: 12px solid #dcf1fb; padding: 0 0 0 0.2em;">주문 내역</span></h2>
      <br>
      <div class="table-responsive">
        <table class="table">
          <tr class="table-head">
            <th>주문 번호</th>
            <th>대표 주문 사진<br>(클릭 시 주문 상세)</th>
            <th>대표 주문 제품</th>
            <th>주문 총액</th>
            <th>주문 일자</th>
            <th>주문 상태</th>
            <th>배송 상태</th>
            <th>주문 취소하기</th>
          </tr>

          <template v-for="myOrder in myOrderList">
            <tr class="table-row">
              <td>{{ myOrder.orderId }}</td>
              <td>
                <router-link :to="{name:'orderDetails', params: {id:myOrder.orderId}}" tag="button">
                <div class="cart-img-product b-rad-4 o-f-hidden">
                  <img :src="myOrder.representativeProductPath" alt="IMG-PRODUCT">
                </div>
                </router-link>
              </td>
              <td>{{ myOrder.representativeProductName }}</td>
              <td>{{ myOrder.totalAmount }} 원</td>
              <td>{{ $moment(myOrder.orderDate).format('LLLL')}}</td>
              <td>{{ myOrder.orderStatus }}</td>
              <td>{{myOrder.deliveryStatus}}</td>
              <td><div><b-button variant="danger" @click="orderCancel(myOrder)">주문 취소</b-button></div></td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "orderList",
  methods:{
    orderCancel(myOrder){
      this.$store.dispatch('order/cancelOrder', myOrder.orderId);
    }
  },
  computed: {
    ...mapState('order', {
      myOrderList: state => state.orderList
    })
  },
  created() {
    this.$store.dispatch('order/setMyOrders');
  }
}
</script>
