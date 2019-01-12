<template>
  <div class="home">
    home
    <router-link to="/home/home1">home1</router-link>====
    <router-link to="/home/home2">home2</router-link>====
    <router-link to="/home/home3">home3</router-link>====
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Home extends Vue {
   
}
</script>
