<template>
  <div class="personalRole">
    <div class="tree" >
      <router-link to="/organization/basic-info"><div class="serialNumber" style="color: black">机构编号 : <span>001</span></div></router-link>

      <div class="moduleTree"><router-link to="/organizationchart/hotel"><span style="color: black">皇冠精品酒店</span></router-link></div>
      <div class="content">
        <div class="control">

          <router-link to="/organizationchart/sections"><el-tree
            :data="data4"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree></router-link>
          <p >+</p >
        </div>
        <div class="control">
          <el-tree
            :data="data4"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree>
          <p >+</p>
        </div>
        <div class="control">
          <el-tree
            :data="data4"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree>
          <p>+</p>
        </div>
      </div>
      <div class="moduleTree">皇冠精品酒店</div>
      <div class="content">
        <div class="control">
          <el-tree
            :data="data4"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree>
          <p >+</p >
        </div>
        <div class="control">
          <el-tree
            :data="data4"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree>
          <p >+</p>
        </div>
        <div class="control">
          <el-tree
            :data="data4"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree>
          <p>+</p>
        </div>
      </div>
    </div>

    <div class="router">
      <router-view></router-view>
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
          activeName2: 'first',
          data4: JSON.parse(JSON.stringify(data)),
          data5: JSON.parse(JSON.stringify(data))



        };
      },
      methods: {
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

        renderContent(h, { node, data, store }) {
          return (
            <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>);
        }

      }
    }
</script>

<style  lang="less"  scoped>

  .personalRole{
    width: 100%;
    height: 100%;
    /*height: calc(100% - 60px);*/
    overflow: hidden;
    overflow-y: scroll;
    min-width: 1900px;
    .tree{
      min-height: 1000px;
      background:rgba(247,247,247,1);
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
      .moduleTree{
        width:286px;
        height:40px;
        background:rgba(238,238,238,1);
        font-size:16px;
        font-family:Adobe Heiti Std R;
        font-weight:normal;
        color:black;
        line-height:40px;
        margin-left: -15px;
        padding-left: 98px;
      }
      .content{
        width: 100%;
        height: 100% ;
        background:rgba(247,247,247,1);
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
      width:calc(100% - 360px);
      height: 100%;
      font-size:20px;
      float: left;
      min-width: 50px;
      min-height: 1000px;
      white-space:nowrap;
      background:rgba(247,247,247,1);
      .ini{
        height: 100%;
        position: absolute;
        right: 0;
        top: 30px;

      }
    }


  }
</style>

<style >
  .expanded{
    display: none;
  }

  .el-checkbox{
    display: none;
  }

</style>
