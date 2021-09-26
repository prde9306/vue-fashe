<template>
  <div id="app">
    <Header :key="key"/>
    <router-view
    :baseURL="baseURL"
    @refreshHead ="refreshHead"
    />
    <Footer v-if="!['signUp', 'signIn'].includes($route.name)" />
  </div>
</template>
<script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    data(){
      return{
        baseURL : "http://localhost:3030/api/",
        key :0
      }
    },
    components: {
      Header,
      Footer
    },
    methods:{
      refreshHead(){
        this.key += 1;
      }
    },
    mounted() {
      $.initialize();
    }
  }
</script>
