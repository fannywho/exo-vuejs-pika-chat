<template>
  <div class="page-content">
    <h2 class="page-title">{{ title }}</h2>
    <form>
      <input type="email" placeholder="Type your e-mail" v-model="email" />
      <input type="password" placeholder="Type your password" v-model="password" />
      <button class="btn waves-effect waves-light" type="submit" @click="login">
        Log-in
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { firebaseApp, usersRef } from "../../firebase.config.js";

export default {
  name: "Login",
  data() {
    return {
      title: "Login",
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          usersRef.child(user.user.uid).update({
            isConnected: true,
          });

          this.$router.replace("Home");
        })
        .catch(err => {
          alert("¯\_(ツ)_/¯ shit happens -- ", + err.message);
        });
    }
  }
};
</script>

<style></style>
