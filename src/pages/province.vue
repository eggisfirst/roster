<template>
  <div class="province">
    <ul class="myCity">
       <div class="city">市</div>
       <div class="option">请选择</div>
      <li v-for="(item1, index) in citys" :key="`${index}11`"
       @click="cityClick(index)" :class="{active1:cityTab === index}">
       {{item1}}
       </li>
    </ul>
     <ul class="myArea" :style="{display:displayArea}">
       <div class="city">地区</div>
       <div class="option">请选择</div>
      <li v-for="(item2,index) in areas" :key="`${index}22`"
       @click="areaClick(index)" :class="{active2:areaTab === index}">
       {{item2}}
       </li>
    </ul>
    <ul class="mySeries" :style="{display:displaySeries}">
       <div class="city">系列</div>
       <div class="option">请选择</div>
      <li v-for="(item3,index) in allseries" :key="`${index}33`"
       @click="seriesClick(index)" :class="{active3:seriesTab === index}">
       {{item3}}
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
      citys:['东莞市', '广州市', '深圳市', '珠海市', '汕头市', '韶关市', '肇庆市', '湛江市'],
      areas:['南城区' ,'厚街区' ,'东城区' ,'万江区' ,'虎门镇'],
      allseries:['3D', '凯奇', '歌蒂亚', '0769', 'V6'],
      cityTab:'',
      areaTab:'',
      seriesTab:'',
      displayArea:'none',
      displaySeries:'none'
    }
  },
  props:['province'],
  created(){
    this.getCity()
    document.title = this.province + '省'
    // console.log('this',this.province)
  },
  methods:{
    //根据城市获得地区
    cityClick:function(index){
    //  console.log(this.p[index].city)
     let currentCity = this.citys[index]
     console.log(currentCity) 
     this.cityTab = index  //获取当前索引，添加active样式。
     this.getArea()
     this.displayArea = 'block'
     this.$emit('City',currentCity)
    },
    //根据地区获得系列
    areaClick:function(index){
      console.log(this.areas[index])
      this.areaTab = index
      this.displaySeries = 'block'
      let currentArea = this.areas[index]
      this.getSeries()
      this.$emit('Area',currentArea)
    },
    seriesClick:function(index){
      console.log(this.allseries[index])
      let currentSeries = this.allseries[index]
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
      // let province = this.province 
      // axios({
      //   method:'post',
      //   url:url,
      //   params:{
            //  province,
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
      // let province = this.province 
      // axios({
      //   method:'post',
      //   url:url,
      //   params:{
            //  province,
            //  city:currentCity,
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
