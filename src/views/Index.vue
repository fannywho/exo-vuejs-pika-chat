<template>
  <div>
    <div class="messages-list">
      <div v-for="(message) in messages" :key="message.id">
        <Message :message="message" />
      </div>
    </div>
    <form class="sticky-input">
      <textarea rows="3" id="newMessage" placeholder="Message" v-model="currentMessage" class="materialize-textarea no-resize"></textarea>
      <button class="waves-effect waves-light btn" v-if="currentMessage" @click="send">Send</button>
    </form>
  </div>
</template>

<script>
import Message from './Message.vue';
import {
  firebaseApp,
  messageRef,
} from '../../firebase.config';

export default {
  components: {
    Message,
  },
  name: 'Index',
  data () {
    return {
      title: 'Index page !',
      messages: [],
      currentMessage: '',
      user: '',
    }
  },
  methods: {
    send() {
      messageRef.push({user: this.user, text: this.currentMessage});
    }
  },
  created() {
    messageRef.on("child_added", (snapshot) => {
      this.messages.push({...snapshot.val(), id: snapshot.key});
      this.currentMessage = "";
    });
    messageRef.on("child_removed", (snapshot) => {
      this.messages = this.messages.filter(message => message.id !== snapshot.key );
    });
    if(firebaseApp.auth().currentUser) {
      this.user = firebaseApp.auth().currentUser.displayName;
    }
  },
}
</script>

<style>
.messages-list {
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow-y: auto;
}
.sticky-input {
  display: fixed;
  bottom: 0;
  left: 0;
}
.no-resize {
  max-height: 50px;
}
</style>
