<template>
  <div class="page-content">
    <h2 class="page-title">{{ title }}</h2>
  </div>
</template>

<script>
import axios from 'axios';
import { traktSettings } from "../../axios.config.js";

const instance = axios.create(traktSettings);

export default {
  name: "Trakt",
  data() {
    return {
      title: "trakt api",
    };
  },
  methods: {
    getTrakt: () => {
      console.log('yolo');

      instance("https://api.trakt.tv/movies/deadpool-2-2018", {
        method: "GET",
      })
      .then(res => {
        console.log('res', res)
      })
      .catch(err => {
        console.log('erreur', err);
      });
    }
  },
  created() {
    this.getTrakt();
  }
};
</script>

<style></style>
