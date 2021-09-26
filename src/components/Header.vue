<template>
  <header class="header1">
    <!--sementic-ui-->
    <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css">
     <!--sementic-ui-->

    <!-- Header desktop -->
    <div class="container-menu-header">
      <div class="topbar">
        <div class="topbar-social">
          <a href="https://facebook.com" target="_blank" class="topbar-social-item fa fa-facebook"></a>
          <a href="#" class="topbar-social-item fa fa-instagram"></a>
          <a href="#" class="topbar-social-item fa fa-pinterest-p"></a>
          <a href="#" class="topbar-social-item fa fa-snapchat-ghost"></a>
          <a href="#" class="topbar-social-item fa fa-youtube-play"></a>
        </div>

        <span class="topbar-child1">
					5만원 이상 구매시 무료배송해 드립니다!!^-^
				</span>


      </div>

            <div class="wrap_header">
                <!-- Logo -->
                <a href="index.html" class="logo">
                    <img src="images/icons/springboot.png" alt="IMG-LOGO">
                </a>

                <!-- Menu -->
                <div class="wrap_menu">
                    <nav class="menu">
                        <ul class="main_menu">

                            <router-link :to="{name: 'shop'}" tag="li" active-class="sale-noti" exact>
                                <a>Shop</a>
                            </router-link>

                            <router-link :to="{name: 'cart'}" tag="li" active-class="sale-not" exact>
                                <a>Cart</a>
                            </router-link>
                        </ul>
                    </nav>
                </div>

                <!-- Header Icon -->
                <ul class="header-icons">

                    <li class="nav-item dropdown">
                      <a class="nav-link text-light dropdown-toggle" href="#" id="navbarDropdown" role="button"
                         data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                        <img src="images/icons/icon-header-01.png" class="header-icon1" alt="ICON">
                      </a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdown">

                        <router-link class="dropdown-item" v-if="token" :to="{name : 'profile'}">마이페이지</router-link>
                        <router-link class="dropdown-item" v-if="!token" :to="{name : 'signIn'}">로그인</router-link>
                        <router-link class="dropdown-item" v-if="!token" :to="{name : 'signUp'}">회원가입</router-link>
                        <div class="dropdown-item" v-if="token" @click="signout">로그아웃</div>
                      </div>
                    </li>


                  <li class="nav-item dropdown">
                        <img src="images/icons/icon-header-02.png" class="header-icon1 js-show-header-dropdown" alt="ICON">
                        <span class="header-icons-noti">{{ totalCartQty }}</span>

                        <!-- Header cart noti -->
                        <div class="header-cart header-dropdown">
                            <ul class="header-cart-wrapitem">
                                <template v-for="product in cartItems">
                                    <li class="header-cart-item">
                                        <div class="header-cart-item-img" @click="delItem(product)">
                                            <img :src="product.imagePath" alt="IMG">
                                        </div>

                                        <div class="header-cart-item-txt">
                                            <router-link to="/" class="header-cart-item-name">
                                                {{ product.productName }}
                                            </router-link>

                                            <span class="header-cart-item-info">
                                              {{ product.cartQuantity }} x ${{ product.productPrice }}
                                            </span>
                                        </div>
                                    </li>
                                </template>
                            </ul>

                            <div class="header-cart-total">
                                Total: ${{ totalCartPrice }}
                            </div>

                            <div class="header-cart-buttons">
                                <div class="header-cart-wrapbtn">
                                    <!-- Button -->

                                  <router-link :to="{name: 'cart'}" tag="li" active-class="sale-noti" exact>
                                    <a href="/cart" class="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                        View Cart
                                    </a>
                                  </router-link>

                                </div>

                                <div class="header-cart-wrapbtn">
                                    <!-- Button -->
                                    <a href="#" class="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                        Check Out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>

        <!-- Header Mobile -->
        <div class="wrap_header_mobile">
            <!-- Logo moblie -->
            <a href="index.html" class="logo-mobile">
                <img src="images/icons/springBoot.png" alt="IMG-LOGO">
            </a>

            <!-- Button show menu -->
            <div class="btn-show-menu">
                <!-- Header Icon mobile -->
                <div class="header-icons-mobile">

                  <div class="nav-item dropdown">
                    <a class="nav-link text-light dropdown-toggle" href="#" id="navbarDropdown2" role="button"
                       data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                      <img src="images/icons/icon-header-01.png" class="header-icon1" alt="ICON">
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown2">

                      <router-link class="dropdown-item" v-if="token" :to="{name : 'profile'}">마이페이지</router-link>
                      <router-link class="dropdown-item" v-if="!token" :to="{name : 'signIn'}">로그인</router-link>
                      <router-link class="dropdown-item" v-if="!token" :to="{name : 'signUp'}">회원가입</router-link>
                      <div class="dropdown-item" v-if="token" @click="signout">로그아웃</div>

                    </div>
                  </div>
