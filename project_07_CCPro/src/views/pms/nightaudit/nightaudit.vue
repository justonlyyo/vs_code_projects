<template>
  <div class="warp-main">
    <p>this  is   夜审</p>
    <el-button type="primary" icon="el-icon-edit" @click="clickShow">伙伴查看</el-button>
  </div>
</template>
<script>
  export default {
    data: function(){
      return {
        message: 'Hello Vue'
      };
    },
    methods: {
      clickShow: function(){
        alert('显示');
      }
    }
  }
</script>
