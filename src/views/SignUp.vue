<template>
  <div class="page-content">
    <h2 class="page-title">{{ title }}</h2>
    <form>
      <input type="text" placeholder="Type your name" v-model="name" />
      <input type="email" placeholder="Type your e-mail" v-model="email" />
      <input type="password" placeholder="Type your password" v-model="password" />
      <button class="btn waves-effect waves-light" type="submit" @click="signUp">
        Sign up
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { firebaseApp, usersRef } from "../../firebase.config.js";

export default {
  name: "SignUp",
  data() {
    return {
      title: "Sign up",
      email: "",
      password: "",
      name: "",
    };
  },
  methods: {
    signUp() {
      firebaseApp
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        console.log('user', user)
        usersRef.child(user.user.uid).set({
          uid: user.user.uid,
          displayName: this.name,
          email: this.email,
          isConnected: true,
        });

        user.user.updateProfile({
          displayName: this.name,
        }).catch(function(error) {
          alert(error)
        });
      })
      .catch(err => {
        alert("¯\_(ツ)_/¯ shit happens -- ", + err.message);
      });

      this.$router.replace("Home");
    }
  }
};
</script>

<style></style>
