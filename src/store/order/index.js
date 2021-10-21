import orderApi from '@/api/order';

export default {
    namespaced: true,
    state: {
        orderList: [],
        orderedProduct:[],
        receiverInfo:"",
        orderDetails:""
    },
    mutations: {
        setMyOrders(state, myOrderList) {
            state.orderList = [].concat(myOrderList);
        },
        setOrderProducts(state, orderedProudctList){
            state.orderedProduct=[].concat(orderedProudctList);
        },
        setReceiverInfo(state, receiverInfoDto){
            state.receiverInfo = receiverInfoDto
        },
        setOrderDetails(state, data){
            state.orderDetails =data;
        }
    },

    actions: {
        async orderProduct({commit}, cartItems) {
            await orderApi.orderProducts(cartItems);
        },
        async setMyOrders({commit}) {
            const response = await orderApi.getMyOrders();
            commit('setMyOrders', response.data.myOrderList);
        },
        async setOrderDetails({commit}, orderId){
            const response = await orderApi.getOrderDetails(orderId);

            commit('setOrderProducts', response.data.orderedProudctList);
            commit('setReceiverInfo', response.data.receiverInfoDto);
            commit('setOrderDetails', response.data);
        },
        async cancelOrder({commit}, orderId) {
            await orderApi.cancelOrder(orderId);
        }
    }

}