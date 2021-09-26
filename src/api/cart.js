import axios from 'axios';

export default {
    data() {
        return {
            jwt: null
        }
    },
    async getMyCart() {

        this.jwt = localStorage.getItem('token');

        const config = {
            headers: {
                "Authorization": "Bearer " + this.jwt
            }
        };
        return axios.get('api/cart/myCart', config);
    },

    async increaseCart(item) {

        this.jwt = localStorage.getItem('token');

        const cartInfo = {
            cartQuantity: item.cartQuantity + 1,
            productId: item.productId
        }
        await axios({
            method: 'put',
            url: "http://localhost:3030/api/cart/updateQty",
            data: JSON.stringify(cartInfo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.jwt
            }
        })
            .then(res => {
                alert("제품 수량이 수정되었습니다.");
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    },

    async decreaseCart(item) {

        this.jwt = localStorage.getItem('token');

        const cartInfo = {
            cartQuantity: item.cartQuantity - 1,
            productId: item.productId
        }
        await axios({
            method: 'put',
            url: "http://localhost:3030/api/cart/updateQty",
            data: JSON.stringify(cartInfo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.jwt
            }
        })
            .then(res => {
                alert("제품 수량이 수정되었습니다.");
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    },

    async deleteItem(item) {

        this.jwt = localStorage.getItem('token');

        await axios({
            method: 'delete',
            params: {
                productId : item.productId
            },
            url: "http://localhost:3030/api/cart/delete",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.jwt
            }
        })
            .then(res => {
                alert("제품이 장바구니에서 제거되었습니다.");
                //여기서 쿼리 다시 불러오게 호출해야
                //this.getMyCart();
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }


}