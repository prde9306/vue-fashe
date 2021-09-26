import productApi from '@/api/product';

export default {
  namespaced: true,
  state: {
    productList: [],
    totalProducts: 0,
    bestProducts: [],
    featuredProducts: [],
    page: 1,
    saleCode: "Yes"
  },
  mutations: {
    setBestProducts(state, productList) {
      state.bestProducts = [].concat(productList);
    },
    setFeaturedProducts(state, content) {
      state.featuredProducts = [].concat(content);
    },
    setProducts(state, content) {
      state.productList = [].concat(content);
    },
    setTotalProducts(state, totalCount) {
      state.totalProducts = totalCount;
    },
    setPage(state, page) {
      state.page = page;
    },
    setPriceRange(state, priceRange) {
      state.priceRange = priceRange;
    }
  },
  actions: {
    async setBestProducts({ commit }) {
      const response = await productApi.getBestProducts();

      commit('setBestProducts', response.data);
    },
    async setFeaturedProducts({ commit, state }, page =1) {
      const response = await productApi.getFeaturedProducts(page, state.saleCode);

      commit('setFeaturedProducts', response.data.saleProductList.content);
    },
    async setProducts({ commit, state }, page = 1) {
      const response = await productApi.getProducts(page);
      commit('setProducts', response.data.productList.content);
      commit('setTotalProducts', response.data.productList.totalElements);
      commit('setPage', response.data.productPagingDto);
    },
    async setPriceRange({ commit, dispatch }, priceRange) {
      commit('setPriceRange', priceRange);

      dispatch('setProducts');
    }
  }
}
