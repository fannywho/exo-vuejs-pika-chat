<template>
  <div class="page-content">
    <h2 class="page-title">{{ title }}</h2>
    <form>
      <label for="displayName">Username</label>
      <input
      v-bind:displayName="displayName"
      v-model="displayName"
      placeholder="Username"
      id="displayName"
      type="text"
      class="input-field validate"
       />
      <label for="mail">E-mail</label>
      <input
      v-bind:email="email"
      v-model="email"
      placeholder="e-mail"
      id="mail"
      type="email"
      class="input-field validate"
      />
      <div class="file-field input-field">
        <div class="btn">
          <span>Profile picture</span>
          <input type="file"
          name="profilePic"
          ref="profilePic"
          accept=".jpg, .jpeg, .png"
          @change="uploadPicture"/>
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text">
        </div>
      </div>
      <button v-bind:class="{ disabled: disabled }" class="waves-effect waves-light btn-large right" @click.prevent="updateUserProfile">Update</button>
    </form>
  </div>
</template>

<script>
import { firebaseApp, database, usersRef } from '../../firebase.config';
import axios from 'axios';
import { settings } from "../../axios.config.js";

const instance = axios.create(settings);

export default {
  name: 'Profile',
  data () {
    return {
      title: 'User profile',
      currentUser: {},
      displayName: null,
      email: null,
      profilePic: null,
      isLoading: false,
      max_size: 1000000,
      disabled: false,
    }
  },
  methods: {
    updateUserProfile() {
      console.log('pic', this.profilePic)
      usersRef.child(this.currentUser.uid).update({
        displayName: this.displayName,
        email: this.email,
        profilePic: this.profilePic,
      });
      this.currentUser.updateProfile({
        displayName: this.name,
        email: this.email,
        photoUrl: this.profilePic,
      }).catch(function(error) {
        alert(error)
      });
      this.hasChange = false;
    },
    uploadPicture() {
      const picture = this.$refs.profilePic.files[0];

      this.isLoading = true;
      this.disabled = true;
      if (picture.size > this.max_size) {
        return false;
      }
      let formData = new FormData();
      formData.append("image", picture);

      instance("https://api.imgur.com/3/image", {
        method: "POST",
        data: formData,
      })
      .then(res => {
        this.profilePic = res.data.data.link;
        console.log(this.profile_pic)
        this.isLoading = false;
        this.disabled = false;
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
      });
    },
  },
  created() {
    this.currentUser = firebaseApp.auth().currentUser;
    database.ref('users/'+this.currentUser.uid).on("value", (snapshot) => {
      this.displayName = snapshot.val().displayName;
      this.email = snapshot.val().email;
    } );
  },
}
</script>

<style>
</style>
