import cartApi from "@/api/cart";

export default {
  namespaced: true,
  state: {
    items: [],
    myCart : [],
    cartQuantity:null
  },
  getters: {
    totalPrice(state) {
      return state.myCart.reduce((sum, myCart) => sum + myCart.productPrice * myCart.cartQuantity, 0);
    },
    totalQty(state) {
      return state.myCart.reduce((sum, myCart) => sum + myCart.cartQuantity, 0);
    }
  },
  mutations: {
    setMyCart(state, myCartInfo){
      state.myCart = myCartInfo;
    },
    addItem(state, item) {
      const cartItems = state.items.filter(cartItem => cartItem.productId === item.productId);

      if (cartItems.length === 0) {
        //push : 리스트에 요소 추가
        state.items.push({
          ...item,
          qty: 1
        });
      } else {
        cartItems[0].qty ++;
      }
    },
    delItem(state, item) {
      state.items = state.items.filter(cartItem => cartItem.productId !== item.productId);
    },
    changeQty(state, {item, cartQuantity}) {
      const cartItem = state.myCart.filter(cartItem => cartItem.productId === item.productId);

      if (cartItem.length !== 0) {
        if (cartItem[0].cartQuantity + cartQuantity <= 0) {
          const index = state.myCart.findIndex(cartItem => cartItem.productId === item.productId);
          state.myCart.splice(index, 1);
        } else {
          cartItem[0].cartQuantity += cartQuantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    }
  },
  actions: {
    addItem({ commit }, item) {
      commit('addItem', item);
    },
    async getMyCart({commit}) {
      const response = await cartApi.getMyCart();
      commit('setMyCart', response.data);
    },
    async delItem({ commit }, item) {
      await cartApi.deleteItem(item)
      commit('delItem', item);
    },
    async increaseQty({commit}, item) {
      await cartApi.increaseCart(item)

      commit('changeQty', {
        item,
        cartQuantity: 1,
      })
    },
    async decreaseQty({ commit }, item) {
      await cartApi.decreaseCart(item)

      commit('changeQty', {
        item,
        cartQuantity: -1
      })
    },
    clearCart({ commit }) {
      commit('clearCart');
    }
  }
}