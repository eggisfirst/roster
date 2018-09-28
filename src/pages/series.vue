<template>
  <div class="series">
    <div class="banner">
      <div class="location-icon"></div>
      <div class="location">
        {{province}}省&nbsp;{{city}}&nbsp;{{area}}
      </div>
    </div>
      <ul>
        <li v-for="(person,index) in item" :key="index" @click="click(index)"
        :class="{active:currentTab === index} ">
          <div class="personList clearfix">
            <div class="person clearfix">
              <img :src="`../static/images/man${p[index].sex}.png`" alt="">
              <div class="name">{{p[index].name}}</div>
            </div>
            <div class="takepartin clearfix">
              <img src="../assets/imgs/complete.png" alt="">
              <div class="text">已参训</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="home"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

export default {
  data(){
    return{
      item:17,
      currentTab:'',
      p:'',
      person:[
        {sex:1,name:'陈一'},
        {sex:1,name:'张三'},
        {sex:1,name:'李四'},
        {sex:2,name:'魏五'},
        {sex:2,name:'陈二'},
        {sex:2,name:'张六'},
        {sex:1,name:'陈一'},
        {sex:1,name:'张三'},
        {sex:1,name:'李四'},
        {sex:2,name:'魏五'},
        {sex:2,name:'陈二'},
        {sex:2,name:'张六'},
        {sex:1,name:'张三'},
        {sex:1,name:'李四'},
        {sex:2,name:'魏五'},
        {sex:2,name:'陈二'},
        {sex:2,name:'张六'}
      ]
    }
  },
  props:['city','province','area','series'],
  created(){
    console.log(this.province,this.city,this.area,this.series)
    document.title = this.series + '系列花名册'
    this.p = this.person
  },
  methods:{
    click:function(index){
      this.currentTab = index
    },
    getPreson:() => {
      let url = ''
      let province = this.province
      let city = this.city
      let area = this.area
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
          console.log(res.data)
          //返回数据  总人数 性别（男返回1，女返回2） 名字（排序按姓名首字母排）
        }
      })
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
  li{
    height: 13.33vw;
    width: 100%;
    background: #f2f7fa;
    .personList{
      margin-left: 4vw;
      height: 13.33vw;;
      border-bottom: 1px solid #e7ecf2;
      box-sizing: border-box;
      position: relative;
      .person{
        float: left;
        img{
          width: 10.76vw;
          position: absolute;
          top: 1.33vw;
        }
        .name{
          float: right;
          font-size: 4.53vw;
          line-height: 13.33vw;
          color: #474a5f;
          margin-left: 13.42vw;
        }
      }
      .takepartin{
        float: right;
        img{
          width: 3.73vw;
          padding-top: 4.93vw;
        }
        .text{
          float: right;
          margin-right: 4vw;
          margin-left: 1.6vw;
          font-size: 3.73vw;
          line-height: 13.33vw;
          color: #bfc1c8;
        }
      }
    }
  }
  .active{
    height: 13.33vw;
    width: 100%;
    background: #dfe3e6;
  }
}
</style>
