<template>
  <main class="row">
    <div class="col s9">
      <header>
        <nav>
          <div class="nav-wrapper">
            <a href="#!" class="brand-logo center" @click="sayPika">
              <img
              class="img-logo" src="data:image/png;base64,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">
            </a>
            <span class="pika white black-text" v-if="this.$store.state.pikachu.pika">pika!</span>
            <ul class="left hide-on-med-and-down"  v-if="!loggedIn">
              <li>
                <router-link :to="{name: 'Login' }">Log in</router-link>
              </li>
              <li>
                <router-link :to="{name: 'Sign up' }">Sign up</router-link>
              </li>
            </ul>
            <ul v-else="loggedIn">
              <li>
                <router-link :to="{name: 'Home' }">Home</router-link>
              </li>
              <li>
                <router-link :to="{name: 'Profile' }">User profile</router-link>
              </li>
            </ul>
            <button v-if="loggedIn" class="btn waves-effect waves-light" type="submit" @click="signOut">
              Sign out
            </button>
          </div>
        </nav>
      </header>
      <router-view></router-view>
    </div>
    <div class="col s3">
      <Users />
    </div>
  </main>
</template>

<script>
import Users from '../../views/Users.vue';
import { firebaseApp, usersRef } from "../../../firebase.config.js";

export default {
  name: "App",
  components: {
    Users,
  },
  data() {
    return {
      title: "Welcome to my starter !",
      loggedIn: false,
      test: "test",
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
        this.$router.replace("room");
        this.loggedIn = false;
      })
      .catch(e => {
        alert("Shit happens again... ", e);
      });
    },
    sayPika() {
      this.$store.dispatch('sayPika');
    },
  },
  created() {
    firebaseApp.auth().onAuthStateChanged(user => {
      this.loggedIn = user;
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
