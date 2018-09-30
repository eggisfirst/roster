<template>
  <li>
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
  </li>
</template>

<script>


export default {
  name: 'myList',
  data(){
    return{
      
    }
  },
  props:['item'],
  created(){
    
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

</style>
