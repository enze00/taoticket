<template>
  <div id="test">
    <div class="amap-wrapper" style="width: 50%;height: 500px">
      <el-amap
          ref="map"
          :vid="'amapDemo'"
          :center="center"
          :zoom="zoom"
          :plugin="plugin"
          :events="events"
          class="amap-demo"
      >
        <el-amap-marker :position="[120.137489,30.325601]"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      center: [120.137489,30.325601],
      zoom: 17,
      position: [120.137489,30.325601],
      events: {
        init(o){
          //console.log(o.getCenter());
        },
        // zoomchange: (e) => {
        //   console.log(e);
        // },
        // zoomend: (e) => {
        //   //获取当前缩放zoom值
        //   console.log(this.$refs.map.$$getInstance().getZoom());
        //   console.log(e);
        // },
        // click: e => {
        //   alert('map clicked')
        // }
      },
      // markers: [
      //   {
      //     position: [120.137489,30.325601]
      //   },
      //   {
      //     position: [120.137489,30.325601]
      //   }
      // ],
//使用其他组件
//       plugin: [
//         {
//           pName: 'Scale',
//           events: {
//             init(instance) {
//               console.log(instance)
//             }
//           }
//         },
//         {
//           pName: 'ToolBar',
//           events: {
//             init(instance) {
//               console.log(instance)
//             }
//           }
//         }
//       ]
    }
  }
}
</script>

<style scoped>

</style>