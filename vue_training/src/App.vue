<template>
  <div id="app">
    <el-row :gutter=24>
      <el-col :span=12>
        <div class=top_navs></div>
      </el-col>
      <el-col :span=12>
        <div class=top_navs></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld"
import Events from "@/components/Event"
import dataForm from "./components/formData"
import MyComponent from "./components/myComponent"
import ParentComponent from "./components/parentComponent"

export default {
  name: 'App',
  components: {
    HelloWorld,
    Events,
    dataForm,
    MyComponent,
    ParentComponent,
  },
  data (){
    return {
      "customers":
        [
          {"id": 33, "name": "jack", "cash": 4500, 'age': 33},
          {"id": 32, "name": "tom", "cash": 800, 'age': 14},
          {"id": 38, "name": "ketty", "cash": 1200, 'age': 28},
          {"id": 24, "name": "smith", "cash": 3210, 'age': 25},
        ]
    };
  }
}
</script>

<style lang="stylus" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.top_navs
  width 100%
  height 80px
  background-color grey
  display flex
  flex-direction row
  justify-content flex-start
  align-items cener
</style>
