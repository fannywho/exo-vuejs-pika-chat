<template>
  <main class="row">
    <div class="col s9">
      <Header :onLogoClick="sayPika" :onSignOut="signOut" :loggedIn="loggedIn" />
      <router-view></router-view>
    </div>
    <div class="col s3">
      <Users />
    </div>
  </main>
</template>

<script>
import Header from '../Header/Header.vue';
import Users from '../../views/Users.vue';
import { firebaseApp, usersRef } from "../../../firebase.config.js";

export default {
  name: "App",
  components: {
    Header,
    Users,
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    signOut() {
      let currentUser = firebaseApp.auth().currentUser;

      firebaseApp
      .auth()
      .signOut()
      .then(() => {
        usersRef.child(currentUser.uid).update({
          isConnected: false,
        });
        this.$router.replace("Home");
        this.loggedIn = false;
      })
      .catch(event => {
        alert("Shit happens again... ", event);
      });
    },
    sayPika() {
      this.$store.dispatch('sayPika');
    },
  },
  created() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if(user) {
        this.loggedIn = true;
      } else{
        this.loggedIn = false;
      }
    });
  },
};
</script>

<style>
html {
  font-family: Arial, Helvetica, sans-serif;
}
body {
  margin: 0;
  padding: 0;
}
.container {
  padding: 0 10px;
  @media (--tablet) {
    width: 80%;
    margin: 0 auto;
  }
  @media (--desktop) {
    width: 1024px;
  }
  @media (--large-desktop) {
    width: 1190px;
  }
}
.router-link-exact-active {
  background: white;
  color: #ee6e73;
  font-weight: bold;
}
.nav-button {
  margin-top: 20px;
}
.img-logo{
  width: 60px;
}
nav .btn {
  margin-left: 10px;
}
.pika {
  position: absolute;
  top: 20px;
  left: 54%;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
  line-height: 14px;
}

.pika:after{
	content: ' ';
	position: absolute;
	width: 0;
	height: 0;
  left: -8px;
	right: auto;
  top: 7px;
	bottom: auto;
	border: 5px solid;
	border-color: lightyellow lightyellow transparent transparent;
}
</style>
