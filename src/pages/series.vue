<template>
  <div class="series">
    <div class="banner">
      <div class="location-icon"></div>
      <div class="location">
        {{province}}&nbsp;{{city}}&nbsp;{{area}}
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
        <!-- <li v-for="(item,index) in person" :key="index" @click="click(index)"
        :class="{active:currentTab === index} ">
          <div class="personList clearfix">
            <div class="person clearfix">
              <img :src="`../static/images/man${item.sex}.png`" alt="">
              <div class="name">{{item.name}}</div>
            </div>
            <div class="takepartin clearfix">
              <img src="../assets/imgs/complete.png" alt="">
              <div class="text">已参训</div>
            </div>
          </div>
        </li> -->  
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
      details:{name:'',id:''}
     
    }
  },
  components:{myList},
  props:['city','province','area','series'],
  created(){
    console.log(this.province,this.city,this.area,this.series)
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
          
          //返回数据  总人数 性别（男返回1，女返回2） 名字（排序按姓名首字母排）
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
  // li{
  //   height: 13.33vw;
  //   width: 100%;
  //   background: #f2f7fa;
  //   .personList{
  //     margin-left: 4vw;
  //     height: 13.33vw;;
  //     border-bottom: 1px solid #e7ecf2;
  //     box-sizing: border-box;
  //     position: relative;
  //     .person{
  //       float: left;
  //       img{
  //         width: 10.76vw;
  //         position: absolute;
  //         top: 1.33vw;
  //       }
  //       .name{
  //         float: right;
  //         font-size: 4.53vw;
  //         line-height: 13.33vw;
  //         color: #474a5f;
  //         margin-left: 13.42vw;
  //       }
  //     }
  //     .takepartin{
  //       float: right;
  //       img{
  //         width: 3.73vw;
  //         padding-top: 4.93vw;
  //       }
  //       .text{
  //         float: right;
  //         margin-right: 4vw;
  //         margin-left: 1.6vw;
  //         font-size: 3.73vw;
  //         line-height: 13.33vw;
  //         color: #bfc1c8;
  //       }
  //     }
  //   }
  // }
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
