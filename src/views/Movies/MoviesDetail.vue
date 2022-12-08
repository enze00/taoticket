<template>
  <div class="movies_detail">
    <div class="box">
      <div class="head-bg-color"></div>
      <el-image
          style="z-index: -2;width: 100%;height: 100%;"
          fit="cover"
          :src="moviesDetailData.url">
      </el-image>
      <el-row class="introduce" type="flex" justify="center">
        <el-col :span="18">
          <el-row style="margin-top: 2%">
            <el-col style="font-size: 20px;font-weight: bold;color: white;max-width: 220px;min-width: 80px">
              {{moviesDetailData.film_name}}
            </el-col>
            <el-col :span="2" style="font-size: 20px;font-weight: bold;color: red;">
              {{moviesDetailData.score}}{{moviesDetailData.score == null ? '':'分'}}
            </el-col>
          </el-row>
          <el-row style="width: 100%;margin-top: 1.5%">
            <el-divider></el-divider>
          </el-row>
          <el-row style="margin-top: 1%">
            <el-col :span="5">
              <el-image :src="moviesDetailData.url"></el-image>
            </el-col>
            <el-col :span="12" :offset="1">
              <el-row style="margin-top: 1%;font-size: 14px;color: white">
                导演: {{moviesDetailData.director}}
              </el-row>
              <el-row style="margin-top: 3%;font-size: 14px;color: white">
                主演: {{moviesDetailData.actor.substr(0,30)}}{{moviesDetailData.actor.length>30?"...":''}}
              </el-row>
              <el-row style="margin-top: 3%;font-size: 14px;color: white">
                类型: {{moviesDetailData.film_type}}
              </el-row>
              <el-row style="margin-top: 3%;font-size: 14px;color: white">
                制片国家/地区: {{moviesDetailData.make_film_area}}
              </el-row>
              <el-row style="margin-top: 3%;font-size: 14px;color: white">
                片长: {{moviesDetailData.film_length}}分钟
              </el-row>
              <el-row style="margin-top: 3%;font-size: 14px;color: white">
                剧情介绍: {{moviesDetailData.film_introduce}}
              </el-row>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-row style="margin-top: 1%;font-size: 14px;color: white">
                上映时间: {{moviesDetailData.play_time}}
              </el-row>
              <el-row style="margin-top: 10%">
                <el-image :src="moviesDetailData.url1"></el-image>
              </el-row>
              <el-row style="margin-top: 10%">
                <el-image style="width: 72%" :src="moviesDetailData.url2"></el-image>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-button @click="drawer = true" type="text"><i style="font-size: 30px;font-weight: bolder;color: white" class="el-icon-caret-bottom"></i></el-button>
        </el-col>
      </el-row>
      <el-drawer
          :size="420"
          :visible.sync="drawer"
          direction="ttb">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-carousel :interval="1000" type="card" height="300px">
              <el-carousel-item style="width: 50%" v-for="(item,index) in moviesCarousel" :key="index">
                <el-image @click="handleMoviesCarousel(item)" :src="item.url" fit="fill" style="width:100%"></el-image>
                <span>{{item.film_name}}</span>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>
    </div>
    <el-row type="flex" justify="center" style="top: 400px">
      <el-col :span="18">
        <el-row style="margin-top: 2%">
          <el-col :span="4" style="font-size: 20px">
            选座购票
          </el-col>
        </el-row>
        <el-row class="row-divider">
          <el-divider></el-divider>
        </el-row>
        <el-row style="margin-top: 1%;min-height: 70px">
          <el-col :span="3" style="background-color: rgba(255,221,220,0.9);min-height: 90px">
            <div style="margin-top: 30%;margin-left: 25%">选择区域</div>
          </el-col>
          <el-col :span="21" style="background-color: rgba(255,246,245,0.6);min-height: 90px">
            <el-radio @change="handleSelectedRegionChange" v-model="selectedRegion"v-for="(item,index) in cityRegionData" :key="index" :label="item" style="margin-top: 2%;margin-left: 1%">{{item}}</el-radio>
          </el-col>
        </el-row>
        <el-row style="min-height: 70px">
          <el-col :span="3" style="background-color: rgba(255,221,220,0.9);min-height: 120px">
            <div style="margin-top: 30%;margin-left: 25%">选择影城</div>
          </el-col>
          <el-col :span="21" style="background-color: rgba(255,246,245,0.6);min-height: 120px">
            <el-radio @change="handleSelectedCinemaChange" v-model="selectedCinema"  v-if="index<6" v-for="(item,index) in cinemaData.sortCinemaData" :key="index" :label="item" style="margin-top: 2%;margin-left: 1%">{{item.cinema_name}}</el-radio>
            <el-radio @change="handleSelectedCinemaChange" v-model="selectedCinema" v-show="showMoreRegion" v-if="index>=6" v-for="(item,index) in cinemaData.sortCinemaData" :key="index" :label="item" style="margin-top: 2%;margin-left: 1%">{{item.cinema_name}}</el-radio>
            <el-button class="text_button" v-show="cinemaData.isLong" v-if="!showMoreRegion" type="text" @click="showMoreRegion = !showMoreRegion">更多<i class="el-icon-arrow-right"></i></el-button>
            <el-button class="text_button" v-if="showMoreRegion" type="text" @click="showMoreRegion = !showMoreRegion"><i class="el-icon-arrow-left"></i>收回</el-button>
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
        <el-row style="margin-top: 2%">
          <el-col :span="8" style="font-size: 18px;color: red">
            {{selectedCinema.cinema_name}}
          </el-col>
          <el-col :span="15" style="font-size: 12px; color: #888888;margin-top: 0.5%">
            {{selectedCinema.cinema_address.length > 0 ? '地址: ' : ''}}{{selectedCinema.cinema_address.substr(0,55)}}{{selectedCinema.cinema_address.length>55?"...":""}}
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "MoviesDetail",
    props: {
      film_id: {
        type: String,
        default: 'no data'
      }
    },
    data(){
      return{
        drawer: false,
        selectedRegion: '全部区域',
        selectedCinema: {
          cinema_id: 0,
          cinema_name: '',
          cinema_address: ''
        },
        selectedDate: '',
        showMoreRegion: false,
        moviesDetailData:{},
        moviesCarousel:[],
        cityRegionData:[],
        cinemaData: {
          isLong: false,
          sortCinemaData: []
        },
        filmDate:[],
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
    methods:{
      handleMoviesCarousel(item) {
        const _this = this
        this.$router.replace({
          path:'/movies_temp',
          query: {
            film_id: item.film_id,
          }
        })
      },

      isCinemaNameLong() {
        this.showMoreRegion = false
        if (this.cinemaData.sortCinemaData.length > 6) {
          this.cinemaData.isLong = true
        }else {
          this.cinemaData.isLong = false
        }
      },

      getSortedCinemaInfo() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/cinema_info_controller/getSortedCinemaInfo?region='+ _this.selectedRegion + '%&sortType=score')
            .then(function (res){
              //console.log(res);
              _this.cinemaData.sortCinemaData = res.data.sortCinemaData
              _this.isCinemaNameLong()
              if(res.data.sortCinemaData.length>0){
                _this.selectedCinema = res.data.sortCinemaData[0]
                _this.handleSelectedCinemaChange()
              }else {
                _this.selectedCinema = {
                  cinema_id: 0,
                  cinema_name: '',
                  cinema_address: ''
                }
                _this.handleSelectedCinemaChange()
              }
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
              _this.getSortedCinemaInfo()
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      getAMovieDetailInfo() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/film_info_controller/getAMovieDetailInfo?film_id='+ _this.$route.query.film_id)
            .then(function (res){
              //console.log(res);
              _this.moviesDetailData = res.data.moviesData
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      getMoviesCarouselData() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/film_info_controller/getSevenShowingMoviesInfo')
            .then(function (res){
              //console.log(res);
              _this.moviesCarousel = res.data.moviesData
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      handleSelectedRegionChange() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/cinema_info_controller/getSortedCinemaInfo?region='+ _this.selectedRegion + '%&sortType=score')
            .then(function (res){
              //console.log(res);
              _this.cinemaData.sortCinemaData = res.data.sortCinemaData
              _this.isCinemaNameLong()
              if(res.data.sortCinemaData.length>0){
                _this.selectedCinema = res.data.sortCinemaData[0]
                _this.handleSelectedCinemaChange()
              }else {
                _this.selectedCinema = {
                  cinema_id: 0,
                  cinema_name: '',
                  cinema_address: ''
                }
                _this.handleSelectedCinemaChange()
              }
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      handleSelectedCinemaChange() {
        const _this = this
        this.axios.get('http://127.0.0.1:8000/index/hall_info_controller/getAMovieDate?cinema_id='+_this.selectedCinema.cinema_id+'&film_id='+_this.$route.query.film_id)
            .then(function (res){
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
        this.axios.get('http://127.0.0.1:8000/index/hall_info_controller/getADateFilmTimes?cinema_id='+_this.selectedCinema.cinema_id+'&film_id='+_this.$route.query.film_id + '&film_date=' + _this.selectedDate)
            .then(function (res){
              _this.filmTimesData = res.data.filmTimesData
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      toBuyTicket(row) {
        //console.log(row);
        this.$router.push({
          path:'/seat_order',
          query: {
            film_times_id: row.film_times_id
          }
        })
      }

    },
    created() {
      //console.log(this.$route.query.film_id);
      this.getAllRegionName()
      this.getAMovieDetailInfo()
      this.getMoviesCarouselData()
    },
    mounted() {

    }
  }
</script>

<style scoped>
.box{
  position: absolute;
  height: 400px;
  width: 99%;
}
  .head-bg-color {
    height: 400px;
    width: 100%;
    min-height: 400px;
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
.el-divider--horizontal{          /*修改分割线样式*/
  margin: 0px 0;
}
.row-divider .el-divider--horizontal{          /*修改分割线样式*/
  margin: 8px 0;
}
>>>.el-radio__input.is-checked + .el-radio__label {
  color: red !important;
}
>>>.el-radio__input.is-checked .el-radio__inner {
  background: red !important;
  border-color: red !important;
}
>>> .text_button {
  color: red;
}
</style>