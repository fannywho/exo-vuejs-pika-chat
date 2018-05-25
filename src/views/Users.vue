<template>
  <ul class="collection">
    <li class="collection-item" v-for="user in users" :key="user.uid">
      <span v-if="user.isConnected" class="badge teal accent-3">Online</span>
      <span v-else="!user.isConnected" class="badge">Offline</span>
      {{user.displayName ? user.displayName : 'Wild Rattata'}}
    </li>
  </ul>
</template>

<script>
import {
  firebaseApp,
  usersRef,
} from '../../firebase.config';

export default {
  name: 'Users',
  data() {
    return {
      users: [],
    }
  },
  created() {
    usersRef.on("child_added", (snapshot) => {
      this.users.push({...snapshot.val(), id: snapshot.key});
    });
    usersRef.on("child_removed", (snapshot) => {
      this.users = this.users.filter(user => user.uid !== snapshot.key );
    });
    usersRef.on("child_changed", (snapshot) => {
      this.users = [];
      this.users.push({...snapshot.val(), id: snapshot.key});
    });
    usersRef.on("value", (snapshot) => {
      this.users = snapshot.val();
    });
  },
}
</script>

<style>
</style>
