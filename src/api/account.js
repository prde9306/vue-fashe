import axios from 'axios';

export default {
    data() {
        return {
            jwt: null
        }
    },
    async getAccountProfile() {

        this.jwt = localStorage.getItem('token');

        const config = {
            headers: {
                "Authorization": "Bearer " + this.jwt
            }
        };
        return axios.get('api/account', config);
    }
}