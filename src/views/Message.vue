<template>
  <div>
    <div class="message z-depth-2" v-if="this.edit" v-bind:class="{ isMe: isMe }">
      <form>
        <textarea class="materialize-textarea" type="text" v-model="text" />
        <button class="waves-effect waves-light btn-small" @click="onValid(message.id, text)">Update</button>
        <button class="waves-effect waves-light btn-small deep-orange lighten-3" @click="onCancel()">Cancel</button>
      </form>
    </div>
    <div class="message" v-else="!this.edit" v-bind:class="{ isMe: isMe }">
      <span v-model="user" class="user"><i class="material-icons">person</i> {{ user }}</span>
      <span v-model="text">{{ text }}</span>
      <div class="action-btns">
        <button title="Edit message" class="btn-floating btn-medium waves-effect waves-light" v-if="this.currentUser && this.currentUser.displayName === message.user" @click="onUpdate(message)">
          <i class="material-icons">edit</i>
        </button>
        <button title="Delete message" class="btn-floating btn-medium waves-effect waves-light deep-orange darken-2" v-if="this.currentUser && this.currentUser.displayName === message.user" @click="onDelete(message)">
          <i class="material-icons">delete</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseApp, database, messageRef } from '../../firebase.config';
  export default {
    name: 'Message',
    props: {
      message: {
        type: Object,
        required: false,
        default: 'no message',
      },
    },
    data() {
      return {
        user: '',
        id: '',
        text: '',
        currentUser: '',
        edit: false,
        isMe: false,
      }
    },
    methods: {
      onDelete(message) {
        if (this.currentUser && this.currentUser.displayName === message.user) {
          messageRef.child(message.id).remove();
        } else {
          alert('pas les droits !')
        }
      },
      onUpdate(message) {
        if (this.currentUser && this.currentUser.displayName === message.user) {
          this.edit = true;
        } else {
          alert('Pas les droits pour éditer')
        }
      },
      onValid(id, message){
        messageRef.child(id).update({text: message});
        this.edit = false;
      },
      onCancel(){
        this.edit = false;
        this.text = this.message.text;
      }
    },
    created() {
      this.text = this.message.text;
      this.user = this.message.user;
      this.currentUser = firebaseApp.auth().currentUser;
      this.isMe = firebaseApp.auth().currentUser.displayName === this.message.user;
    },
  }
</script>

<style>
.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  border-radius: 10px;
  padding: 15px;
  background-color: #ffebee;
  width: 80%;
}
.isMe {
  background-color: #e0f7fa!important;
  margin: 10px 0 10px 20%;
}
.action-btns {
  align-self: flex-end;
}
.user {
  font-weight: bold;
}
.user i {
  vertical-align: middle;
}
</style>
