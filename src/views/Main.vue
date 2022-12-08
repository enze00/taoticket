<template>
  <div class="main">
    <MenuBar></MenuBar>
    <keep-alive :include="$store.state.keepAlivePage">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MenuBar from "@/components/MenuBar";
export default {
  name: "Main",
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  },
  components:{
    MenuBar
  }
}
</script>

<style scoped>

</style>