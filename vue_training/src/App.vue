<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <HelloWorld/>
    <Events/>
    <dataForm/>
    <MyComponent/> -->
    <ParentComponent/>
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
    ParentComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
