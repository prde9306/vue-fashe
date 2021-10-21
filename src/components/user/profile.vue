<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
          <span class="font-weight-bold">{{ user.firstName }}</span>
          <span class="text-black-50">{{user.email}}</span>
        </div>
      </div>
      <form @submit="updateProfile" class="col-md-5 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">User Profile</h4>
          </div>

          <div class="row mt-2">
            <div class="col-md-6"><label class="labels">* FirstName</label>
              <input type="text" class="form-control" placeholder="first name"v-model="user.firstName">
            </div>
            <div class="col-md-6"><label class="labels">* LastName</label>
              <input type="text" class="form-control"  placeholder="last name"v-model="user.lastName" >
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12"><label class="labels">Address Line 1 *</label>
              <input type="text" class="form-control" placeholder="enter address line 1" v-model="user.address.address1">
            </div>
            <div class="col-md-12"><label class="labels">Address Line 2 *</label>
              <input type="text" class="form-control" placeholder="enter address line 2" v-model="user.address.address2"></div>
            <div class="col-md-12"><label class="labels">Zipcode *</label>
              <input type="text" class="form-control" placeholder="enter Zipcode" v-model="user.address.zip"></div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12"><label class="labels">Email ID</label>
              <input type="text" class="form-control" placeholder="enter email id" v-model="user.email" readonly>
            </div>
            <div class="col-md-12"><label class="labels">Mobile Number</label>
              <input type="text" class="form-control" placeholder="enter phone number" v-model="user.phoneNumber" readonly>
            </div>
          </div>

          <p> * 표시가 있는 칸은 필수 입력 값입니다.</p>
          <div class="mt-5 text-center">
            <input class="btn btn-primary profile-button" type="submit" value="Save Profile">
          </div>
        </div>
      </form>
      <form @submit="changePassword" class="col-md-4">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Change Password</h4>
          </div>
          <div class="col-md-12">
            <label class="labels">Old Password</label>
            <input type="text" class="form-control" placeholder="기존 비밀번호를 입력해 주세요." v-model="oldPassword" autocomplete="on">
          </div>
          <br>
          <div class="col-md-12">
            <label class="labels">New Password</label>
            <input type="password" class="form-control" placeholder=" 새로운 비밀번호를 입력해 주세요." v-model="newPassword" autocomplete="on">
          </div>
          <div class="col-md-12">
            <label class="labels">Re-type New Password</label>
            <input type="password" class="form-control" placeholder="새로운 비밀번호 확인." v-model="reNewPassword" autocomplete="on">
          </div>
          <div class="mt-5 text-center">
            <input class="btn btn-primary profile-button" type="submit" value="Change Password">
          </div>
        </div>
      </form>
    </div>
  </div>


</template>
<script>
import {mapState} from 'vuex';

export default {
  name: 'profile',
  props: ["baseURL"],
  data() {
    return {
      address: {
        address1: null,
        address2: null,
        zip: null
      },
      firstName: null,
      lastName: null,
      jwt: null,
      oldPassword: null,
      newPassword: null,
      reNewPassword: null
    }
  },
  methods: {
    // 회원정보 수정
    async updateProfile(e) {
      e.preventDefault();

      this.jwt = localStorage.getItem('token');

      const profile = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        address: {
          address1: this.user.address.address1,
          address2: this.user.address.address2,
          zip: this.user.address.zip
        }
      }

      await axios({
        method: 'put',
        url: this.baseURL + "account/edit",
        data: JSON.stringify(profile),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + this.jwt
        }
      })
          .then(res => {
            alert("회원정보 수정이 완료되었습니다.");
            this.$router.go(this.$router.currentRoute);
          })
          .catch(err => {
            if (err.response.data.code === "IN_001")
              alert([].concat(err.response.data.errors)[0].reason);
          })
    },

    //비밀번호 변경
    async changePassword(e) {
      e.preventDefault();
      if (this.newPassword === this.reNewPassword) {

        this.jwt = localStorage.getItem('token');

      const password = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        reNewPassword: this.reNewPassword,
      }

      await axios({
        method: 'put',
        url: this.baseURL + "account/updatePassword",
        data: JSON.stringify(password),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + this.jwt
        }
      })
          .then(res => {
            alert("비밀번호 수정이 완료되었습니다.");
            this.$router.go(this.$router.currentRoute);
          })
          .catch(err => {
            if (err.response.data.code === "IN_001")
              alert([].concat(err.response.data.errors)[0].reason);
            else{
              alert(err.response.data.message);
            };
          });
    }else{
      alert("새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다. ")
      }
    }

  },
  computed: {
    ...mapState('account', {
      user: state => state.account
    })
  },

  created() {
    //dispatch는 등록되어있는 action을 호출
    this.$store.dispatch('account/setAccountProfile');
  }
}
</script>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/js/bootstrap.bundle.min.js">
<link href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js">


<style>
body {
  background: rgb(99, 39, 120)
}

.form-control:focus {
  box-shadow: none;
  border-color: #BA68C8
}

.profile-button {
  background: rgb(99, 39, 120);
  box-shadow: none;
  border: none
}

.profile-button:hover {
  background: #682773
}

.profile-button:focus {
  background: #682773;
  box-shadow: none
}

.profile-button:active {
  background: #682773;
  box-shadow: none
}

.back:hover {
  color: #682773;
  cursor: pointer
}

.labels {
  font-size: 11px
}

.add-experience:hover {
  background: #BA68C8;
  color: #fff;
  cursor: pointer;
  border: solid 1px #BA68C8
}

</style>
