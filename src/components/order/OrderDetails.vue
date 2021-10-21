<template>
  <div>
    <section class="bg-title-page p-t-40 p-b-50 flex-col-c-m"
             style="background-image: url(https://picsum.photos/1920/239/?image=155);">
      <h2 class="l-text2 t-center">
        My Order Details
      </h2>
    </section>

    <section class="cart bgwhite p-t-70 p-b-100">
      <div class="container">
        <h2><span style="border-bottom: 12px solid #dcf1fb; padding: 0 0 0 0.2em;">주문상세 내역</span></h2>
        <br>
        <div class="table-responsive">
          <table class="table">
            <tr class="table-head">
              <th>주문 상태</th>
              <th>상품 이미지</th>
              <th>상품명</th>
              <th>주문 수량</th>
              <th>제품 단가</th>
              <th>주문 일자</th>
            </tr>

            <template v-for="orderProduct in orderProducts">
              <tr class="table-row">
                <td>{{orderDetail.orderStatus}}</td>
                <td>
                    <div class="cart-img-product b-rad-4 o-f-hidden">
                      <img :src="orderProduct.productImagePath" alt="IMG-PRODUCT">
                    </div>
                </td>
                <td>{{ orderProduct.productName }}</td>
                <td>{{ orderProduct.orderQuantity }}</td>
                <td>{{ orderProduct.unitPrice }} 원</td>
                <td>{{ $moment(orderDetail.orderDate).format('LLLL')}}</td>
              </tr>
            </template>
          </table>
        </div>
      </div>
      <div class="container">
        <h2><span style="border-bottom: 12px solid #dcf1fb; padding: 0 0 0 0.2em;">배송정보</span></h2>
        <br>
        <div class="table-responsive">
          <table class="table">
            <tr class="table-head">
              <th>주문 번호</th>
              <th>주문 일자</th>
              <th>받으시는 분</th>
              <th>휴대폰 번호</th>
              <th>배송지 주소</th>
              <th>우편 번호</th>
            </tr>
              <tr class="table-row">
                <td>{{orderDetail.orderId}}</td>
                <td>{{ $moment(orderDetail.orderDate).format('LLLL')}}</td>
                <td>{{ receiverInformation.receiverName }}</td>
                <td>{{ receiverInformation.phoneNumber }}</td>
                <td>{{ receiverInformation.address.address1 }} {{receiverInformation.address.address2}}</td>
                <td>{{receiverInformation.address.zip}}</td>
              </tr>
          </table>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props:{id : Number},
  name:"orderDetails",
  computed:{
    ...mapState('order',{
      orderProducts: state => state.orderedProduct,
      receiverInformation : state=> state.receiverInfo,
      orderDetail :state =>state.orderDetails
    })
  },
  created(){
    this.$store.dispatch('order/setOrderDetails', this.id);
  }


}
</script>