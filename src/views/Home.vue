<template>
  <div class="home">
    <SlideBanner />
    <BestProductList />
    <DiscountedProductList />
    <MiddleBanner />
    <BlogArticles />
    <InstagramArticles />
  </div>
</template>

<script>
import SlideBanner from '@/components/home/SlideBanner.vue';
import BestProductList from '@/components/home/BestProductList.vue';
import DiscountedProductList from '@/components/home/DiscountedProductList.vue';
import MiddleBanner from '@/components/home/MiddleBanner.vue';
import BlogArticles from '@/components/home/BlogArticles.vue';
import InstagramArticles from '@/components/home/InstagramArticles.vue';

export default {
  name: 'home',
  components: {
    SlideBanner,
    BestProductList,
    DiscountedProductList,
    MiddleBanner,
    BlogArticles,
    InstagramArticles
  },
  props : ["baseURL"]
}
</script>
