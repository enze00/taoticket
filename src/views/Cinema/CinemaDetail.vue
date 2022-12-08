<template>
  <div class="cinema_detail">
    <div class="box">
      <div class="head-bg-color"></div>
      <el-image
          style="z-index: -2;width: 100%;height: 100%;"
          fit="cover"
          src="http://cdn9-banquan.ituchong.com/weili/smh/619548096207650915.webp">
      </el-image>
      <el-row class="introduce" type="flex" justify="center">
        <el-col :span="18">
          <el-row style="margin-top: 3%">
            <el-col style="font-size: 20px;font-weight: bold;color: white;max-width: 340px;min-width: 80px">
              {{cinemaDetailData.cinema_name}}
            </el-col>
            <el-col :span="2" style="font-size: 20px;font-weight: bold;color: red;">
              {{cinemaDetailData.score}}分
            </el-col>
          </el-row>
          <el-row style="width: 100%;margin-top: 1.5%">
            <el-divider></el-divider>
          </el-row>
          <el-row style="margin-top: 1%">
            <el-col :span="5">
              <el-image :src="cinemaDetailData.url"></el-image>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-row style="margin-top: 1%;font-size: 14px;color: white">
                详细地址: {{cinemaDetailData.cinema_address}}
              </el-row>
              <el-row style="margin-top: 3%;font-size: 14px;color: white">
                联系电话: {{cinemaDetailData.telephone}}
              </el-row>
              <el-row style="margin-top: 3%;font-size: 14px;color: white">
                更多信息:
              </el-row>
            </el-col>
            <el-col :span="6" :offset="1" style="height: 230px">
                <el-amap
                    v-if="mapShow"
                    ref="map"
                    :vid="'amapDemo'"
                    :center="amapData.center"
                    :zoom="amapData.zoom"
                    :plugin="amapData.plugin"
                    :events="amapData.events"
                    class="amap-demo"
                >
                  <el-amap-marker :position="amapData.center"></el-amap-marker>
                </el-amap>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="center" style="top: 400px">
      <el-col :span="18">
        <el-tabs v-model="tabName" @tab-click="handleClick">
          <el-tab-pane label="选座购票" name="buyTicket">
            <el-row style="min-height: 70px">
              <el-col :span="3" style="background-color: rgba(255,221,220,0.9);min-height: 90px">
                <div style="margin-top: 25%;margin-left: 25%">选择影片</div>
              </el-col>
              <el-col :span="21" style="background-color: rgba(255,246,245,0.6);min-height: 90px">
                <el-radio @change="handleSelectedFilmChange" v-model="selectedFilm"v-for="(item,index) in filmList" :key="index" :label="item" style="margin-top: 2%;margin-left: 1%">{{item.film_name}}</el-radio>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3" style="background-color: rgba(255,221,220,0.9);min-height: 60px">
                <div style="margin-top: 10%;margin-left: 25%">选择时间</div>
              </el-col>
              <el-col :span="21" style="background-color: rgba(255,246,245,0.6);min-height: 60px">
                <el-radio @change="handleSelectedDateChange" v-model="selectedDate"v-for="(item,index) in filmDate" :key="index" :label="item" style="margin-top: 2%;margin-left: 1%">{{item.substr(0,4)}}年{{item.substr(5,2)}}月{{item.substr(8,2)}}日</el-radio>
              </el-col>
            </el-row>
            <el-row style="width: 100%;border:1px solid #E4E7ED;">
              <el-col :span="4">
                <el-image
                    style="width: 80%;margin-top: 10%;margin-left: 10%;margin-bottom: 8%"
                    :src="selectedFilm.url"
                >
                </el-image>
              </el-col>
              <el-col span="20">
                <el-row style="margin-top: 1.5%;width: 100%">
                  <el-col style="font-size: 20px;color: red;width: 22%">
                    {{selectedFilm.film_name}}
                  </el-col>
                  <el-col style="color: red;width: 5%;font-size: 13px;margin-top: 0.8%;margin-left: 1%;font-weight: bolder">
                    {{selectedFilm.score}}
                  </el-col>
                  <el-col style="margin-left: 60%;width: 10%">
                    <el-button class="text_button" v-if="this.selectedFilm.film_id != -1" type="text" @click="$router.push('/movies_detail?film_id='+selectedFilm.film_id)">查看影片详情<i class="el-icon-arrow-right"></i></el-button>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row style="margin-top: 2%;font-size: 14px;">
                  导演: {{selectedFilm.director}}
                </el-row>
                <el-row style="margin-top: 1.5%;font-size: 14px;">
                  主演: {{selectedFilm.actor.substr(0,30)}}{{selectedFilm.actor.length>30?"...":''}}
                </el-row>
                <el-row style="margin-top: 1.5%;font-size: 14px;">
                  类型: {{selectedFilm.film_type}}
                </el-row>
                <el-row style="margin-top: 1.5%;font-size: 14px;">
                  制片国家/地区: {{selectedFilm.make_film_area}}
                </el-row>
                <el-row style="margin-top: 1.5%;font-size: 14px;">
                  语言: {{selectedFilm.language}}
                </el-row>
              </el-col>
            </el-row>
            <el-row style="margin-top: 2%">
              <el-table
                  :data="filmTimesData"
                  style="width: 100%;min-height: 300px"
                  stripe
                  empty-text>
                <el-table-column
                    align="center"
                    header-align="center"
                    label="放映时间"
                    width="210">
                  <template slot-scope="scope">
                    <el-row>
                      <el-col :span="24" style="font-size: 20px;font-weight: bolder">
                        {{scope.row.film_time.substr(0,5)}}
                      </el-col>
                    </el-row>
                    <el-row style="margin-top: 2%">
                      <el-col :span="24" style="font-size: 12px;">
                        预计{{scope.row.film_time.substr(6,5)}}散场
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    header-align="center"
                    label="语言版本"
                    width="200"
                    property="language"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    header-align="center"
                    label="放映厅"
                    width="200"
                    property="hall_name"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    header-align="center"
                    label="现价/影院价(元)"
                    width="225">
                  <template slot-scope="scope">
                    <el-row>
                      <el-col style="font-size: 18px;font-weight: bolder;color: red;">
                        {{scope.row.film_price}}
                      </el-col>
                      <el-col style="font-size: 12px;color: #888888;text-decoration: line-through;">
                        {{scope.row.film_price}}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    header-align="center"
                    label="选座购票"
                    width="220"
                >
                  <template slot-scope="scope">
                    <el-button
                        fixed="right"
                        size="medium"
                        @click="toBuyTicket(scope.row)"
                        icon="el-icon-document"
                        type="danger">
                      选座购票
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="影院信息" name="cinemaInfo">
            <el-row>
              <el-col :span="5" style="font-size: 18px;margin-bottom: 1%">
                影院介绍
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row style="font-size: 14px;color: #888888;margin-top: 2%">
              详细地址: {{cinemaDetailData.cinema_address}}
            </el-row>
            <el-row style="font-size: 14px;color: #888888;margin-top: 2%">
              联系电话: {{cinemaDetailData.telephone}}
            </el-row>
            <el-row>
              <el-col :span="5" style="margin-top: 3%;font-size: 18px;margin-bottom: 1%">
                交通信息
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row type="flex" justify="center" style="margin-top: 5%;margin-bottom: 5%">
              <el-col :span="16" style="height: 500px">
                <el-amap
                    v-if="mapShow"
                    ref="map"
                    :vid="'amapDemo2'"
                    :center="amapData.center"
                    :zoom="amapData.zoom"
                    :plugin="amapData.plugin"
                    :events="amapData.events"
                    class="amap-demo"
                >
                  <el-amap-marker :position="amapData.center"></el-amap-marker>
                </el-amap>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CinemaDetail",
  data() {
    return {
      tabName: 'buyTicket',
      selectedFilm: {
        film_id: -1,
        film_name: '',
        director: '',
        actor: '',
        film_type: '',
        make_film_area: '',
        language: '',
        score: 0,
        url: '',
      },
      selectedDate: '',
      mapShow: false,
      cinemaDetailData: {
        url: '',
        score: 0,
        cinema_address: '',
        telephone: '',
        cinema_name: ''
      },
      amapData: {
        center: [],
        position: [],
        zoom: 20,
      },
      filmList:[
        // {
        //     film_id:'',
        //     film_name: '寂静之地2',
        //     director: '',
        //     actor: '',
        //     film_type: '',
        //     make_film_area: '',
        //     language: '',
        //     score: 7.7,
        //     url: 'https://img.alicdn.com/bao/uploaded/i3/O1CN018C4XfR1UlboqFW2Fd_!!6000000002558-0-alipicbeacon.jpg_300x300.jpg',
        // }
      ],
      filmDate: [],
      filmTimesData: [
        // {
        //   film_time: '10:30-12:52',
        //   language: '英语',
        //   hall_name: '一号厅',
        //   film_times_id: 1,
        //   film_price: 35.01
        // }
      ]
    }
  },
  methods: {
    getCinemaDetail() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/cinema_info_controller/getACinemaInfoById?cinema_id='+ _this.$route.query.cinema_id)
          .then(function (res){
            //console.log(res);
            _this.cinemaDetailData = res.data.cinemaDetailData[0]
            _this.getCinemaAddressXY()
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    getCinemaAddressXY() {
      const _this = this
      this.axios.get('https://restapi.amap.com/v3/geocode/geo?key=94b0bf7714d8924ca720bbc81bcddf5b&address=' + _this.cinemaDetailData.cinema_address + '&city=' +_this.$store.state.city)
          .then(function (res){
            //console.log(res);
            if (res.data.geocodes.length != 0){
              _this.amapData.position = res.data.geocodes[0].location.split(',')
              _this.amapData.center = res.data.geocodes[0].location.split(',')
            }else {
              _this.amapData.center = [120.19,30.26]
              _this.amapData.position = [120.19,30.26]
              _this.amapData.zoom = 5
            }
            _this.mapShow = true
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    getOnSaleFilmList() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/hall_info_controller/getOnSaleFilmList?cinema_id='+ _this.$route.query.cinema_id)
          .then(function (res){
            //console.log(res);
            _this.filmList = res.data.filmList
            if (res.data.filmList.length > 0) {
              _this.selectedFilm = res.data.filmList[0]
              _this.handleSelectedFilmChange()
            }else {
              _this.selectedFilm = {
                film_id: -1,
                film_name: '',
                director: '',
                actor: '',
                film_type: '',
                make_film_area: '',
                language: '',
                score: 0,
                url: '',
              }
            }

          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    handleSelectedFilmChange() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/hall_info_controller/getAMovieDate?film_id='+_this.selectedFilm.film_id+'&cinema_id='+_this.$route.query.cinema_id)
          .then(function (res){
            console.log(res.data);
            _this.filmDate = res.data.filmDate
            if (res.data.filmDate.length > 0) {
              _this.selectedDate = res.data.filmDate[0]
              _this.handleSelectedDateChange()
            }else {
              _this.selectedDate = ''
              _this.filmTimesData = []
            }
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    handleSelectedDateChange() {
      const _this = this
      this.axios.get('http://127.0.0.1:8000/index/hall_info_controller/getADateFilmTimes?cinema_id='+_this.$route.query.cinema_id+'&film_id='+_this.selectedFilm.film_id + '&film_date=' + _this.selectedDate)
          .then(function (res){
            _this.filmTimesData = res.data.filmTimesData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    toBuyTicket(row) {
      this.$router.push({
        path:'/seat_order',
        query: {
          film_times_id: row.film_times_id
        }
      })
    }

  },
  created() {
    //console.log(this.$route.query.cinema_id);
    this.getCinemaDetail()
    this.getOnSaleFilmList()
  }
}
</script>

<style scoped>
.box{
  position: absolute;
  height: 380px;
  width: 99%;
}
.head-bg-color {
  height: 380px;
  width: 100%;
  min-height: 380px;
  position: absolute;
  /*background-image: url("https://img.alicdn.com/bao/uploaded/i3/O1CN017CI2oC1gRhzNpwOY1_!!6000000004139-0-alipicbeacon.jpg_300x300.jpg");*/
  /*background-repeat:no-repeat;*/
  /*background-position:50% 0%;*/
  background: linear-gradient(90deg,rgba(61,61,60,0.7),rgba(0, 0, 0, 0.85));
  z-index: -1;
}

.introduce {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  color: white;
}

>>> .el-tabs__item.is-active {
  color:red;
}
>>> .el-tabs__item {
  color:gray;
}
>>> .el-tabs__active-bar {
  background-color:red;
}
>>> .text_button {
  color: red;
}
.el-divider--horizontal{          /*修改分割线样式*/
  margin: 0px 0;
}
>>>.el-radio__input.is-checked + .el-radio__label {
  color: red
}
>>>.el-radio__input.is-checked .el-radio__inner {
  background: red ;
  border-color: red
}
</style>
