<template>
  <div class="series">
    <div class="banner">
      <div class="location-icon"></div>
      <div class="location">
        {{province}}&nbsp;{{city}}&nbsp;{{this.myarea}}
      </div>
    </div>
      <ul>
        <li
        v-for="(item, index) in person"
        :key="index" 
        is="myList"
        :item="item"
        @click.native="click(index)"
        :class="{active:currentTab === index} ">
        </li>
      </ul>
      <router-link to="/">
        <div class="home"></div>
      </router-link>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import myList from '../components/myList'

export default {
  name: 'series',
  data(){
    return{
      currentTab:'',
      person:[],
      details:{name:'',id:''},
      myarea:''
     
    }
  },
  components:{myList},
  props:['city','province','area','series'],
  created(){
    console.log(this.province,this.city,this.area,this.series)
    this.myarea = this.area
    if(this.area == this.city){
      this.myarea = undefined
    }
    document.title = this.series + '系列花名册'
    this.getPreson()
  },
  methods:{
    click:function(index){
      this.currentTab = index
      this.details.name = this.person[index].name
      this.details.id = this.person[index].id
      //跳转下个页面，把当前点击的名字传下去。
      this.$emit('details',this.details)
      this.$router.push({path:'/personalDetails'})
    },
    getPreson(){
      let url = 'http://10.12.0.51/derucci/workflow/roster/get_roster_param.jsp'
     
      let province = this.province
      let city = this.city
      let area = this.area
      if(city == area){
        area = undefined
      }
      let series = this.series
      
      axios({
        method:'post',
        url:url,
        params:{
          province,
          city,
          area,
          series
        }
      }).then((res) => {
        if(res.data){
          // console.log(res.data.person[0].id)
          this.person = res.data.person
          
          //返回数据  总人数 性别（男返回0，女返回1） 名字（排序按姓名首字母排）
        }
      })
    },
    clickHome:() => {
      console.log('home')
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
.series{
  position: relative;
}
.banner{
  width: 100vw;
  height: 10.67vw;
  background: #edf3f8;
  position: relative;
  font-family: 'PINGFANG';
 .location-icon{
    background: url(../assets/imgs/location.png) no-repeat center;
    background-size: 100%;
    width: 3.46vw;
    height: 3.46vw;
    position: absolute;
    top: 3.733vw;
    left:4vw ;
 }
 .location{
    font-size: 4.53vw;
    line-height: 10.67vw;
    color: #474a5f;
    margin-left: 10.67vw;
    font-family: 'PINGFANGBOLD';
    font-weight: bold;
 }
}
ul{
  width: 100vw;
  font-family: 'PINGFANG';
  .active{
    height: 13.33vw;
    width: 100%;
    background: #dfe3e6;
  }
}
.home{
  width: 11.66vw;
  height: 11.66vw;
  position: fixed;
  bottom: 5.33vw;
  left: 44.66vw;
  background: url(../assets/imgs/home.png) no-repeat center;
  background-size: 100%;
}
</style>
