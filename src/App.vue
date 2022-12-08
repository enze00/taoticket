<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
    <keep-alive :include="$store.state.keepAlivePage">
      <router-view/>
    </keep-alive>
<!--    <img src="@/assets/button_img.jpg" height="465" width="600"/>-->
<!--    <el-image :src="button_img" fit="fit"></el-image>-->
  </div>
</template>
<!--<script>-->
<!--import button_img from "@/assets/button_img.jpg";-->
<!--export default {-->
<!--  name: "App",-->
<!--  data(){-->
<!--    return{-->
<!--      button_img-->
<!--    }-->
<!--  },-->
<!--  methods:{-->

<!--  },-->
<!--  created() {-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style>-->

<!--</style>-->
