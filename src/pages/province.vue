<template>
  <div class="province">
    <ul class="myCity">
       <div class="city">市</div>
       <div class="option">请选择</div>
      <li v-for="(item1, index) in citys" :key="`${index}`"
       @click="cityClick(index)" :class="{active1: cityClass[index]}">
       {{item1.city}}
       <span class="cityNum">{{item1.number}}</span>
       </li>
    </ul>
     <ul class="myArea" :style="{display:displayArea}">
       <div class="city">地区</div>
       <div class="option">请选择</div>
      <li v-for="(item2,index) in areas" :key="`${index}`"
       @click.stop="areaClick(index)" :class="{active2:areaClass[index]}">
       {{item2.area}}
       <span class="cityNum">{{item2.number}}</span>
       </li>
    </ul>
    <ul class="mySeries" :style="{display:displaySeries}">
       <div class="city">系列</div>
       <div class="option">请选择</div>
      <li v-for="(item3,index) in allseries" :key="`${index}`"
       @click.stop="seriesClick(index)" :class="{active3:seriesClass[index]}">
       {{item3}}
       <span class="cityNum">{{seriesNum[index]}}</span>
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
      seriesNum:[],
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
    this.setProvince = this.province
    console.log(this.setProvince)
    this.getCity()
    
    // this.getAccountMsgCity()
    // this.getAccountMsgArea()
    // this.getAccountMsgSeries()
    document.title = this.province
    // console.log('this',this.province)
    
  },
  methods:{
    //根据城市获得地区
    // getIndex:function(str,data){
    //   let index = -1;
    //   for (let i = 0; i < data.length; i ++){
    //     if (str == data[i].name) {
    //       index = i
    //     }
    //   }
    //   return index
    //   // data[getIndex['南京',data].city]
    // },
    cityClick:function(index){
      //for循环，每个li的class恢复原始值
      for(let key in this.cityClass){
        this.cityClass[key] = false
      }
      console.log('点击获取的citys',this.cityClass,index)
      //选中的index的li的class为active
      this.cityClass[index] = true
      for(let key in this.areaClass){
        this.areaClass[key] = false
      }
     
     this.setAccountMsgArea("","")
     this.setAccountMsgSeries('','')
     this.allseries = []
     
     this.setAccountMsgCity(this.citys[index].city,index)
     this.getArea(index)
     this.displayArea = 'block'

     this.$emit('City',this.citys[index].city)
     this.i = index
     console.log('i',this.i)
    },
    //根据地区获得系列
    areaClick:function(index){
      console.log('地区点击事件', index)
      // console.log(this.areas[index])
      for (var i = 0; i < this.areaClass.length; i ++) {
        this.areaClass[i] = false
      }
      this.areaClass[index] = true
      console.log(888888,this.areaClass,index)


      for(let key in this.seriesClass){
        this.seriesClass[key] = false
      }

     
      this.setAccountMsgArea(this.areas[index].area,index)
      
      this.displaySeries = 'block'
      
      
      this.setAccountMsgSeries('','')
      // this.getAccountMsgSeries()
      this.getSeries(index)
      this.$emit('Area',this.areas[index].area)
    },
    seriesClick:function(index){
      for (let key in this.seriesClass) {
        this.seriesClass[key] = false
      }
      this.seriesClass[index] = true
      this.setAccountMsgSeries(this.allseries,index)
     
     
      this.$emit('Series',this.allseries[index])
      this.$router.push({path:'/series'})
    },
    //根据省份获得城市
    getCity:function(){
      let url = 'http://10.12.0.54/derucci/workflow/roster/getcity_byPro.jsp'
      let province = this.setProvince 
      axios({
        method:'post',
        url:url,
        params:{
          province
        }
      }).then((res) => {
        // console.log(9999, this)
        if(res.data){   
          // console.log(res.data.data)
          this.citys = res.data.data
          this.getAccountMsgCity()
          this.getAccountMsgArea()
          this.getAccountMsgSeries()
          // console.log('first get this.citys',this.citys)
          if (this.citys) {
            // console.log('get length',this.citys.length)
            this.cityClass.length = this.citys.length
          }
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    getArea:function(index){
      console.log('areaIndex', index)
      // console.log(this.citys[index])
      let url = 'http://10.12.0.54/derucci/workflow/roster/get_area_bycity.jsp'
      let province = this.province 
      // console.log('this.citys',this.citys[index].city)
      axios({
        method:'post',
        url:url,
        params:{
          province,
          city:this.citys[index].city
        }
      }).then((res) => {
        // console.log('result', res)
        // console.log('res',res.data.data)
        if(res.data){ 
          this.areas = res.data.data
          if (this.areas){
            this.areaClass.length = this.areas.length
            console.log('更改areaclass1')
          }
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    //获取系列的时候index跟点击城市的index不同。
    getSeries:function(index){
      console.log('点击事件')
      let url = 'http://10.12.0.54/derucci/workflow/roster/getxl_byParam.jsp'
      let province = this.province 
      var cityindex;
      //从列表点击进来的index为this.i,后退后点击的index为缓存所获得的index
      // console.log('this i',this.i,'this.index',this.citys)
      let temp = JSON.parse(sessionStorage.getItem('accountMsgCity')).index
      console.log('temp',temp,this.i)
      var cityindex;
      var areaSeries;
      if(temp){
        cityindex = temp
      }else{
        cityindex = this.i
      }
      let tempArea = JSON.parse(sessionStorage.getItem('accountMsgArea')).areas
         areaSeries = tempArea
      
      // console.log('this.areas',this.areas)
      // console.log('this.city',this.citys,'this.index',cityindex)
      var citySeries = this.citys[cityindex].city
      //当市跟区一样的时候，区为空
      if(citySeries == areaSeries){
        areaSeries = undefined
      }
      axios({
        method:'post',
        url:url,
        params:{
          province,
          city:citySeries,
          area:areaSeries
        }
      }).then((res) => {
        // console.log(12324434,res)
        if(res.data){
          // console.log(99999,res.data.data[0])  
          var data = res.data.data
          var temp = []
          var tempSeries;
          var tempNum;
          var myNum = [];
          var tempseries = {};
          var myData = []
          var myLength = data.length
         for (var i = 0; i < myLength; i ++){ 
            temp = data[i].split('_')
            tempSeries = temp[0]
            tempNum = temp[1]
            myNum += tempNum + ","
            this.seriesNum = myNum.split(',')
            tempseries = tempSeries
            myData += tempseries + ','
            var allData = myData.split(',')
          }
          this.allseries = allData
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
      // console.log('yes',accountMsgCity,accountMsgCitys)
      if(accountMsgCitys){
        if(accountMsgCitys.citys){
          this.cityIndex = accountMsgCitys.index
          this.displayCity = 'block'
          this.cityClass[this.cityIndex] = true  
          //当点击市的时候缓存区
          this.displayArea = 'block'
          this.getArea(this.cityIndex)
          //  for(let key in this.areaClass){
          //   this.areaClass[key] = false
          // }
        }
      }else{
        console.log('getCityFail',accountMsgCity)
      } 
    },
    //设置地区cookie
     setAccountMsgArea(areas,index){
       
      let stringArea = `{"areas":"${areas}","index":"${index}"}`
      sessionStorage.setItem('accountMsgArea',stringArea)
    },
    //读取地区cookie
     getAccountMsgArea(){
      console.log('修改了areaclass')
      let accountMsgArea = sessionStorage.getItem('accountMsgArea')
      let accountMsgAreas = JSON.parse(accountMsgArea)
    

      if(accountMsgAreas){
        if(accountMsgAreas.areas){
          var areaIndex = accountMsgAreas.index
          // console.log('this.areas',this.accountMsgAreas.areas,'areaindex',areaIndex)
          this.displayArea = 'block'

          this.areaClass[areaIndex] = true
          console.log('更改areaclass2')

          this.displaySeries = 'block'
          this.getSeries(areaIndex)

        }else{
          //清除active样式
          console.log('loss')
          // for(let key in this.areaClass){
          //   this.areaClass[key] = false
          // }
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
      console.log(111,accountMsgSeries,2222,accountMsgSeriess)
      if(accountMsgSeriess){
        if(accountMsgSeriess.series){
          console.log('you',accountMsgSeriess.series)
          let seriesIndex = accountMsgSeriess.index
          this.allseries = accountMsgSeriess.series.split(',')
          this.displaySeries = 'block'
          this.seriesClass[seriesIndex] = true  

        }else{
          // console.log('meiyou')
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
  .cityNum{
    color: #fc807e
  }
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
