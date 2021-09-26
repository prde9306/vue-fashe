<template>

  <!doctype html>
  <html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="fonts/icomoon/style.css">
    <link rel="stylesheet" href="css1/owl.carousel.min.css">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css1/bootstrap.min.css">
    <!-- Style -->
    <link rel="stylesheet" href="css1/style.css">

    <title>Sign Up #2</title>
  </head>
  <body>


  <div class="d-lg-flex half">
    <div class="bg order-1 order-md-2" style="background-image: url('images/bg_1.jpg');"></div>
    <div class="contents order-2 order-md-1">

      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-7 py-5">
            <h3>Register</h3>
            <p class="mb-4"> Welcome SpringBoot shoppingmall !! </p>
            <form @submit="signup">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group first">
                    <label for="fname">First Name</label>
                    <input type="text" class="form-control" placeholder="ex. John" id="fname" v-model="firstName">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group first">
                    <label for="lname">Last Name</label>
                    <input type="text" class="form-control" placeholder="ex. Smith" id="lname" v-model="lastName">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group first">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control" placeholder="ex. john@google.com" id="email" v-model="email">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group first">
                    <label for="phoneNumber">Phone Number</label>
                    <input type="text" class="form-control" placeholder="ex. 010-1234-5678" id="phoneNumber" v-model="phoneNumber">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group first">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" placeholder="ex. 서울특별시 가나다구" id="address" v-model="address1">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group first">
                    <label for="addressDetails">Address Details</label>
                    <input type="text" class="form-control" placeholder="ex. 라마동 123-44 아자빌 203호" id="addressDetails" v-model="address2">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group first">
                    <label for="zip">Zip Code</label>
                    <input type="text" class="form-control" placeholder="ex. 123123" id="zip" v-model="zip">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">

                  <div class="form-group last mb-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" placeholder="ex. Your Password" id="password"  v-model="password">
                  </div>
                </div>
                <div class="col-md-6">

                  <div class="form-group last mb-3">
                    <label for="re-password">Re-type Password</label>
                    <input type="password" class="form-control" placeholder="ex. Confirm Password" id="re-password" v-model="passwordConfirm">
                  </div>
                </div>
              </div>

              <div class="d-flex mb-5 mt-4 align-items-center">
                <div class="d-flex align-items-center">
                  <label class="control control--checkbox mb-0"><span class="caption">Creating an account means you're okay with our <a
                      href="#">Terms and Conditions</a> and our <a href="#">Privacy Policy</a>.</span>
                    <input type="checkbox" checked="checked"/>
                    <div class="control__indicator"></div>
                  </label>
                </div>
              </div>

              <input type="submit" value="Register" class="btn px-5 btn-primary">

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  </body>
  </html>
</template>
<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/main.js"></script>

<script>
export default {
  name: "signUp",
  props : ["baseURL"],
  data(){
    return{
      firstName : null,
      lastName : null,
      email : null,
      phoneNumber : null,
      address : [],
      password : null,
      passwordConfirm: null
    }
  },
  methods : {
    async signup(e) {
      e.preventDefault();
      if (this.password === this.passwordConfirm) {

        const user = {
              email: this.email,
              firstName: this.firstName,
              lastName: this.lastName,
              phoneNumber: this.phoneNumber,
              address: {
              address1: this.address1,
              address2: this.address2,
              zip: this.zip
            },
          password: this.password,
          passwordConfrim : this.passwordConfrim
        }

        await axios({
          method : 'post',
          url : this.baseURL + "signUp",
          data : JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
              this.$router.replace("/");
              alert("^-^; 회원가입이 완료되었습니다. 서비스를 이용하려면 로그인해 주시기 바랍니다.")
            })
            .catch(err => {
              if(err.response.data.code==="IN_001")
                alert([].concat(err.response.data.errors)[0].reason);
              else{
                alert(err.response.data.message);
              };
            });
      } else {
        alert("비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.")
      }
    }
  }
}

</script>

<style scoped>

</style>