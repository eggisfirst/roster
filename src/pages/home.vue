<template>
  <div class="home">
    <div class="wrapper">
      <div class="title">
        <img src="../assets/imgs/flower1.png" alt="">
        <span>花名册</span>
        <img src="../assets/imgs/flower2.png" alt="">
      </div>
      <div class="peopelNum">
        <p>目前全国慕思持有上岗证人员共有</p>
        <span>{{allPersonNum}}</span>名
      </div>
      <div class="areaPeopleNum">
        <p>各省持证人数分布</p>
        <ul class="clearfix">         
          <li v-for="(item,index) in personForms " :key="index"
          @click="linkToProvince(index)">
            <div class="areaPeopleNumber">{{item.areaPeopleNumber}}</div>
            <div class="province">{{item.province}}</div>    
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

export default {
  data(){
    return{
      allPersonNum: '',
      personForms:[]
    }
  },
  created(){
    this.getPeopelNum()
  },
  methods: {
    getPeopelNum() {
      const url = 'http://10.12.0.51/derucci/workflow/roster/get_alltrosters.jsp'  //接口
      axios({
        method:'post',
        url:url,
        params:{

        }//接口参数
      }).then((res) => {
        console.log()
        if(res.data){
          // console.log(res.data)
          this.allPersonNum = res.data.allPersonNum
          this.personForms = res.data.personForms
          console.log(this.personForms)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
   
    //点击哪个省份，通过路由传到下个页面。
    linkToProvince:function(index){
      let myProvince = this.personForms[index].province 
      console.log(myProvince)
      this.$emit('Province',myProvince)
      this.$router.push({path:'/province'})
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'PINGFANGBOLD';
  src: url('../assets/font/PingFang Bold.ttf');
}
@font-face {
  font-family: 'PINGFANG';
  src: url('../assets/font/PingFang Medium.ttf');
}
.wrapper{
  width: 100vw;
  height: 100vh;
  padding: 4.94vw 4vw ;
  box-sizing: border-box;
  font-family: 'PINGFANG';
  background: #edf3f8;
  .title{
    margin: 0 auto;
    width: 30.66vw;
    margin-bottom: 4.94vw;
    span{
      font-size: 6.4vw;
      line-height: 9.33vw;
      color: #484a5f;
      font-family: 'PINGFANGBOLD';
    }
    img{
      width: 4vw;
      vertical-align: text-top
    }
  }
  .peopelNum{
    width: 92vw;
    height: 34vw;
    text-align: center;
    background: url(../assets/imgs/bg.png) no-repeat center;
    background-size: 100%;
    font-size: 4.26vw;
    color: #484a5f;
    border-width: 1px;
    border-image-source: linear-gradient(0, #fafbfb 92%, #ffffff 100%);
    border-image-slice: 1;
    border-radius: 2vw;
    p{
      font-size: 3.73vw;
      line-height: 15vw;
      letter-spacing: 1px;
      color: #b8b9c1;
    }
    span{
      font-size: 16vw;
      line-height: 14vw;
      letter-spacing: .4vw;
      color: #484a5f;
      font-family: 'PINGFANGBOLD';
    }
  }
  .areaPeopleNum{
    p{
      font-size: 4vw;
      line-height: 16vw;
      letter-spacing: 1px;
      color: #a9adb7;
      font-family: 'PINGFANGBOLD';
    }
    ul{
      
      li{
        width: 21.3vw;
        height: 21.3vw;
        background-color: #fbfcfd;
	      box-shadow: 0px .53vw .53vw 0px rgba(227, 227, 227, 0.2);
        border: solid 1px #f5f8fb;
        border-radius: 2vw;
        float: left;
        margin-right: 1.56vw;
        margin-bottom: 1.56vw;
        .areaPeopleNumber{
          font-size: 5.6vw;
          line-height: 6vw;
          color: #7498fb;
          font-family: 'PINGFANGBOLD';
          text-align: center;
          margin-top: 3.86vw;
        }
        .province{
          font-size: 4.8vw;
          color: #bfc1c8;
          text-align: center;
        }
      }
      li:nth-child(4n){
        margin-right: 0
      }

    }
    
  }
}
</style>


