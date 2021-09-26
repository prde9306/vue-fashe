import accountApi from "@/api/account";

export default {
    //namespaced 찾아
    namespaced : true,
    state: {
        account: "",

    },
    mutations: {
        setAccountProfile(state, accountInfo){
            state.account = accountInfo;
        },

    },
    actions:{
        async setAccountProfile({ commit }){
            const response = await accountApi.getAccountProfile();
            commit('setAccountProfile', response.data);
        }
    }
}
