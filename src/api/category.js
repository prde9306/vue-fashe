import axios from 'axios';

export  default {
    async getAllCategories(){
        return axios.get('/api/categories');
    }
}