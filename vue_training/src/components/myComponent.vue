<template>
    <div :class="my_class()">
        Hello 
    </div>
</template>

<script>
export default {
    name: "MyComonent",
    data(){
        return {

        }
    },
    methods: {
        my_class(){
            return "green";
        }
    }
}
</script>

<style scoped>
.green {
    color: green;
}
</style>