<!--                    <span class="linedivide2"></span>-->

                    <div class="header-wrapicon2">
                        <img src="images/icons/icon-header-02.png" class="header-icon1 js-show-header-dropdown" alt="ICON">
                        <span class="header-icons-noti">{{ totalCartQty }}</span>

                        <!-- Header cart noti -->
                        <div class="header-cart header-dropdown">
                            <ul class="header-cart-wrapitem">
                                <template v-for="product in cartItems">
                                    <li class="header-cart-item">
                                        <div class="header-cart-item-img">
                                            <img :src="product.imagePath" alt="IMG">
                                        </div>

                                        <div class="header-cart-item-txt">
                                            <router-link to="/" class="header-cart-item-name">
                                                {{ product.productName }}
                                            </router-link>

                                            <span class="header-cart-item-info">
                                              {{ product.cartQuantity }} x ${{ product.productPrice }}
                                            </span>
                                        </div>
                                    </li>
                                </template>
                            </ul>

                            <div class="header-cart-total">
                                Total: ${{ totalCartPrice }}
                            </div>

                            <div class="header-cart-buttons">
                                <div class="header-cart-wrapbtn">
                                    <!-- Button -->
                                    <a href="/cart" class="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                        View Cart
                                    </a>
                                </div>

                                <div class="header-cart-wrapbtn">
                                    <!-- Button -->
                                    <a href="#" class="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                        Check Out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="btn-show-menu-mobile hamburger hamburger--squeeze">
					<span class="hamburger-box">
						<span class="hamburger-inner"></span>
					</span>
                </div>
            </div>
        </div>

        <!-- Menu Mobile -->
        <div class="wrap-side-menu" >
            <nav class="side-menu">
                <ul class="main-menu">
                    <li class="item-topbar-mobile p-l-20 p-t-8 p-b-8">
						<span class="topbar-child1">
							Free shipping for standard order over $100
						</span>
                    </li>

<!--                    <li class="item-topbar-mobile p-l-20 p-t-8 p-b-8">-->
<!--                        <div class="topbar-child2-mobile">-->
<!--							<span class="topbar-email">-->
<!--								fashe@example.com-->
<!--							</span>-->

<!--                            <div class="topbar-language rs1-select2">-->
<!--                                <select class="selection-1" name="time">-->
<!--                                    <option>USD</option>-->
<!--                                    <option>EUR</option>-->
<!--                                </select>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </li>-->

                    <li class="item-topbar-mobile p-l-10">
                        <div class="topbar-social-mobile">
                            <a href="#" class="topbar-social-item fa fa-facebook"></a>
                            <a href="#" class="topbar-social-item fa fa-instagram"></a>
                            <a href="#" class="topbar-social-item fa fa-pinterest-p"></a>
                            <a href="#" class="topbar-social-item fa fa-snapchat-ghost"></a>
                            <a href="#" class="topbar-social-item fa fa-youtube-play"></a>
                        </div>
                    </li>

                    <li class="item-menu-mobile">
                        <a href="index.html">Home</a>
                        <ul class="sub-menu">
                            <li><a href="index.html">Homepage V1</a></li>
                            <li><a href="home-02.html">Homepage V2</a></li>
                            <li><a href="home-03.html">Homepage V3</a></li>
                        </ul>
                        <i class="arrow-main-menu fa fa-angle-right" aria-hidden="true"></i>
                    </li>

                    <li class="item-menu-mobile">
                        <a href="product.html">Shop</a>
                    </li>

                    <li class="item-menu-mobile">
                        <a href="product.html">Sale</a>
                    </li>

                    <li class="item-menu-mobile">
                        <a href="cart.html">Features</a>
                    </li>

                    <li class="item-menu-mobile">
                        <a href="blog.html">Blog</a>
                    </li>

                    <li class="item-menu-mobile">
                        <a href="about.html">About</a>
                    </li>

                    <li class="item-menu-mobile">
                        <a href="contact.html">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script src="https://code.jquery.com/jquery-3.1.1.min.js"
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
        crossorigin="anonymous"></script>
<script src="semantic/dist/semantic.min.js"></script>

<script>
    import { mapState, mapGetters } from 'vuex';

    export default {
      name : "Header",
      data(){
        return{
          token: null
        }
      },
      methods:{
        signout(){
          localStorage.removeItem('token');
          this.token =null;
          this.$router.go(this.$router.currentRoute);
        },
        delItem(product) {
          this.$store.dispatch('cart/delItem', product);
          alert
          this.$router.go(this.$router.currentRoute);

        },
      },
      mounted(){
        this.token = localStorage.getItem('token');
      },
        computed: {
            ...mapState('cart', {
                cartItems: state => state.myCart
            }),
            ...mapGetters('cart', {
                totalCartPrice: 'totalPrice',
                totalCartQty: 'totalQty'
            })
        }
    }
</script>

