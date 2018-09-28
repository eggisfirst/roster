<template>
  <div class="province">
    <ul class="myCity">
       <div class="city">市</div>
       <div class="option">请选择</div>
      <li v-for="(p,index) in cityItem" :key="index"
       @click="cityClick(index)" :class="{active1:cityTab === index}">
       {{provinceCity[index].city}}
       </li>
    </ul>
     <ul class="myArea" :style="{display:displayArea}">
       <div class="city">地区</div>
       <div class="option">请选择</div>
      <li v-for="(c,index) in areaItem" :key="index"
       @click="areaClick(index)" :class="{active2:areaTab === index}">
       {{cityArea[index].area}}
       </li>
    </ul>
    <ul class="mySeries" :style="{display:displaySeries}">
       <div class="city">系列</div>
       <div class="option">请选择</div>
      <li v-for="(s,index) in seriesItem" :key="index"
       @click="seriesClick(index)" :class="{active3:seriesTab === index}">
       {{areaSeries[index].series}}
       </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

export default {
  data(){
    return{
     cityItem:8,
     areaItem:5,
     seriesItem:5,
     provinceCity:'',
     p:[
      {city:'东莞市'},{city:'广州市'},{city:'深圳市'},{city:'珠海市'},
      {city:'汕头市'},{city:'韶关市'},{city:'肇庆市'},{city:'湛江市'}
    ],
    cityTab:'',
    areaTab:'',
    seriesTab:'',
    cityArea:'',
    c:[
      {area:'南城区'},{area:'厚街区'},{area:'东城区'},{area:'万江区'},
      {area:'虎门镇'}
    ],
    displayArea:'none',
    displaySeries:'none',
    areaSeries:'',
    s:[
      {series:'3D'},{series:'凯奇'},{series:'歌蒂亚'},{series:'0769'},{series:'V6'}
    ]

    }
  },
  props:['province'],
  created(){
    this.provinceCity = this.p
    this.cityArea = this.c
    this.areaSeries = this.s
    this.getCity()
    document.title = this.province + '省'
    // console.log('this',this.province)
  },
  methods:{
    //根据城市获得地区
    cityClick:function(index){
    //  console.log(this.p[index].city)
     let currentCity = this.p[index].city
     console.log(currentCity) 
     this.cityTab = index  //获取当前索引，添加active样式。
     this.getArea()
     this.displayArea = 'block'
     this.$emit('City',currentCity)
    },
    //根据地区获得系列
    areaClick:function(index){
      console.log(this.c[index].area)
      this.areaTab = index
      this.displaySeries = 'block'
      let currentArea = this.c[index].area
      this.getSeries()
      this.$emit('Area',currentArea)
    },
    seriesClick:function(index){
      console.log(this.s[index].series)
      let currentSeries = this.s[index].series
      this.seriesTab = index
      this.$emit('Series',currentSeries)
      this.$router.push({path:'/series'})
    },
    //根据省份获得城市
    getCity:function(){
      let url = ''
      let province = this.province 
      // axios({
      //   method:'post',
      //   url:url,
      //   params:{
      //     province
      //   }
      // }).then((res) => {
      //   if(res.data){
      //     console.log(res.data)
      //   }
      // })
    },
    getArea:function(){
      // let url = ''
      // axios({
      //   method:'post',
      //   url:url,
      //   params:{
      //     city:currentCity
      //   }
      // }).then((res) => {
      //   if(res.data){
      //     console.log(res.data)
      //   }
      // })
    },
    getSeries:function(){
      // let url = ''
      // axios({
      //   method:'post',
      //   url:url,
      //   params:{
      //     area:currentArea
      //   }
      // }).then((res) => {
      //   if(res.data){
      //     console.log(res.data)
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'PINGFANG';
  src: url('../assets/font/PingFang Medium.ttf');
}
@font-face {
  font-family: 'PINGFANGBOLD';
  src: url('../assets/font/PingFang Bold.ttf');
}
ul{
  width: 29.3vw;
  text-align: center;
  line-height: 10.66vw;
  color: #474a5f;
  font-size: 4.53vw;
  float: left;
  .city{
    font-family: 'PINGFANGBOLD';
    background: #edf3f8;
    font-weight: bold;
  }
  .option{
    background: #fff;
    border: 1px solid #e7ecf2;
  }
  li{
    height: 10.66vw;
    border: 1px solid #e7ecf2;
    border-top: none; 
  }
  .active1{
    height: 10.66vw;
    border-bottom: 1px solid #e7ecf2;
    border-right: none;
    border-top: none;
    color: #7498fb;
    background: #f2f7fa;
    border-left: 1.2vw solid #7498fb;
  }
}
.myArea{
  .option{
    border-left: none;
  }
  li{
    background: #f2f7fa;
    border-left: none;
  }
.active2{
    height: 10.66vw;
    border-bottom: 1px solid #e7ecf2;
    border-right: none;
    border-top: none;
    color: #7498fb;
    background: #f1f6fa;
    border-left: 1.2vw solid #7498fb;
  }
}
.mySeries{
  width: 41.33vw;
  .option{
    border-left: none;
  }
  li{
    background: #f1f6fa;
    border-left: none;
  }
  .active3{
    height: 10.66vw;
    border-bottom: 1px solid #e7ecf2;
    border-right: none;
    border-top: none;
    color: #7498fb;
    background: #f1f6fa;
    border-left: 1.2vw solid #7498fb;
  }
}

</style>
