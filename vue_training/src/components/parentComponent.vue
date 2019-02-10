<template>
    <div class=parent>
        <ChildComponent @send_name="listen_child" :msg="message" :now="now" title="i am parent">
            <p slot="bottom">我在子组件中, 我在上面</p>
            <p slot="top">我在子组件中, 我在下面</p>
        </ChildComponent>
        <div class=show_child_msg>{{info}}</div>
    </div>
</template>

<script>
import ChildComponent from "@/components/childComponent"

export default {
    name: "ParentComponent",
    data(){
        return {
            now: new Date(),
            message: "success",
            info: "",
        };
    },
    components: {
        ChildComponent
    },
    methods: {
        listen_child(data){
            console.info(data);
            this.info = data;
        }
    }
}
</script>

<style scoped>

</style>

