<template>
  <div class="details">
    <div class="name">{{personName}}</div>
    <ul>
      <li v-for="(i,index) in item" :key="index">
        <div class="line">
          <div class="left"><span>{{p[index].key1}}</span></div>
          <div class="right">{{p[index].value1}}</div>
        </div>
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

export default {
  data(){
    return{
      item:15,
      p:'',
      person:[
        {key1:'性别',value1:'女'},
        {key1:'手机号码',value1:'150139000000'},
        {key1:'身份证号码',value1:'34452811123214214'},
        {key1:'婚姻状况',value1:'未婚'},
        {key1:'受教育程度',value1:'大专'},
        {key1:'入职日期',value1:'2017年5月23日'},
        {key1:'职位',value1:'顾问'},
        {key1:'城市',value1:'东莞'},
        {key1:'县市',value1:'厚街'},
        {key1:'经销商姓名',value1:'刘老板'},
        {key1:'系列',value1:'0769'},
        {key1:'您所在城市培训对接人',value1:'张大千'},
        {key1:'培训对接人联系号码',value1:'123445678'},
        {key1:'是否参加过总部慕思商学院十天以上的培训',value1:'是'},
        {key1:'您的年龄层',value1:'18-23岁'}
        
      ]
    }
  },
  props:['personName'],
  created(){
    console.log(this.personName)
    this.p = this.person
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
.details{
  background: #edf3f8;
  width: 100vw;
  padding-bottom: 4vw;
  .name{
    height: 17.33vw;
    font-size: 6.4vw;
    line-height: 17.33vw;
    color: #484a5f;
    font-family: 'PINGFANGBOLD';
    font-weight: bold;
    padding-left: 4.26vw;
    background: #edf3f8;
  }
  ul{
    li{
      background: #f2f7fa;
      height: 13.33vw;
      
      .line{
        border-bottom: 1px solid #e7ecf2;
        height: 100%;
        box-sizing: border-box;
        margin-left:4vw; 
        .left{
          display: flex;
          align-items: center;
          font-size: 4.53vw;
          height: 13.33vw;
          color: #474a5f;
          width: 54vw;
          line-height: 4.8vw;
        }
        .right{
          font-size: 3.73vw;
          line-height: 13.33vw;
          color: #afb0b9;
          margin-right: 4vw;
        }
      }
    }
    li:nth-child(3){
      .line{
        border-bottom: none;
      }
    margin-bottom: 4vw;
    }
    li:nth-child(4n+3){
      .line{
        border-bottom: none;
      }
    margin-bottom: 4vw;
    }
    li:last-child{
      margin-bottom: 0;
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
}




</style>
