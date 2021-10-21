import axios from 'axios';

export default {
    data() {
        return {
            jwt: null
        }
    },
    async orderProducts(cartItems) {
        this.jwt = localStorage.getItem('token');
        const orderDetailsList = [];
        const items={
            orderDetailsList
        }
        for (var i = 0; i < cartItems.length; i++) {
            orderDetailsList.push({
                orderQuantity: cartItems[i].cartQuantity,
                productId: cartItems[i].productId
            })
        }
        await axios({
            method: 'post',
            url: "http://localhost:3030/api/order",
            data: JSON.stringify(items),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.jwt
            }
        })
            .then(res => {

            })
            .catch(err => {
                alert(err.response.data.message);
            })
        alert("주문이 완료되었습니다.!!");
     },
    async getMyOrders() {
        this.jwt = localStorage.getItem('token');

        const config = {
            headers: {
                "Authorization": "Bearer " + this.jwt
            }
        };
        return axios.get('api/myOrders', config);
    },
    async getOrderDetails(orderId) {

        this.jwt = localStorage.getItem('token');

        return await axios({
            method: 'get',
            url: "http://localhost:3030/api/myOrders/" + orderId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.jwt
            }
        })
    },
    async cancelOrder(orderId) {
        this.jwt = localStorage.getItem('token');

        await axios({
            method: 'put',
            url: "http://localhost:3030/api/myOrders/" + orderId + "/cancel",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.jwt
            }
        })
            .then(res => {
                alert("주문 취소되었습니다!");
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }
}