<template>
  <div class="limiter">
    <div class="container-login100" style="background-image: url('images/bg_1.jpg');">
      <div class="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
        <form @submit="signin" class="login100-form validate-form flex-sb flex-w">
					<span class="login100-form-title p-b-53">
						Sign In With
					</span>

          <a href="#" class="btn-face m-b-20">
            <i class="fa fa-facebook-official"></i>
            Facebook
          </a>

          <a href="#" class="btn-google m-b-20">
            <img src="/images/icons/icon-google.png" alt="GOOGLE">
            Google
          </a>

          <div class="p-t-31 p-b-9">
						<span class="txt1">
							Email
						</span>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Email is required">
            <input class="input100" type="email" v-model="email" required>
            <span class="focus-input100"></span>
          </div>

          <div class="p-t-13 p-b-9">
						<span class="txt1">
							Password
						</span>

            <a href="#" class="txt2 bo1 m-l-5">
              Forgot?
            </a>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Password is required">
            <input class="input100" type="password" v-model="password" required>
            <span class="focus-input100"></span>
          </div>

          <div class="container-login100-form-btn m-t-17">
            <button type="submit" class="login100-form-btn">
              Sign In
            </button>
          </div>

          <div class="w-full text-center p-t-55">
						<span class="txt2">
							Not a member?
						</span>

            <router-link :to="{name:'signUp'}" class="txt2 bo1">
              Sign up now
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>


export default {

  name: 'signIn',
  props: ["baseURL"],

  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    async signin(e) {
      e.preventDefault();

      const user = {
        email: this.email,
        password: this.password
      }

      await axios({
        method: 'post',
        url: this.baseURL + "authenticate",
        data: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          localStorage.setItem('token', res.data.token);
          this.$store.dispatch('cart/getMyCart');
          this.$router.push('/');

        })
         .catch(err => {
           alert(err.response.data.message);
            console.log(err);
         })
    }
  },
}
</script>


<style scoped>

</style>
