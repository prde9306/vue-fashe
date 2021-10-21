<template>
  <div id="app">
    <Header/>
    <router-view
    :baseURL="baseURL"
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
      }
    },
    components: {
      Header,
      Footer
    },
    mounted() {
      $.initialize();
    }
  }
</script>
