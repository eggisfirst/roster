<template>
  <div class="details">
    <div class="name">{{details.name}}</div>
    <ul>
      <li v-for="(item,index) in personDetails" :key="index">
        <div class="line">
          <div class="left"><span>{{item.topic}}</span></div>
          <div class="right"><span>{{item.message}}</span></div>
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
      personDetails:[
        // {topic:'性别',message:'女'},
        // {topic:'手机号码',message:'150139000000'},
        // {topic:'身份证号码',message:'34452811123214214'},
        // {topic:'婚姻状况',message:'未婚'},
        // {topic:'受教育程度',message:'大专'},
        // {topic:'入职日期',message:'2017年5月23日'},
        // {topic:'职位',message:'顾问'},
        // {topic:'城市',message:'东莞'},
        // {topic:'县市',message:'厚街'},
        // {topic:'经销商姓名',message:'刘老板'},
        // {topic:'系列',message:'0769'},
        // {topic:'您所在城市培训对接人',message:'张大千'},
        // {topic:'培训对接人联系号码',message:'123445678'},
        // {topic:'是否参加过总部慕思商学院十天以上的培训',message:'是'},
        // {topic:'您的年龄层',message:'18-23岁'}
        
      ]
    }
  },
  props:['details'],
  created(){
    console.log(this.details)
    this.getDetails()
  },
  methods:{
    getDetails(){
      let id = this.details.id
      let url = '/derucci/workflow/roster/getroster_byId.jsp'
      axios({
        method:'post',
        url:url,
        params:{
          type:'detail',
          id
        }
      }).then((res) => {
        console.log(res)
        if(res.data){
          console.log(res.data.personDetails)
          this.personDetails = res.data.personDetails
        }
      }).catch(function(err){
        console.log(err)
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
        display: flex;
        align-items: center;
        .left{
          flex:1.4;
          font-size: 4.53vw;
          color: #474a5f;
        }
        .right{
          flex: 1;
          font-size: 3.73vw;
          margin-right: 2vw;
          color: #afb0b9;
          
          text-align: right;
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
