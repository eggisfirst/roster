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
       @click="areaClick(index)" :class="{active2:areaClass[index]}">
       {{item2}}
       </li>
    </ul>
    <ul class="mySeries" :style="{display:displaySeries}">
       <div class="city">系列</div>
       <div class="option">请选择</div>
      <li v-for="(item3,index) in allseries" :key="`${index}`"
       @click="seriesClick(index)" :class="{active3:seriesClass[index]}">
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
      displayArea:'none',
      displaySeries:'none',
      i:'',
      cityIndex:'',
      cityClass: [],
      areaClass:[],
      seriesClass:[],
      setProvince:''
    }
  },
  props:['province'],
  created(){ 
    this.getCity()
    this.getAccountMsgCity()
    this.getAccountMsgArea()
    this.getAccountMsgSeries()
    document.title = this.province
    // console.log('this',this.province)
  },
  methods:{
    //根据城市获得地区
    cityClick:function(index){
      //for循环，每个li的class恢复原始值
      for(let key in this.cityClass){
        this.cityClass[key] = false
      }
      //选中的index的li的class为active
     this.cityClass[index] = true
     this.setAccountMsgCity(this.citys,index)
     this.setAccountMsgArea("","")
     this.setAccountMsgSeries('','')
     this.getAccountMsgArea()
     this.allseries = []
     this.getArea(index)
     this.displayArea = 'block'
     this.$emit('City',this.citys[index])
     this.i = index
    },
    //根据地区获得系列
    areaClick:function(index){
      // console.log(this.areas[index])
      for (let key in this.areaClass) {
        this.areaClass[key] = false
      }
      this.areaClass[index] = true
      this.displaySeries = 'block'
      this.setAccountMsgArea(this.areas,index)
      this.setAccountMsgSeries('','')
      this.getAccountMsgSeries()
      this.getSeries(index)
      this.$emit('Area',this.areas[index])
    },
    seriesClick:function(index){
      for (let key in this.seriesClass) {
        this.seriesClass[key] = false
      }
      this.seriesClass[index] = true
      this.setAccountMsgSeries(this.allseries,index)
      // console.log(this.allseries[index])
      this.$emit('Series',this.allseries[index])
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
      }).catch(function(err){
        console.log(err)
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
          this.areas = res.data.data
          if (this.areas){
            this.areaClass.length = this.areas.length
          }
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    //获取系列的时候index跟点击城市的index不同。
    getSeries:function(index){
      let url = 'http://10.12.0.51/derucci/workflow/roster/getxl_byParam.jsp'
      let province = this.province 
      var cityindex;
      //从列表点击进来的index为this.i,后退后点击的index为缓存所获得的index
      if(this.i){
        cityindex = this.i
      }else{
        cityindex = this.cityIndex
      }
      console.log(province,this.citys[cityindex],this.areas[index])
      axios({
        method:'post',
        url:url,
        params:{
          province,
          city:this.citys[cityindex],
          area:this.areas[index]
        }
      }).then((res) => {
        if(res.data){
          // console.log(res.data.data)
          var data = res.data.data[0]
          var myData = data.split(',')
          this.allseries = myData
          if (this.allseries){
            this.seriesClass.length = this.allseries.length
          } 
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    //设置城市cookie
    setAccountMsgCity(citys,index){
      let stringCity = `{"citys":"${citys}","index":"${index}"}`
      sessionStorage.setItem('accountMsgCity',stringCity)
    },
    //读取城市cookie
    getAccountMsgCity(){
      let accountMsgCity = sessionStorage.getItem('accountMsgCity')
      let accountMsgCitys = JSON.parse(accountMsgCity)
      if(accountMsgCitys){
        if(accountMsgCitys.citys){
          this.cityIndex = accountMsgCitys.index
          this.citys = accountMsgCitys.citys.split(',')
          this.displayCity = 'block'
          this.cityClass[this.cityIndex] = true  
        }
      } 
    },
    //设置地区cookie
     setAccountMsgArea(areas,index){
      let stringArea = `{"areas":"${areas}","index":"${index}"}`
      sessionStorage.setItem('accountMsgArea',stringArea)
    },
    //读取地区cookie
     getAccountMsgArea(){
      let accountMsgArea = sessionStorage.getItem('accountMsgArea')
      let accountMsgAreas = JSON.parse(accountMsgArea)
      if(accountMsgAreas){
        if(accountMsgAreas.areas){
          let areaIndex = accountMsgAreas.index
          this.areas = accountMsgAreas.areas.split(',')
          this.displayArea = 'block'
          this.areaClass[areaIndex] = true  
        }else{
          //清除active样式
          for(let key in this.areaClass){
            this.areaClass[key] = false
          }
        } 
      }
    },
     //设置系列cookie
     setAccountMsgSeries(series,index){
      let stringSeries = `{"series":"${series}","index":"${index}"}`
      sessionStorage.setItem('accountMsgSeries',stringSeries)
    },
    //读取系列cookie
     getAccountMsgSeries(){
      let accountMsgSeries = sessionStorage.getItem('accountMsgSeries')
      let accountMsgSeriess = JSON.parse(accountMsgSeries)
      if(accountMsgSeriess){
        console.log('yes')
        if(accountMsgSeriess.series){
          console.log('you',accountMsgSeriess.series)
          let seriesIndex = accountMsgSeriess.index
          this.allseries = accountMsgSeriess.series.split(',')
          this.displaySeries = 'block'
          this.seriesClass[seriesIndex] = true  
        }else{
          console.log('meiyou')
           for (let key in this.seriesClass) {
           this.seriesClass[key] = false
      }
        }
          
      }else{
        console.log('no')
        // this.displaySeries = 'none'
     
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
