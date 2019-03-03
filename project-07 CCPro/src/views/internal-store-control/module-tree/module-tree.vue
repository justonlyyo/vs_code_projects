<template>
  <div class="module">
    <div class="tree" >
      <el-tabs type="border-card" >
        <el-tab-pane label="模块筛选" class="screen"  >
          <p class="celerity">快速筛选</p>
         <div class="search">
           <el-input v-model="input" placeholder="请输入模块名称" style="width: 260px"></el-input>
          <button @click="seek">查找</button>
        </div>
          <div class="genre" style="margin-bottom: 10px">
            <span>模块种类:</span>
            <el-select v-model="modulization" placeholder="请选择">
              <el-option
                v-for="item in kinds"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="genre" >
            <span>模块类型:</span>
            <el-select v-model="value1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="moduleTree">模块树</div>
           <div class="content">
             <div class="control"  >
               <el-tree
                 :data="module_list"
                 show-checkbox
                 node-key="node.id"
                 :expand-on-click-node="false"
                 node-contextmenu
                 @node-click="handleNodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id">{{data.name}}</span>
                    <span style="margin-left: 50px ;" v-show="setpro">
                      <i class="el-icon-edit" style="margin-right: 30px " @click="() => amend(node, data)" ></i>
                      <i class="el-icon-delete" @click="() => remove(node, data)" style="margin-right: 30px "></i>
                      <i class="el-icon-circle-plus" @click="() => append(data)" style="margin-right: 30px "></i>
                    </span>
                 </span>
               </el-tree>
               <p @click="masking_true" >+</p >
             </div>
           </div>
        </el-tab-pane>
        <el-tab-pane label="批量操作">
          <p style="width: 364px;">批量操作</p>
        </el-tab-pane>
      </el-tabs>
    </div>
   <div class="router">
     <child ref="mychild" :label="dataLabel"   v-bind:authorization_token="authorization_token" :newlists="newlists" :total="total" >
     </child>
     <div class="ini"><logon-view></logon-view></div>
   </div>
    <!--点击加号出现编辑的页面-->
    <div class="masking" v-show="masking">

      <ul class="mask_information">
        <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
        <li><span >模块名称</span><el-input v-model="name" placeholder="请输入内容" style="width: 300px;"></el-input></li>
        <li><span >英文描述</span><el-input v-model="desc_en" placeholder="请输入内容" style="width: 300px;"></el-input></li>
        <li><span >模块代码</span><el-input v-model="code" placeholder="请输入内容"  @blur="unfocused('code', code)" style="width: 300px;"></el-input></li>
        <li>
          <span >模块种类</span>
          <el-input v-model="root_id"  style="width: 300px;"  :disabled="true" ></el-input>
        <li>
          <span >模块类型</span>
          <el-select v-model="has_entry" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
        <li><span >链接</span><el-input v-model="url" placeholder="请输入内容" @blur="unfocused('url', url)" style="width: 300px;"></el-input></li>
        <li v-show="bbb">
          <span >父级模块</span>
          <el-select v-model="parent_id" placeholder="请选择">
            <el-option
              v-for="item in parents"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </li>
        <li v-show="aaa"><span >父级模块</span><el-input v-model="parent_id"   style="width: 300px;"  :disabled="true" ></el-input></li>
        <li><span >版本号</span><el-input v-model="input" placeholder="1.0" style="width: 300px;"  :disabled="true" ></el-input></li>
        <li style="margin-top:50px;" v-show="save_add"><button @click="save">保存</button> <button @click="cancel">取消</button></li>
        <li style="margin-top:50px;" v-show="save_childen"><button @click="conserve">保存</button> <button @click="cancel">取消</button></li>
        <li style="margin-top:50px;" v-show="save_preserve "><button @click="preserve ">保存</button> <button @click="cancel">取消</button></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import Child from './module-information';
  let id = 1000;
  export default {
        name: "module-tree",
        components: {
           Child
        },
        data() {
            const data = [{

            }];
            return {
              activeName2: 'first',
              codes: [],
              urls: [],
              data4: JSON.parse(JSON.stringify(data)),
              data5: JSON.parse(JSON.stringify(data)),
              input:'',//搜索内容
              value:'',
              value1:'',
              //模块类型
              options: [{
                value:'1',
                label: '有登陆入口'
              }, {
                value: '0',
                label: '无登陆入口'
              }],
              parents: [{
                value:'1',
                label: '有登陆入口'
              }, {
                value: '0',
                label: '无登陆入口'
              }],
              kinds:[],//接收后台返回的模块种类
              modulization:'',//选择的模块种类
              index:data,
              dataLabel:"",
              module_list:[],
              total:0,//代表获取的总数目
              masking:false,//蒙版显示和隐藏,
            // 蒙版里的信息
              name:'',//模块名称
              desc_en:'',//英文描述
              code:'',//代码
              root_id:'',//模块种类
              has_entry:'',//模块类型
              url:'',//链接
              creator:'',//创建人
              create_time:'',//创建时间
              last_time:'',//修改时间
              parent_id:'',//父级模块
              authorization_token:'', //获取的token
              newlists:[],//接受后端传过来的数据
              setpro:false,//模块树上的图标显示和隐藏
              save_add:false,//点击加号显示的保存和取消
              save_childen:false,//点击自身图标显示的保存和取消
              save_preserve:false,//点击修改显示的保存和取消
              id:"",//修改的id
              aaa:false,
              bbb:true
            };
          },
        created: function () {
          console.log(this.kinds);
          let that=this;
                //执行获取token值
                   var test_1 = function(){
                  console.log("authorization success");
                };
                //执行获取token值的函数
                    this.authorization(test_1);
                //延迟获取列表/*如不延迟   token值获取不到的时候就开始请求会报错*/
                   setTimeout(function () {
                  //获取信息列表
                  that.$axios({
                    "url": "/api/v1/common/module/info_list",
                    "method": "get",
                    "headers": {"authorization": that.authorization_token}
                  })
                    .then(res => {
                    if (res.data.message=="success"){
                      console.log(res.data);
                      // var resp = res.data.data;
                      // var new_lists = resp['list'];
                      // var total_count= resp['total_count'];
                      that.newlists=res.data.data.list;
                      that.total=res.data.data.total_count;
                    }
                    else{
                      // console.log(resp.data.message);
                    }
                  })
                    .catch(error => {
                      console.log(error);
                    });

                  //获取树形结构数据
                  that.$axios({
                    url: "/api/v1/common/module/get_tree",
                    method: "get",
                    headers: {"authorization": that.authorization_token}
                  })
                    .then(res=>{
                      if (res.data.message=="success"){
                         console.log(res.data)
                        that.module_list=res.data.data;
                        console.log(that.module_list);
                      }
                      else{
                        console.log(res.data.message);
                      }

                      // that.newlists=res.data.data
                    })
                    .catch(error=>{
                      console.log(error);
                    });


                //  获取模块种类  模块类型
                     that.$axios({
                       url: "/api/v1/common/module/root_list",
                       method: "get",
                       headers: {"authorization": that.authorization_token}
                     })
                       .then(res=>{
                         if (res.data.message=="success"){
                           console.log(res.data.data)
                           that.kinds=res.data.data
                         }
                         else{
                           console.log(res.data.message);
                         }

                         // that.newlists=res.data.data
                       })
                       .catch(error=>{
                         console.log(error);
                       });

                },1000)
              },
        methods: {
            // 检查去重
                check_repeat(field, keyword){
              // console.log(this.urls.indexOf(keyword));
              // field 字段名
              //keyworld 输入值
              // 关键词
              if(field === "url"){
                if(this.urls.indexOf(keyword)==-1){
                  // alert("bu重复")
                }else {
                  alert("输入内容已存在，请检查后重新输入")
                }
              }
              else if(field === "code"){
                if(this.codes.indexOf(keyword)==-1){
                  // alert("bu重复")
                }else {
                  alert("输入内容已存在，请检查后重新输入")
                }
              }
              else{
                //
              }
            },
            //动态获取authorization
               authorization() {
              let that=this;
              this.$axios.get('/api/v1/common/employee/create_token?user_id=1&user_name=super_root&hotel_id=2&hotel_group_id=3',
               )
                .then(res=>{
                  if (res.data.message=="success"){
                    console.log(res.data.authorization);
                    that.authorization_token= that.authorization_token === ""? res.data.authorization: that.authorization_token;
                    console.log(that.authorization_token);
                    that.new_authorization(res.data.message)
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
           //全局查找
                seek(){
                  if (this.has_entry=="有登陆入口"){
                    this.has_entry=0
                  }else {
                    this.has_entry=1
                  }
                  //发送查找内容给后台  查找
                  this.$axios({
                    url: "/api/v1/common/module/info_list",
                    method: "post",
                    data:{
                      keyword:this.input,
                      root_id:this.modulization,
                      has_entry:this.has_entry
                    },
                    headers: {"authorization": this.authorization_token}
                  })
                    .then(res => {
                      if (res.data.message=="success"){
                        console.log(res.data);
                        // var resp = res.data.data;
                        // var new_lists = resp['list'];
                        // var total_count= resp['total_count'];
                        this.newlists=res.data.data.list
                        this.total=res.data.data.total_count
                      }
                      else{
                        // console.log(resp.data.message);
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });

                },

            //点击加号 控制子级路由中的显示隐藏
                clickParent() {
              this.$refs.mychild.parentHandleclick();
            },
            //点击树形控件的节点
                 handleNodeClick( data,e){
                    this.$refs.mychild.handleClick();
                   this.dataLabel=data.label;
                   this.setpro=true
            },
            //点击蒙版里的取消
                 cancel(){
                this.masking=false
                this.name='',
                this.desc_en='',
                this.code='',
                this.root_id='',
                this.has_entry='',
                this.url='',
                this.creator='',
                this.create_time='',
                this.last_time='',
                this.parent_id=''

            },
            //点击加号显示蒙版
                 masking_true:function(){
                    this.masking=true
                    this.save_add=true
                    this.save_childen=false
                   this.aaa=true;
                    this.bbb=false;
                     this.$axios({
                     url:`/api/v1/common/module/parents`,
                     method: "post",
                     // params:{},
                     // data:{
                     //   item_id:data.id,
                     //
                     // },
                     headers: {'authorization': this.authorization_token}
                   })
                     .then(res=>{
                       if(res.data.message==="success"){
                         console.log(res)
                         this.parents=res.data.data.parents;
                         this.codes =res.data.data.codes;
                         this.urls =res.data.data.urls;
                         console.log(res.data.data.parents)

                         console.log(res.data.data.root);
                         this.root_id=res.data.data.root.name
                       }else {
                         console.log(res.data.message)
                       }

                     })
                     .catch(error=>{
                       console.log(error);
                     })
            },

            //点击加号显示的保存以后向后台发送数据
                 save(){
              console.log("保存");
              if (this.has_entry=="有登陆入口"){
                this.has_entry=0
              }else {
                this.has_entry=1
              }
              // console.log(this.has_entry)
              this.$axios.post('/api/v1/common/module/add',
                {
                  name:this.name,
                  desc_en:this.desc_en,
                  code:this.code,
                  root_id:this.root_id,
                  has_entry:this.has_entry,
                  url:this.url,
                  creator:this.creator,
                  // create_time:this.create_time,
                  // last_time:this.last_time,
                  parent_id:this.parent_id

              },
                {
                headers: {
                'authorization': this.authorization_token,

              }})
                .then(res=>{
                  if(res.data.message==="success"){
                    this.$axios.get('/api/v1/common/module/info_list',
                      {
                        headers: {
                          'authorization': this.authorization_token,
                        }})
                      .then(res=>{
                        console.log(res.data.data.list);
                        this.newlists=res.data.data.list
                        if(res.data.message==="success"){
                          this.masking=false
                        }

                      })
                      .catch(error=>{
                        console.log(error);
                      })
                  }else {
                     console.log(res.data.message)
                  }

                })
                .catch(error=>{
                  console.log(error);
                })

                   //获取树形结构数据
                   this.$axios({
                     url: "/api/v1/common/module/get_tree",
                     method: "post",
                    data:{
                      name:this.name,
                      desc_en:this.desc_en,
                      code:this.code,
                      root_id:this.root_id,
                      has_entry:this.has_entry,
                      url:this.url,
                      creator:this.creator,
                      // create_time:this.create_time,
                      // last_time:this.last_time,
                      parent_id:this.parent_id
                    },
                     headers: {"authorization": this.authorization_token}
                   })
                     .then(res=>{
                       if (res.data.message=="success"){
                          console.log(res.data.data)
                        this.module_list=res.data.data;
                        //  console.log(this.module_list);

                       }
                       else{
                         console.log(res.data.message);
                       }

                       // that.newlists=res.data.data
                     })
                     .catch(error=>{
                       console.log(error);
                     })

                 },

            //点击自身显示的添加  保存向后台发送数据
                conserve(){
                  if (this.has_entry=="有登陆入口"){
                    this.has_entry=0
                  }else {
                    this.has_entry=1
                  }
                  console.log("保存");
                  console.log(this);
                  console.log(this.parent_id);
                  this.$axios.post('/api/v1/common/module/add',
                    {
                      name:this.name,
                      desc_en:this.desc_en,
                      code:this.code,
                      // root_id:this.root_id,
                      has_entry:this.has_entry,
                      url:this.url,
                      creator:this.creator,
                      // create_time:this.create_time,
                      // last_time:this.last_time,
                      parent_id:this.parent_id

                    },
                    {
                      headers: {
                        'authorization': this.authorization_token,

                      }})
                    .then(res=>{
                      console.log(res.data);
                      if(res.data.message==="success"){
                        console.log(this.name)
                        this.$axios.get('/api/v1/common/module/info_list',
                          {
                            headers: {
                              'authorization': this.authorization_token,
                            }})
                          .then(res=>{
                            console.log(res.data);
                            if(res.data.message==="success"){
                              this.masking=false;
                              this.newlists=res.data.data.list
                              // const newChild = { id: this.newlists.id, label: this.newlists.name, children: [] };
                              // if (!this.newlists.children) {
                              //   this.$set(data, 'children', []);
                              // }
                              // this.newlists.children.push(newChild);
                              console.log(this.newlists);
                            }

                          })
                          .catch(error=>{
                            console.log(error);
                          });
                        //获取树形结构数据
                        this.$axios({
                          url: "/api/v1/common/module/get_tree",
                          method: "get",
                          headers: {"authorization": this.authorization_token}
                        })
                          .then(res=>{
                            if (res.data.message=="success"){
                              this.module_list=res.data.data;
                              console.log(res.data.data);
                            }
                            else{
                              console.log(res.data.message);
                            }

                          })
                          .catch(error=>{
                            console.log(error);
                          })
                      }else {
                        console.log(res.data.message)
                      }

                    })
                    .catch(error=>{
                      console.log(error);
                    })
              },

            //当添加信息里的模块代码，链接 失焦事件
                unfocused(field, keyword){
                    this.check_repeat(field, keyword);
                  },

            //element 树状组件自带的方法
                handleClick(tab, event) {
              // console.log(tab, event);
            },

            //点击树状图上的添加
                append(data) {
                  this.masking=true;
                  this.save_childen=true;
                  this.save_add=false;
                  this.save_preserve=false;
                  this.bbb=true;
                  this.aaa=false;
                  console.log(data);
                  // console.log(data.data.id);
                  this.$axios({
                    url:`/api/v1/common/module/parents`,
                    method: "post",
                    // params:{},
                    data:{
                      item_id:data.id,

                    },
                    headers: {'authorization': this.authorization_token}
                  })
                    .then(res=>{
                      if(res.data.message==="success"){
                        this.parents=res.data.data.parents;
                        this.codes =res.data.data.codes;
                        this.urls =res.data.data.urls;
                        console.log(res.data.data.parents)

                        console.log(res.data.data.root);
                        this.root_id=res.data.data.root.name
                      }else {
                        console.log(res.data.message)
                      }

                    })
                    .catch(error=>{
                      console.log(error);
                    })
                  const newChild = { id: data.id, label: data.label, children: [] };
                  if (!data.children) {
                    console.log(1111);
                    this.$set(data, 'children', []);
                  }
                  data.children.push(newChild);

            },
            //树状图上的删除
                remove(node, data) {
                  const parent = node.parent;
                  const children = parent.data.children || parent.data;
                  const index = children.findIndex(d => d.id === data.id);
                  let id=data.id;
                  console.log(id)
                  console.log(children);
                  if (node.childNodes==""){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                      children.splice(index, 1);
                      console.log(this.authorization_token);
                      this.$axios({
                        url:`/api/v1/common/module/remove/${id}`,
                        method: "post",
                        // params:{},
                        // data:{},
                        headers: {'authorization': this.authorization_token}
                      })
                        .then(res=>{
                         console.log(res.data.message)
                          if (res.data.message=="success"){
                            //获取信息列表
                            this.$axios({
                              "url": "/api/v1/common/module/info_list",
                              "method": "get",
                              "headers": {"authorization": this.authorization_token}
                            })
                              .then(res => {
                                if (res.data.message=="success"){
                                  console.log(res.data.data.list);
                                  // var resp = res.data.data;
                                  // var new_lists = resp['list'];
                                  // var total_count= resp['total_count'];
                                  this.newlists=res.data.data.list
                                }
                                else{
                                  // console.log(resp.data.message);
                                }
                              })
                              .catch(error => {
                                console.log(error);
                              });






                          }else{
                           console.log(res.data.message)
                          }
                        })
                        .catch(error=>{
                          console.log(error);
                        })


                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });
                    });
                  }else {
                    alert("这是一个父目录，子目录还存在，不能删除")
                  }

                },
            //点击树状图上的修改
                amend(node, data){
                  this.masking=true;
                  this.save_preserve=true;
                  this.save_add=false;
                  this.save_childen=false;
                  this.id=node.data.id;
                  this.aaa=true;
                    this.bbb=false;



                  console.log(node,data);
                  this.name=data.name;
                  if (data.parent_id==""){
                    this.parent_id=node.parent.data.name
                  }else {
                    this.parent_id=node.parent.data.name;
                  }

                },
          //点击树状图上的修改后的保存
                preserve(){
                  if (this.has_entry=="有登录入口"){
                    this.has_entry=1
                  }else if(this.has_entry=="无登录入口"){
                    this.has_entry=0
                  };
                  console.log("保存");
                  console.log(this.creator)
                  this.$axios({
                    url:`/api/v1/common/module/update/${this.id}`,
                    method: "post",
                    // params:{},
                    data:{
                      name:this.name,
                      desc_en:this.desc_en,
                      code:this.code,
                      root_id:this.root_id,
                      has_entry:this.has_entry,
                      url:this.url,
                      creator:this.creator.name,
                      // create_time:this.create_time,
                      // last_time:this.last_time,
                      parent_id:this.parent_id
                    },
                    headers: {'authorization': this.authorization_token}
                  })
                    .then(res=>{
                      console.log(res);
                      if(res.data.message==="success"){
                        location.reload();  //强制刷新
                      }else {
                        console.log(res.data.message)
                      }

                    })
                    .catch(error=>{
                      console.log(error);
                    })
                },

            // renderContent(h, { node, data, store }) {
            //   return (
            //     <span class="custom-tree-node">
            //     <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
            //   <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            //     <span>{node.label}</span>
            //   </span>);
            // }

          }
    }
</script>

<style   lang="less" scoped>
  .module{
    width: 100%;
    height: calc(100% - 60px);
    overflow-y: scroll;
    /*overflow: hidden;*/
    .tree{
      height: 100%;
      width: 400px;
      float: left;
      .screen{
        height: 100%;
        .celerity{
          /*width:414px;*/
          height:40px;
          background:rgba(238,238,238,1);
          margin-left: -16px;
          line-height: 40px;
          padding-left: 20px;
          margin-bottom: 20px;
          color: #777777;
          font-size: 16px;
        }
        .search{
          height: 40px;
          overflow: hidden;
          position: relative;
          margin-bottom: 20px;
          button{
            width: 50px;
            height: 38px;
            line-height: 38px;
            border-radius: 4px;
            border: none;
            text-align: center;
            position: absolute;
            top: 0;
            right:30px;
            background:rgba(68,136,233,1);
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            outline: none;

          }
        }
        .genre{
          position: relative;
          input{
            height: 28px;
            outline: none;

          }
          button{
            width: 41px;
            height: 28px;
            position: absolute;
            top: 0;
            right: 14px;
          }
        }
        .moduleTree{
          /*width:414px;*/
          height:40px;
          background:rgba(238,238,238,1);
          font-size:16px;
          font-family:Adobe Heiti Std R;
          font-weight:normal;
          color:rgba(119,119,119,1);
          line-height:40px;
          margin-left: -15px;
          margin-top: 14px;
          padding-left: 20px;
        }
        .content{
          width: 100%;
          height: 100% ;
          /*background:rgba(247,247,247,1);*/
          /*overflow-y: scroll;*/
          .control{
            width: 100%;

            p{
              width: 105%;
              font-size: 26px ;
              background:rgba(247,247,247,1);
              padding-left: 84px;
             margin-left: -15px;
            }
          }
        }
      }

    }

    /*子路由*/
    .router{
      width:calc(100% - 420px);
      /*height: 100%;*/
      /*background: red;*/
      font-size:20px;
      float: left;
      min-width: 50px;
      white-space:nowrap;
      .ini{
        height: calc(100% - 30px);
        position: absolute;
        right: 0;
        top: 30px;

      }
    }

    /*蒙版层*/
    .masking{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 13, 32, 0.3);
      z-index: 1000;
      .mask_information{
        width: 70%;
        height: 70%;
        background: white;
        margin: 7% auto;
        position: relative;
        /*.hint{*/
          /*width:300px;*/
          /*height: 150px;*/
         /*position: absolute;*/
          /*top: 40%;*/
          /*left: 36%;*/
          /*z-index: 100;*/
          /*background:dodgerblue;*/
          /*border-radius: 4px;*/
          /*text-align: center;*/
          /*line-height:150px;*/
          /*color: white;*/
          /*font-size: 20px;*/
        /*}*/
        li{
         width: 45%;
          display: inline-block;
          margin-left: 30px;
          margin-top: 20px;
          span{
            width: 100px;
            display: inline-block;
            text-align: left;

          }
          button{
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background:rgba(68,136,233,1);
            color: white;
            border: none;
            border-radius:4px ;
            outline: none;
            margin-left: 20px;
          }
        }

      }
    }
  }

</style>
<style >
  /*.expanded{*/
    /*display: none;*/
  /*}*/

  .el-checkbox{
    display: none;
  }
.el-input{
  width: 300px;
}
  .el-tree-node.is-expanded>.el-tree-node__children{
    margin-left:20px;
  }
</style>
