import http from './http';
import axios from 'axios';

export default {
  async getBestProducts() {
    return http.get('api/best-product.json');
  },
  async getDiscountedProducts(page=1, saleCode="Yes") {
    return axios.get('api/products?page='+page+'&saleCode='+saleCode,{
      saleCode,
      page
    });
  },
  async getProducts(page=1) {
    return axios.get('/api/products?page='+page,{
      page
        });
  },
   async getProductDetails(id){
    return axios.get('/api/products/'+id,{
      id
    });
  },
  async getSecondCatCode(secondCatCode, page=1){
    return axios.get('api/products'+'?categoryCode='+secondCatCode+'&page='+page, {
      secondCatCode,
      page
    });
  },
  async getProductsCatSort(catSort){
    return axios.get('api/products',
        { params: {categoryCode: catSort.categoryName, page:catSort.pageInformation.page, sortCode: catSort.sortCode}});
  },
}


