import categoryApi from '@/api/category';

export default {
    namespaced : true,
    state:{
        allCategories:[]
    },
    mutations:{
        setAllCategories(state, categoryInfo){
            state.allCategories=[].concat(categoryInfo);
        }
    },
    actions:{
        async setAllCategories({commit}){
            const response = await categoryApi.getAllCategories();
            commit('setAllCategories', response.data.mainCategoryList);
        }
    }

}