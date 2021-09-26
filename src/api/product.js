import http from './http';
import axios from 'axios';

export default {
  async getBestProducts() {
    return http.get('api/best-product.json');
  },
  async getFeaturedProducts(page=1, saleCode="Yes") {
    return axios.get('api/products?page='+page+'&saleCode='+saleCode,{
      saleCode,
      page
    });
  },
  async getProducts(page = 1) {
    return axios.get('/api/products?page='+page, {
      page});
  }
}