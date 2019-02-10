<template>
    <div class=child>
        {{ title }}
        <!-- <p>{{now}}</p>
        <p>{{msg}}</p> -->
        <input type=text v-model="name"><button @click="to_parent">传递给父组件</button>
        <slot class=top></slot>
        <slot class=bottom></slot>
    </div>
</template>

<script>
export default {
    name: "ChildComponent",
    data (){
        return {
            name: "dfd",
        };
    },
    props: {
        title: {
            type: String,
            default: "100",
            required: true
        },
    },
    methods: {
        to_parent (event){
            console.log(this.name);
            this.$emit("send_name", this.name);
        }
    }
}
</script>

<style scoped>

</style>