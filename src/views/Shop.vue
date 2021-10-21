<template>
    <div>
        <section class="bg-title-page p-t-50 p-b-40 flex-col-c-m" :style="'background-image: url(https://picsum.photos/1920/239/?image=599);'">
            <h2 class="l-text2 t-center">
              {{ catSort.categoryName }}
            </h2>
            <p class="m-text13 t-center">
                Welcome SpringBoot ShoppingMall 2021~!!
            </p>
        </section>

      <section class="bgwhite p-t-55 p-b-65">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-3 p-b-50">
              <div class="leftbar p-r-20 p-r-0-sm">

                <!--category List-->
                <div>
                  <h4 class="m-text14 p-b-7">
                    Categories
                  </h4>
                  <form class="p-b-54" @click="selectProduct">
                    <div class="form-row align-items-center">
                      <div class="col-auto my-1">
                        <label class="mr-sm-2" for="inlineFormCustomSelect">Product Category</label>
                        <select class="custom-select mr-sm-2"v-model="catSort.categoryName" >
                          <option value="ALL">ALL</option>
                          <option v-model:value="catSort.categoryName" v-for="catSort in categories" v-if="catSort.categoryLevel ===1">{{ catSort.categoryName }}</option>
                        </select>
                      </div>
                      <div class="col-auto my-1">
                        <label class="mr-sm-2" for="inlineFormCustomSelect">Sort By</label>
                        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-model="catSort.sortCode">
                          <option value="NEW">NEW</option>
                          <option value="PAST">PAST</option>
                          <option value="HIGHPRICE">HIGH PRICE</option>
                          <option value="LOWPRICE">LOW PRICE</option>
                          <option value="HIGHSELL">HIGH SELL</option>
                          <option value="LOWSELL">LOW SELL</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-auto my-3">
                      <button type="button" class="btn btn-primary">조회하기</button>
                    </div>
                  </form>
                </div>

                <h4 class="m-text14 p-b-32">
                  Filters
                </h4>
                <PriceFilter/>

                <div class="search-product pos-relative bo4 of-hidden">
                  <input class="s-text7 size6 p-l-23 p-r-50" type="text" name="search-product"
                         placeholder="Search Products...">

                  <button class="flex-c-m size5 ab-r-m color2 color0-hov trans-0-4">
                    <i class="fs-12 fa fa-search" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-md-8 col-lg-9 p-b-50">
              <!--Product 위에-->
              <div class="flex-sb-m flex-w p-b-35">
                            <span class="s-text8 p-t-5 p-b-5">
                              Showing {{ ((pageInformagtion.page - 1) * 12) + 1 }}–{{ ((pageInformagtion.page - 1) * 12) + 12 }} of {{ totalProducts }} results
                            </span>
              </div>

              <!-- Product -->
              <ProductList/>
              <!-- Pagination -->
              <!--기존꺼는 일단 주석처리-->
<!--              <div class="pagination flex-m flex-w p-t-26">-->
<!--                <template v-for="p in Math.ceil(totalProducts / 12)">-->
<!--                  <button-->
<!--                      type="button"-->
<!--                      @click="changePage(p)"-->
<!--                      class="item-pagination flex-c-m trans-0-4"-->
<!--                      :class="{'active-pagination': p === page}">-->
<!--                    {{ p }}-->
<!--                  </button>-->
<!--                </template>-->
<!--              </div>-->

              <!-- Pagination -->
              <div>
                <template>
                  <div class="overflow-auto">
                    <!-- Use text in props -->
                    <b-pagination
                        @change="changePage"
                        v-model="pageInformagtion.page"
                        :total-rows="totalProducts"
                        :per-page=12
                        first-text="First"
                        prev-text="Prev"
                        next-text="Next"
                        last-text="Last"
                    ></b-pagination>
                    </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
    import { mapState } from 'vuex';

    import PriceFilter from '@/components/shop/PriceFilter.vue';
    import ProductList from '@/components/shop/ProductList.vue';

    export default {
      data() {
          return {
            catSort: {
              categoryName: "ALL",
              sortCode: "NEW",
              pageInformation: {
                page: 1
              }
            }
          }
      },
      computed: {
        ...mapState('product', {
          totalProducts: state => state.totalProducts,
          pageInformagtion: state => state.pageInfo
        }),
        ...mapState('category', {
          categories: state => state.allCategories
        })
      },
      methods: {
        //changePage bootstrop b-pagination누르면 value가 들어옴)
        async changePage(value) {
          try {

              const response = await axios.get('/api/products', {
                params: {
                  categoryCode: this.catSort.categoryName,
                  page: value,
                  sortCode: this.catSort.sortCode,
                }
              })
              this.$store.dispatch('product/setProductCatSortPage', response.data.productList.content);

            // const response = await axios.get('/api/products?categoryCode='+this.catSort.categoryName+
            //     '&page='+value+'&sortCode='+this.catSort.sortCode);
          } catch (error) {
            console.error(error);
          }
        },
        selectProduct(){
          this.$store.dispatch('product/setProductCatSort', this.catSort);
        }
      },
      components: {
        PriceFilter,
        ProductList
      },
      mounted() {
        //카테고리 보이게
        this.$store.dispatch('category/setAllCategories');
        //모든 product 보이게
        this.$sotre.dispatch('product/setProducts');
      }
    }
</script>
