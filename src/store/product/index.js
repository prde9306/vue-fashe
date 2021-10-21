import productApi from '@/api/product';

export default {
  namespaced: true,
  state: {
    productList: [],
    totalProducts: 0,
    bestProducts: [],
    discountedProducts: [],
    pageInfo: '',
    saleCode: "Yes",
    productDetails:""
  },
  mutations: {
    setBestProducts(state, productList) {
      state.bestProducts = [].concat(productList);
    },
    setDiscountedProducts(state, content) {
      state.discountedProducts = [].concat(content);
    },
    setProducts(state, content) {
      state.productList = [].concat(content);
    },
    setProductDetails(state, data){
      state.productDetails = data;
    },
    setTotalProducts(state, totalCount) {
      state.totalProducts = totalCount;
    },
    setPage(state, pageInfo) {
      state.pageInfo = pageInfo;
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
    async setDiscountedProducts({ commit, state }, page =1) {
      const response = await productApi.getDiscountedProducts(page, state.saleCode);

      commit('setDiscountedProducts', response.data.saleProductList.content);
    },
    async setProducts({ commit, state }, page) {
      const response = await productApi.getProducts(page);

      commit('setProducts', response.data.productList.content);
      commit('setTotalProducts', response.data.productList.totalElements);
      commit('setPage', response.data.productPagingDto);
    },

     async setProductDetails({commit, state}, id){
      const response = await productApi.getProductDetails(id);
      commit('setProductDetails', response.data);
    },
    //shoppingList의 Cateogory로 상품조회
    async setProductCatSort({commit, state},catSort){
      const response = await productApi.getProductsCatSort(catSort);
      commit('setProducts', response.data.productList.content);
      commit('setTotalProducts', response.data.productList.totalElements);
      commit('setPage', response.data.productPagingDto);
    },
    //header의 dropdown으로 상품조회
    async setSecondProduct({commit, state}, secondCatCode, value){
      const response = await productApi.getSecondCatCode(secondCatCode, value);
      commit('setProducts', response.data.productList.content);
      commit('setTotalProducts', response.data.productList.totalElements);
      commit('setPage', response.data.productPagingDto);
    },
    setProductCatSortPage({commit, state}, information ){
      commit('setProducts', information);
    },
    async setPriceRange({ commit, dispatch }, priceRange) {
      commit('setPriceRange', priceRange);

      dispatch('setProducts');
    }
  }
}
