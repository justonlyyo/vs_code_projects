<template>
  <div>
    <span>{{msg}}</span>
    <span>{{now_1}}</span>
    <span>{{now_2()}}</span>
    <div>
      <input type="text" v-model="names">
      <input type="text" v-model="names">
      <input type="text" v-model="names">
      <div class="result">{{ names }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      names: []
    };
  },
  computed: {

      now_1: function() {
        return new Date();
      }

  },
  methods:{
    now_2() {
      console.log(this);
      return new Date();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
