<template>
  <div class="province">
    <ul class="myCity">
       <div class="city">市</div>
       <div class="option">请选择</div>
      <li v-for="(item1, index) in citys" :key="`${index}`"
       @click="cityClick(index)" :class="{active1: cityClass[index]}">
       {{item1}}
       </li>
    </ul>
     <ul class="myArea" :style="{display:displayArea}">
       <div class="city">地区</div>
       <div class="option">请选择</div>
      <li v-for="(item2,index) in areas" :key="`${index}`"
       @click="areaClick(index)" :class="{active2:areaTab === index}">
       {{item2}}
       </li>
    </ul>
    <ul class="mySeries" :style="{display:displaySeries}">
       <div class="city">系列</div>
       <div class="option">请选择</div>
      <li v-for="(item3,index) in allseries" :key="`${index}`"
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
      citys:[],
      areas:[],
      allseries:[],
      cityTab:'',
      areaTab:'',
      seriesTab:'',
      displayArea:'none',
      displaySeries:'none',
      i:'',
      setCity:[],
      citysSelect:'',
      cityClass: []
    }
  },
  props:['province'],
  created(){
    this.getCity()
    this.getAccountMsgCity()
    document.title = this.province
    // console.log('this',this.province)
  },
  methods:{
    //根据城市获得地区
    cityClick:function(index){
      for (let key in this.cityClass) {
        this.cityClass[key] = false
      }
      this.cityClass[index] = true
    //  console.log(this.p[index].city)
     let currentCity = this.citys[index]
     this.setAccountMsgCity(this.citys,index)
     this.cityTab = index  //获取当前索引，添加active样式。
     this.getArea(index)
     this.displayArea = 'block'
     this.$emit('City',currentCity)
     this.i = index
    },
    //根据地区获得系列
    areaClick:function(index){
      // console.log(this.areas[index])
      this.areaTab = index
      this.displaySeries = 'block'
      let currentArea = this.areas[index]
      // this.setAccountMsg(currentArea)
      this.getSeries(index)
      this.$emit('Area',currentArea)
    },
    seriesClick:function(index){
      // console.log(this.allseries[index])
      let currentSeries = this.allseries[index]
      this.seriesTab = index
      this.$emit('Series',currentSeries)
      this.$router.push({path:'/series'})
    },
    //根据省份获得城市
    getCity:function(){
      let url = 'http://10.12.0.51/derucci/workflow/roster/getcity_byPro.jsp'
      let province = this.province 
      axios({
        method:'post',
        url:url,
        params:{
          province
        }
      }).then((res) => {
        if(res.data){
          // console.log(res.data.data)
          this.citys = res.data.data
          if (this.citys) {
            this.cityClass.length = this.citys.length
          }
        }
      })
    },
    getArea:function(index){
      // console.log(this.citys[index])
      let url = 'http://10.12.0.51/derucci/workflow/roster/get_area_bycity.jsp'
      let province = this.province 
      axios({
        method:'post',
        url:url,
        params:{
          province,
          city:this.citys[index]
        }
      }).then((res) => {
        if(res.data){
          // console.log(res.data)
          this.areas = res.data.data
        }
      })
    },
    //获取系列的时候index跟点击城市的index不同。
    getSeries:function(index){
      let url = 'http://10.12.0.51/derucci/workflow/roster/getxl_byParam.jsp'
      let province = this.province 
      console.log(province,this.citys[this.i],this.areas[index])
      axios({
        method:'post',
        url:url,
        params:{
          province,
          city:this.citys[this.i],
          area:this.areas[index]
        }
      }).then((res) => {
        if(res.data){
          // console.log(res.data.data)
          var data = res.data.data[0]
          var myData = data.split(',')
          this.allseries = myData
        }
      })
    },
    //设置cookie
    setAccountMsgCity(citys,index){
      let string = `{"citys":"${citys}","index":"${index}"}`
      sessionStorage.setItem('accountMsgCity',string)
    },
    //读取cookie
    getAccountMsgCity(){
      let accountMsgCity = sessionStorage.getItem('accountMsgCity')
      let accountMsgCitys = JSON.parse(accountMsgCity)
      if(accountMsgCitys){
        //  console.log('city',accountMsgCitys.citys)
         this.setCity = accountMsgCitys
         console.log(this.setCity['index'])
        this.cityClass[this.setCity['index']] = true
         
      }
     
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
  height: 100vh;
  overflow-x: hidden;
  width: 29.3vw;
  text-align: center;
  line-height: 10.66vw;
  color: #474a5f;
  font-size: 4.53vw;
  float: left;
  position: relative;
  .city{
    font-family: 'PINGFANGBOLD';
    background: #edf3f8;
    font-weight: bold;
    position: fixed;
    width: 29.3vw;
  }
  .option{
    background: #fff;
    border: 1px solid #e7ecf2;
    margin-top: 10vw;
  }
  li{
    border: 1px solid #e7ecf2;
    border-top: none; 
  }
  .active1{
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
  .city{
    width: 41.5vw;
  }
  li{
    background: #f1f6fa;
    border-left: none;
  }
  .active3{
    border-bottom: 1px solid #e7ecf2;
    border-right: none;
    border-top: none;
    color: #7498fb;
    background: #f1f6fa;
    border-left: 1.2vw solid #7498fb;
  }
}

</style>
