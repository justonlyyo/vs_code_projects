<template>
    <div class=root>
        <input type=text v-model="mes">
        <p>{{mes}}</p>
    </div>
</template>

<script>
export default {
    name: "dataForm",
    data (){
        return {
            mes:"",
        }
    },
    watch: {
        mes(data){
            console.log(data);
        }
    }
}
</script>

<style scoped>

</style>


