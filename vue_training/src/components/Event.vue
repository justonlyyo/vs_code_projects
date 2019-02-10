<template>
    <div class="event">
        <h3>{{ title}}</h3>
        <ul>
            <li @click="get_event_info($event)" v-for="(name, index) in names" v-bind:key="index">{{name}}</li>
        </ul>
        <ul>
            <li @click="get_item_info(key)" v-for="(value, key, index) in person" :key="index">
                {{index}}. {{key}}: {{value}}
            </li>
        </ul>
        <div class="line">
            <button @click="push_str(input_str)">添加</button>
        </div>
    </div>
</template>

<script>
export default{
    name: "Events",
    data(){
        return {
            "title": "Hello World!",
            names: ['tom', 'jack', 'mark'],
            person: {"name": "张三", age:12, "job": "worker"},
            input_str: "",
        }
    },
    methods: {
        get_item_info(info){
            console.log(info);
            console.log(this.names);
        },
        get_event_info(event){
            console.log(event);
        },
        push_str(){
            console.log(this);
            this.names.push(this.msg);
        }
    }
}
</script>

<style scoped>
    h3 {
        color: red;
    }
    li:hover {
        cursor: pointer;
    }
</style>