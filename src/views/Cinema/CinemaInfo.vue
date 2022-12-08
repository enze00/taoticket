<template>
  <div class="cinema_info">
    <el-divider></el-divider>
    <el-row style="margin-top: 1%">
      <el-col :span="5"  style="margin-left: 13%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>影院</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$store.state.city}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" style="margin-left: 30%">
        <div style="color: #888888;font-size: 13px">
          3步轻松购票:1.选座购票/买券
          <i class="el-icon-right" style="font-weight: bolder"></i>
          2.收电子码
          <i class="el-icon-right" style="font-weight: bolder"></i>
          3.影院取票
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1%">
      <el-col :span="12" style="margin-left: 13%">
        <div style="width: 100%; border:1px solid #E4E7ED ">
          <el-row>
            <el-col :span="4" style="background-color: rgba(255,221,220,0.9);">
              <el-row type="flex" justify="center">
                <el-col :span="14" style="color: #888888; margin-top: 25%">
                  选择区域
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="8" style="color: #888888; margin-top: 45%; margin-bottom: 25%">
                  搜索
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="18" style="background-color: rgba(255,246,245,0.6);min-height: 152px">
              <el-radio @change="handleSelectedRegionChange" v-model="selectedRegion" v-if="index<10" v-for="(item,index) in cityRegionData" :key="index" :label="item" style="margin-top: 2%;margin-left: 1%">{{item}}</el-radio>
              <el-radio @change="handleSelectedRegionChange" v-model="selectedRegion" v-show="showMoreRegion" v-if="index>=10" v-for="(item,index) in cityRegionData" :key="index" :label="item" style="margin-top: 2%;margin-left: 1%">{{item}}</el-radio>
              <el-input placeholder="请输入影院名称/关键字" v-model="cinemaName"  style="width: 55%;margin-top: 6%; margin-left: 4%;height: 20px">
                <el-button style="background-color: red;color: white;" slot="append" icon="el-icon-search">查询</el-button>
              </el-input>
            </el-col>
            <el-col :span="2" style="background-color: rgba(255,246,245,0.6);min-height: 152px">
              <el-button class="text_button" v-if="!showMoreRegion" type="text" @click="showMoreRegion = !showMoreRegion" style="margin-top: 40%;background-color: rgba(255,246,245,0.34); ">更多<i class="el-icon-arrow-right"></i></el-button>
            </el-col>
          </el-row>
        </div>
        <div style="background-color: red;height: 2px"></div>
        <div style="width: 100%; border:1px solid #E4E7ED; min-height: 100px">
          <el-row>
            <el-col style="font-size: 14px;color: #888888;margin-top: 2%" :span="2" :offset="1">
              排序:
            </el-col>
            <el-col :span="6" style="margin-top: 1.8%">
              <el-radio @change="handleSortTypeChange" v-model="sortType" label="comprehensive" size="medium">综合</el-radio>
              <el-radio @change="handleSortTypeChange" v-model="sortType" label="score" size="medium">评分<i style="font-weight: bolder" class="el-icon-bottom"></i></el-radio>
            </el-col>
            <el-col style="font-size: 14px;color: #888888;margin-top: 2%;width: 15%">
              当前条件下共有
            </el-col>
            <el-col :span="1" style="font-size: 14px;color: red;font-weight: bolder;margin-top: 2%">
              {{sortCinema.num}}
            </el-col>
            <el-col style="font-size: 14px;color: #888888;margin-top: 2%;" :span="2">
              家影院
            </el-col>
          </el-row>
          <div>
            <el-row :class="(index+1)%2!=0?'normal':'gray'" v-for="(item,index) in sortCinema.sortCinemaData" :key="index" :style="index==0?'margin-top:2%;':''+'height: 120px'">
              <el-col :span="5">
                <el-image
                    style="margin-left: 16%;margin-top: 3%;height: 100px"
                    :src="item.url"
                    fit="fit">
                </el-image>
              </el-col>
              <el-col :span="10"  style="margin-top: 1.5%" :offset="1">
                <el-row style="font-size: 16px">
                  {{item.cinema_name}}
                </el-row>
                <el-row style="font-size: 13px;color: #888888;margin-top: 1.5%">
                  地址:{{item.cinema_address.substr(0,15)}}{{item.cinema_address.length>15?"...":""}}
                </el-row>
                <el-row style="font-size: 13px;color: #888888;margin-top: 1.5%">
                  电话:{{item.telephone}}
                </el-row>
                <el-row style="font-size: 13px;color: #888888;margin-top: 1.5%">
                  更多: <a href="">影院服务</a>  <a href="">交通信息</a>
                </el-row>
              </el-col>
              <el-col span="3" style="margin-top: 1.5%" :offset="4">
                <el-row>
                  <el-col :span="12">
                    评分:
                  </el-col>
                  <el-col :span="12" style="color: red;font-weight: bold">
                    {{item.score}}
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20%">
                  <el-button @click="showCinemaDetail(item)" size="small" type="danger">选座</el-button>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="width: 100%; border:1px solid #E4E7ED;height: 250px;margin-left: 2px;background-color: rgba(247,247,247,0.34)">
          <el-col style="width: 90%" :offset="1">
            <el-row style="margin-top: 2%;margin-bottom: 1%">
              <el-col :span="7" style="margin-top: 8px">
                <span>热销团购券</span>
              </el-col>
              <el-col :span="5" :offset="12">
                <el-button class="text_button" type="text" @click="$router.push('/cinema')">查看全部<i class="el-icon-arrow-right"></i></el-button>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <div v-for="(item,index) in hotCinemaData" :key="index" style="border-bottom:1px solid #E4E7ED;height: 60px">
              <el-row>
                <el-col :span="16">
                  <el-row style="font-size: 14px; margin-top: 4%">
                    {{item.cinema_name.substr(0,9)}}{{item.cinema_name.length>9?"...":""}}
                  </el-row>
                  <el-row style="font-size: 12px; margin-top: 3%">
                    {{item.cinema_address.substr(0,16)}}{{item.cinema_address.length>16?"...":""}}
                  </el-row>
                </el-col>
                <el-col :span="6" :offset="1" style="margin-top: 4%">
                  <el-button type="danger" size="small">选座购票</el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CinemaInfo",
  data() {
    return {
      showMoreRegion: false,
      cityRegionData:[],
      selectedRegion: '全部区域',
      cinemaName: '',
      sortType: 'comprehensive',
      sortCinema: {
        num: 12,
        sortCinemaData: [
          {
            cinema_id: 0,
            cinema_name: '万达影城（钱江新城店）',
            cinema_address: '江干区解放东路8号砂之船国际生活广场负一层天鹅街088号（地铁站“市民中心”L出口直行200米）',
            score: 8,
            telephone: '0571-81106343',
            url: 'https://gw.alicdn.com/tfscom/i4/TB12pTfjbsrBKNjSZFpXXcXhFXa_.jpg'
          },
          {
            cinema_id: 1,
            cinema_name: '万达影城（钱江新城店）',
            cinema_address: '江干区解放东路8号砂之船国际生活广场负一层天鹅街088号（地铁站“市民中心”L出口直行200米）',
            score: 8.5,
            telephone: '0571-81106343',
            url: 'https://gw.alicdn.com/tfscom/i3/TB13krGi2ImBKNjSZFlXXc43FXa_.jpg'
          },
          {
            cinema_id: 2,
            cinema_name: '浙江新远国际影城（西湖文化广场店）',
            cinema_address: '江干区解放东路8号砂之船国际生活广场负一层天鹅街088号（地铁站“市民中心”L出口直行200米）',
            score: 8,
            telephone: '0571-81106343',
            url: 'https://gw.alicdn.com/tfscom/i3/TB13krGi2ImBKNjSZFlXXc43FXa_.jpg'
          },
        ]
      },


    }
  },
  methods: {
    showCinemaDetail(item) {
      //console.log(item);
      this.$router.push({
        path:'/cinema_detail',
        query: {
          cinema_id: item.cinema_id
        }
      })
    },

    getSortedCinemaInfo() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/cinema_info_controller/getSortedCinemaInfo?region='+ _this.selectedRegion + '%&sortType=' + _this.sortType)
          .then(function (res){
            //console.log(res);
            _this.sortCinema.num = res.data.num
            _this.sortCinema.sortCinemaData = res.data.sortCinemaData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    getAllRegionName() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/city_info_controller/getAllRegionName?city_name='+ _this.$store.state.city)
          .then(function (res){
            //console.log(res);
            _this.cityRegionData = res.data.cityRegionData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    handleSortTypeChange() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/cinema_info_controller/getSortedCinemaInfo?region='+ _this.selectedRegion + '%&sortType=' + _this.sortType)
          .then(function (res){
            //console.log(res);
            _this.sortCinema.num = res.data.num
            _this.sortCinema.sortCinemaData = res.data.sortCinemaData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    handleSelectedRegionChange() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/cinema_info_controller/getSortedCinemaInfo?region='+ _this.selectedRegion + '%&sortType=' + _this.sortType)
          .then(function (res){
            //console.log(res);
            _this.sortCinema.num = res.data.num
            _this.sortCinema.sortCinemaData = res.data.sortCinemaData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    }
  },
  created() {
    this.getSortedCinemaInfo()
    this.getAllRegionName()
  }
}
</script>

<style scoped>
.el-divider--horizontal{          /*修改分割线样式*/
  margin: 0px 0;
}
>>> .text_button {
  color: red;
}
>>>.el-radio__input.is-checked + .el-radio__label {
  color: red !important;
}
>>>.el-radio__input.is-checked .el-radio__inner {
  background: red !important;
  border-color: red !important;
}
.normal{
  border-bottom:1px dashed  gainsboro;
}
.gray{
  background-color: rgba(250,250,250,0.8);
  border-bottom:1px dashed gainsboro;
}
</style>