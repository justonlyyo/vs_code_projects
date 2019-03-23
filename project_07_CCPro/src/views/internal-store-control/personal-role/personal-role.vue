<template>
  <div class="personalRole">
    <div class="tree" >
      <div class="serialNumber" style="color: black ;background: #eeeeee">集团 : <span>001</span></div>
      <div class="content">
        <div class="control">
          <el-tree
            :data="personal_list"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
            >
             <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id">{{data.name}}</span>

                 </span>
          </el-tree>
        </div>
      </div>

    </div>

    <div class="router">
      <router-view :hotel_id="hotel_id"></router-view>
      <div class="ini"><logon-view></logon-view></div>
    </div>

  </div>
</template>

<script>
  let id = 1000;
    export default {
        name: "personal-role",
      data() {
        const data = [{

          id: 1,
          label: '内控店控',
          children: [{
            id: 2,
            label: '组织机构管理'
          }, {
            id: 3,
            label: '权限管理'
          },
            {
              id: 4,
              label: '薪资管理'
            }
          ]
        }];


        return {
          api:'http://47.98.113.173:9519',
          activeName2: 'first',
          data4: JSON.parse(JSON.stringify(data)),
          data5: JSON.parse(JSON.stringify(data)),
          authorization_token:'',//token
          personal_list:[],//获取后台传递的酒店数据
          hotel_id:'',//所选择的酒店id；

        };
      },
      created(){
        let that=this;
        that.hotel();

      },
      methods: {

        //封装获取酒店的信息
        hotel(){
          let that=this;
          that.$axios({
            "url": ""+that.api+"/v1/common/dept/get_tree",
            "method": "get",
            // "headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                that.personal_list=res.data.data;
                // that.bit= res.data.data.list[0].id
                // that.hotel();
                that.hotel_id=res.data.data[0].id

              }
              else{
                that.error(res.data.message);
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

        //树形控件的点击
        handleNodeClick(data){
          if(data.id=="" && data.hotel_id==""){
            this.hotel_id= this.personal_list[0].id
          }
          else  if(data.id && !data.hotel_id){
            this.hotel_id=data.id;

          }else if(data.id && data.hotel_id){
            this.hotel_id=data.hotel_id;

          }
        },

        //动态获取authorization
        authorization() {
          let that=this;
          //&hotel_id=&hotel_group_id=3
          this.$axios.get(""+that.api+"/v1/common/employee/create_token?user_id=1&user_name=super_root",
          )
            .then(res=>{
              if (res.data.message=="success"){

                // console.log(res.data.authorization);
                that.authorization_token= that.authorization_token === ""? res.data.authorization: that.authorization_token;
                that.new_authorization(res.data.message)
                that.hotel();
              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })
        },
        //如果认证错误
        new_authorization(msg){
          let that=this;
          if(msg==="authorization invalid"){
            that.authorization()
          }
        },


        handleClick(tab, event) {
          // console.log(tab, event);
        },
        append(data) {
          // const newChild = { id: id++, label: '哈哈', children: [] };
          // if (!data.children) {
          //   this.$set(data, 'children', []);
          // }
          // data.children.push(newChild);
          console.log(1);
        },

        remove(node, data) {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
        },


      }
    }
</script>

<style  lang="less"  scoped>

  .personalRole{
    width: 100%;
    /*height: 100%;*/
    height: calc(100% - 60px);

    /*min-width: 1900px;*/
    .tree{
      width: 15%;
      /*min-height: 1000px;*/
      /*background:rgba(247,247,247,1);*/
      float: left;
      .serialNumber{
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        padding-left: 20px;
        span{
          margin-left: 20px;
        }
      }

      .content{
        width: 100%;
        height: 100% ;
        /*background:rgba(247,247,247,1);*/
        /*overflow-y: scroll;*/
        .control{
          width: 100%;

          p{
            font-size: 26px ;
            background:rgba(247,247,247,1);
            padding-left: 84px;

          }
        }
      }


    }


    .router{
      width:calc(100% - 310px);
      height: 100%;
      background: #eeeeee;
      font-size:20px;
      float: left;
      min-width: 50px;
      /*min-height: 1000px;*/
      white-space:nowrap;
      /*background:rgba(247,247,247,1);*/
      .ini{
        height: 97%;
        position: absolute;
        right: 0;
        top: 30px;
        z-index: 100;

      }
    }


  }
</style>

<style >
  /*.expanded{*/
    /*display: none;*/
  /*}*/

 /*.aa /deep/ .el-checkbox{*/
    /*display: none;*/
  /*}*/

</style>
