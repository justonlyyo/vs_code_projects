<template>
  <div class="role-privileges">
    <div class="paging-title">
      <span style="vertical-align: top">角色 ： </span>
      <el-button type="text" @click="dialogVisible_role = true">
        <img src="../../../../src/assets/images/internal-store-control/add.png" alt="" style="margin-top: 8px">
      </el-button>
      <!--新增角色出现的页面-->
      <el-dialog
        title=""
        :visible.sync="dialogVisible_role"
        width="60%"
        :before-close="handleClose" class="dialog-style">
        <ul class="mask_information">
          <li><span >角色名</span><el-input v-model="name" placeholder="请输入内容" style="width: 217px;"></el-input></li>
          <li>
            <span >角色组</span>
            <el-select v-model="role_group " placeholder="请选择">
              <el-option
                v-for="item in role_set"

                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <span >代码</span><el-input v-model="code " placeholder="请输入内容"  style="width: 217px;"></el-input>
          </li>
          <li><span >酒店</span>
            <el-select v-model="hotel_id" placeholder="请选择">
              <el-option
                v-for="item in hotel_list"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li style="width: 317px;">
            <span>状态：</span>
            <el-radio v-model="normal" label="1">正常</el-radio>
            <el-radio v-model="normal" label="0">停用</el-radio>
          </li>
          <li><span >中文备注</span><el-input v-model="desc"   style="width: 217px;"   placeholder="请输入内容"></el-input></li>
          <li><span >英文备注</span><el-input v-model=" desc_en"  style="width: 217px;"     placeholder="请输入内容"></el-input></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_role = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible_role = false; saveInfo_role()">确 定</el-button>
        </span>
      </el-dialog>
      <!--新增权限出现的页面-->
      <el-dialog
        title=""
        :visible.sync="dialogVisible_rower"
        width="60%"
        :before-close="handleClose" class="dialog-style">
        <ul class="mask_information">
          <li><span >权限名称</span><el-input v-model="name" placeholder="请输入内容"  style="width: 217px;" ></el-input></li>
          <li>
            <span >权限组</span>
            <el-select v-model="rule_groups" placeholder="请选择">
              <el-option
                v-for="item in permission_group"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <span >代码</span><el-input v-model="code " placeholder="请输入内容"   style="width: 217px;" ></el-input>
          </li>
          <li style="width: 400px;">
            <span>状态：</span>
            <el-radio v-model="normal" label="1">正常</el-radio>
            <el-radio v-model="normal" label="0">停用</el-radio>
          </li>
          <li><span >中文备注</span><el-input v-model="desc"    style="width: 217px;"   placeholder="请输入内容"></el-input></li>
          <li><span >英文备注</span><el-input v-model=" desc_en"   style="width: 217px;"     placeholder="请输入内容"></el-input></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_rower = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible_rower = false; saveInfo_rower()">确 定</el-button>
        </span>
      </el-dialog>
      <!--编辑权限出现的页面-->
      <el-dialog
        title="编辑权限"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose" class="dialog-style">
        <!--<span style="display: inline-block;width: 290px;">可选择的权限</span>-->
        <p style="display: inline-block;width: 198px;">编辑权限角色 ：<span style="color:#4488e9"> {{authority}}</span></p>
        <ul class="mask_information" style="overflow: hidden;">
          <!--<el-transfer-->
            <!--v-model="role_checked"-->
            <!--style="float: left"-->
            <!--:props="{key: 'id',label: 'name'}"-->
            <!--:titles="['角色未拥有权限', '角色已添加权限']"-->
            <!--@change="handleChange"-->
            <!--:data="permission_group"-->
          <!--&gt;</el-transfer>-->


<!--bind_list-->


          <tree-transfer :title="title" :from_data='bind_list' :to_data='toData'  :defaultProps="{label:'name'}"
                             @addBtn='add' @removeBtn='remove' :mode='mode' height='400px'  >   
          </tree-transfer>




        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false; ensure()">确 定</el-button>
        </span>
      </el-dialog>
      <!--编辑APi出现的页面-->
      <el-dialog
        title="编辑API"
        :visible.sync="dialogVisibleApi"
        width="60%"
        style="overflow: hidden"
        :before-close="handleClose" class="dialog-style" >
        <!--<span style="display: inline-block;width: 290px;">可选择的API</span>-->
        <p style="display: inline-block;width: 198px;">编辑API权限名称 ：<span style="color:#4488e9"> {{authority}}</span></p>
        <!--<ul>-->
          <!--<li class="permissionName">-->
            <!--<p>权限</p>-->
            <!--&lt;!&ndash;<el-input v-model="permission" placeholder="请输入内容" style="width: 240px;float: left;margin-left: 5px"></el-input>&ndash;&gt;-->
            <!--&lt;!&ndash;<button style="width:42px;height: 38px;margin-left: 5px" @click="searches">搜索</button>&ndash;&gt;-->
            <!--<ul>-->
              <!--<li >-->
                <!--<span style="display: inline-block;width: 150px;">{{authority}}</span>-->
              <!--<el-radio v-model="radio" label="1">选择</el-radio>-->
            <!--</li>-->
              <!--<li>1235</li>-->
            <!--</ul>-->
          <!--</li>-->
          <!--<li class="site">-->
            <!--<p>API</p>-->
            <!--<el-input v-model="site_api" placeholder="请输入内容" style="width: 240px;float: left;margin-left: 5px"></el-input>-->
            <!--<button style="width:42px;height: 38px;margin-left: 5px" @click="searches">搜索</button>-->
            <!--<ul>-->
              <!--<li v-for="(item,index) in api_list" :key="index" ><span style="display: inline-block;width: 150px;">{{item.name}}</span>-->
                <!--<input type="checkbox"  :value="item.id" v-model="checkedNames">-->

                <!--&lt;!&ndash;<el-checkbox v-model="checked"   style="display: inline-block">请选择</el-checkbox>&ndash;&gt;-->
              <!--</li>-->

            <!--</ul>-->
          <!--</li>-->
        <!--</ul>-->
        <ul style="overflow: hidden">

          <el-transfer
            v-model="checkedNames"
            style="float: left"
            :props="{key: 'id',label: 'name'}"
            :titles="['权限未拥有API', '权限已添加API ']"
            @change="handleChange"
            :data="api_list"
          ></el-transfer>

        </ul>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleApi = false ;cancel()">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleApi = false; saveInfo_api()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="paging">
      <!--列表-->
      <el-table
        :data="newlists"
        :header-cell-style="{background:'#68819EFF',color:'white',width:'100%'}"
        height="288px"
        size="mini"
        stripe>
        <el-table-column
          prop="name"
          fixed
          label="角色名">
        </el-table-column>
        <el-table-column
          prop="role_group.name"
          label="角色组">
        </el-table-column>
        <el-table-column
          prop="code"
          label="代码">
        </el-table-column>
        <el-table-column
          prop="status "
          label="状态">
          <!--传过来的值改变格式-->
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">禁用</span>
            <span v-else>可用</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="中文备注">
        </el-table-column>
        <el-table-column
          prop="desc_en"
          label="英文备注">
        </el-table-column>
        <el-table-column
          prop="hotel_id.short_name"
          label="酒店">
        </el-table-column>
        <el-table-column
          prop="address"
          width="240 "
          label="操作"
          fixed="right"
        >
          <template slot-scope="scope"  v-if="scope.row.is_sys===0">
            <el-button @click="cancels(scope.row.id,scope.$index, newlists)"type="danger" size="mini" >删除</el-button>
            <el-button  size="mini" @click="submit(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>
            <el-button   size="mini"  @click="dialogVisible = true;compile_power(scope.row,scope.row.id,scope.$index, newlists) ">编辑权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination style="float: right;"
                     layout="prev, pager, next"
                     :page-size="pagesizes"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>


    <!--权限-->
    <span style="height: 60px;line-height: 70px ; display: inline-block;vertical-align: top" > 权限 ：</span>
    <el-button type="text" @click="dialogVisible_rower = true">
      <img src="../../../../src/assets/images/internal-store-control/add.png" alt="" style="margin-top: 8px">
    </el-button>


    <div class="paging">
      <!--列表-->
      <el-table
        :data="rulelists"
        :header-cell-style="{background:'#68819EFF',color:'white'}"
        style="height: 330px"
        size="mini"
        stripe>
        <el-table-column
          prop="name"
          fixed
          label="权限名称">
        </el-table-column>
        <el-table-column
          prop="rule_group.name"
          label="权限组">
        </el-table-column>
        <el-table-column
          prop="status "
          label="状态">
          <!--传过来的值改变格式-->
          <template slot-scope="scope">
            <span v-if="scope.row.root_id === 0">禁用</span>
            <span v-else>可用</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          width="190"
          label="中文备注">
        </el-table-column>
        <el-table-column
          prop="desc_en"
          label="英文备注">
        </el-table-column>
        <el-table-column
          prop="pages "
          label="关联页面">
        </el-table-column>
        <el-table-column
          width="240"
          prop="address"
          label="操作"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button @click="cance(scope.row.id,scope.$index, rulelists)"type="danger" size="mini">删除</el-button>
            <el-button   size="small" @click="revision(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>
            <el-button   size="small" @click="dialogVisibleApi = true;compile(scope.row,scope.row.id,scope.$index, newlists)" >编辑API</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination style="float: right;"
                     layout="prev, pager, next"
                     :page-size="pagesize"
                     @current-change="permissionPage"
                     :total="power_total">
      </el-pagination>
    </div>

    <!--点击加号出现编辑的页面-->
    <div class="masking" v-show="masking">
      <!--点击角色上的修改弹出的蒙版-->
      <ul class="mask_information" v-show="role">
        <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
        <li><span >角色名</span><el-input v-model="part_name" placeholder="请输入内容"  style="width: 217px;" ></el-input></li>
        <li>
          <span >角色组</span>
          <!--<el-input v-model="name" placeholder="请输入内容" style="width: 300px;"></el-input>-->
          <el-select v-model="role_group" placeholder="请选择">
            <el-option
              v-for="item in role_sets"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li><span >代码</span><el-input v-model="code" placeholder="请输入内容"  style="width: 217px;" ></el-input></li>
        <li><span >状态</span><el-input v-model="status" placeholder="请输入内容" :disabled="true"  style="width: 217px;"></el-input></li>
        <li><span >中文备注</span><el-input v-model="desc"  style="width: 217px;"  placeholder="请输入内容" ></el-input></li>
        <li><span >英文备注</span><el-input v-model="desc_en" placeholder="请输入内容"  style="width: 217px;"></el-input></li>
        <li><span >酒店</span><el-input v-model="hotel_id"   style="width: 217px;"  :disabled="true"  placeholder="请输入内容"></el-input></li>
       <li style="width: 300px;height: 40px" ></li>
        <li style="margin-top:50px;"><button @click="preserve">保存</button> <button @click="abolish">取消</button></li>
      </ul>
      <!--点击权限上的修改弹出的蒙版-->
      <ul class="mask_information" v-show="right_control">
        <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
        <li><span >权限名称</span><el-input v-model="permission_name" placeholder="请输入内容" style="width: 217px;"></el-input></li>
        <li><span >权限组</span>
          <el-select v-model="rule_groups" placeholder="请选择">
            <el-option
              v-for="item in permission_group"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        <li>
          <span >状态</span><el-select v-model="status_bar" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li><span >中文备注</span><el-input v-model="chinese_name" placeholder="请输入内容"  style="width: 217px;"></el-input></li>
        <li><span >英文备注</span><el-input v-model="english_name" style="width: 217px;"   placeholder="请输入内容"></el-input></li>
        <li><span >关联页面</span><el-input v-model=" associated"   style="width: 217px;":disabled="true"    placeholder="请输入内容"></el-input></li>
        <li style="margin-top:50px;"><button @click="keep">保存</button> <button @click="abolish">取消</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs';
  import treeTransfer from 'el-tree-transfer';
  let id = 1000;
    export default {
        name: "role-privileges",
      props:{
        role_set:{type:Array,required:true},
        permission_group:{type:Array,required:true}
      },
      data(){
        return{
        title:["角色未拥有权限","角色已添加权限"],



          mode: "transfer", // transfer addressList
          options: [{
            value: '0',
            name: '禁用'
          }, {
            value: '1',
            name: '可用'
          }],
          url_api:'http://47.98.113.173:9519',
          value: '',
          normal:"1",//新增角色的状态
          radio:'1',//单选
          pagesizes:4,//代表角色每页的条数
          pagesize:5, //代表每页显示的条数
          total:0,//代表总条数
          power_total:0,//代表全部权限总条数
          dialogVisible: false,//编辑权限显示隐藏
          dialogVisibleApi:false,//编辑API显示隐藏
          dialogVisible_role:false,//新增角色的显示隐藏
          dialogVisible_rower:false,//新增权限显示隐藏
          id:'',//修改此项的id 传给后台
          authorization_token:'',//获取token值
          newlists:[],//角色组
          rulelists:[],//权限组
          bind_list:[],//权限组树形
          masking:false,//蒙版层
          // 蒙版里的角色信息
          part_name:'',////角色名
          role_group:'',//角色组
          roles_id:'',//传给后台的所选择的角色组id
          code:'',//代码
          status:'',//状态
          desc:'',//中文备注
          desc_en:'',//英文备注
          hotel_id:'',//酒店
          grogshop_id:'',//点击修改后传给后台的酒店id
          right_control:false,//点击权限的修改显示和隐藏
          role:false,//点击角色的修改显示和隐藏
          role_sets:[],//接受后台返回的角色组渲染蒙版层里的角色组
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
        //  蒙版里的权限信息
          permission_name:'',//权限名称
          api:'',//API
          status_bar:'',//状态
          chinese_name:'',//中文备注
          english_name:'',//英文备注
          associated:'',//关联页面
          permission_name_id:'',//权限修改传给后台的id
          /*
          * 新增角色上用到的
          * */
          hotel_list:[],



        /*
        * 新增角色里的内容
        * */
          name:'',//角色名
          // role_group:'',//角色组
          code:'',//代码
          hotel_id:'',//酒店id
          status:'',//状态
          desc:'',//中文备注
          desc_en:'',//英文备注

         /*新增权限*/
          rule_groups:'',//权限组

        //编辑APi
          site_api:'',//api搜索的内容
          checked:false,
          api_list:[],//APi列表
          authority:'',//所选中的权限名
          checkedNames:[],//选中的所有API的id
          toData:[],//选中的所有的权限
          permission_id:'',//选择到的权限的id
          role_id:"",//选择到的角色的id
          direction_tf:"",//判断点击的是left还是right
        }
      },
      created:function () {
        let that=this;
        //获取角色信息列表
        that.part();
        //获取权限列表
        that.power();
        that.hotel()

      },
      components:{ treeTransfer }, // 注册
      methods:{
        handleChange(value, direction, movedKeys) {
          let that = this;
          console.log(value);
          console.log(direction);
          console.log(movedKeys);//发生移动数据的数组
          //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
          if(direction === "right") {
            that.direction_tf="1";

          }
          if(direction === "left") {
            that.direction_tf="2";
          }


      },

        //封装获取酒店的信息
        hotel(){
          let that=this;
          that.$axios({
            "url": ""+that.url_api+"/v1/common/dept/get_tree",
            "method": "get",
            // "headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                that.hotel_list=res.data.data;
                // that.bit= res.data.data.list[0].id
                // that.hotel();
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

        //封装获取角色信息列表
        part(){
          let that=this;
          that.$axios({
            "url": ""+that.url_api+"/v1/common/role/info_list",
            "method": "get",
            // "headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                that.newlists=res.data.data.list;
                that.total=res.data.data.total_count;

              }
              else{
                console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        //封装获取权限列表
        power(){
          let that=this;
         that.$axios({
           "url": ""+that.url_api+"/v1/common/rule/info_list",
           "method": "get",
           // "headers": {"authorization": that.authorization_token}
         })
           .then(res => {
             if (res.data.message=="success"){
               console.log(res.data.data);
               // var resp = res.data.data;
               // var new_lists = resp['list'];
               // var total_count= resp['total_count'];
               that.rulelists=res.data.data.list;
               that.power_total=res.data.data.total_count;
               console.log(that.rulelists)
             }
             else{
               // console.log(resp.data.message);
             }
           })
           .catch(error => {
             console.log(error);
           });
       },

        //封装获取Api
        api_methodes(){
          let that=this;
          that.$axios({
            "url": ""+that.url_api+"/v1/common/api/info_list",

            "method": "get",
            // "headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data.list);

                that.api_list=res.data.data.list;


              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },
        //动态获取authorization
        authorization() {
          let that=this;
          this.$axios.get(""+that.url_api+"/v1/common/employee/create_token?user_id=1&user_name=super_root",
          )
            .then(res=>{
              if (res.data.message=="success"){
                console.log(res.data.authorization);
                that.authorization_token= that.authorization_token === ""? res.data.authorization: that.authorization_token;
                console.log(that.authorization_token);
                that.new_authorization(res.data.message)
                //获取角色信息列表
                that.part();
                //获取权限列表
                that.power();
                that.hotel()
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



        // 监听穿梭框组件添加
        add(fromData,toData,obj){
          // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的 {keys,nodes,halfKeys,halfNodes}对象
          // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
          console.log('toData',toData);
          console.log('obj',obj);

          let that= this;
          that.toData=toData;

        },
        // 监听穿梭框组件移除
        remove(fromData,toData,obj){ 
          // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
          // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
          console.log('fromData',fromData);
          console.log('toData',toData);
          console.log('obj',obj);
          let that = this;
          that.toData=toData;
          that.rolePrivileges();
        },




        //增加权限的显示隐藏
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },


        //封装转换角色组
          role_id_name(flag,data){
          // flag为1的时候code转desc
      for(let i in list){
        if(flag && data==list[i].code){
        return list[i].desc
      }else if(!flag && data==list[i].desc){
        return list[i].code
      }
    }
  },

        /*
        * 点击角色
        * */
        //点击角色分页上的页数
        handleCurrentChange(curPage) {
          let that=this
          console.log(curPage) // 当前页}
          //获取信息列表
          that.$axios({
            "url": ""+that.url_api+"/v1/common/role/info_list",
            "method": "get",
            params:{
              page_num:curPage,
              page_size:that.pagesize
            },
            // "headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.newlists=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },
        //点击角色上的修改弹出蒙版层
        submit(srow,id,index,list){
          this.masking=true;
          this.role=true;
          this.right_control=false;
          this.id=id;
          console.log(srow);
          this.part_name=srow.name;
          this.role_group=srow.role_group.name
          this.code=srow.code;//代码
          //状态
          if(srow.status===0){
            this.status="禁用"
          }else if (srow.status===1){
            this.status="可用"
          }
          this.desc=srow.desc;//中文备注
          this.desc_en=srow.desc_en;//英文备注
          this.hotel_id=srow.hotel_id.short_name;//酒店
          this.grogshop_id=srow.hotel_id.id;//传给后台的酒店id
          this.roles_id=srow.role_group.id;//传给后台的所选择的角色组id
          this.$axios({
            "url": ""+this.url_api+"/v1/common/role_group/info_list",
            "method": "post",
            data:{
              hotel_id:srow.hotel_id.id,
            },
            // "headers": {"authorization": this.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data.list);
                this.role_sets=res.data.data.list

              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });





        },
        //点击角色上的删除
        cancels(id,index,list){
          console.log(id);
          console.log(index);
          console.log(list);
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            list.splice(index, 1);
            this.$axios({
              url:""+this.url_api+"/v1/common/role/remove/"+id,
              method: "post",
              // params:{},
              // data:{},
              //headers: {'authorization': this.authorization_token}
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  this.part();
                  this.masking=false;
                }
                  // location.reload(); // 强制刷新
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


        },
        //点击角色蒙版的保存
        preserve(){
          console.log('保存');
          if ( this.status=="可用"){
            this.status=1
          }else if(this.status=="禁用"){
            this.status=0
          };
          console.log("保存");
          console.log(this.creator)
          this.$axios({
            url:""+this.url_api+"/v1/common/role/update/"+this.id,
            method: "post",
            // params:{},
            data:{
              name:this.part_name,
              code:this.code,
              desc:this.desc,
              desc_en:this.desc_en,
              status:this.status,
              hotel_id:this.grogshop_id,
              role_group:this.role_group,

            },
            //headers: {'authorization': this.authorization_token}
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                // location.reload();  //强制刷新
                this.part();
                this.masking=false;

              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })




        },
        //点击角色新增后的保存
        saveInfo_role(){
          let that=this;
          if(that.normal=="0"){
            that.normal=0
          }else if(that.normal=="1"){
            that.normal=1
          }


          that.$axios({
            "url":  ""+that.url_api+"/v1/common/role/add",
            "method": "post",
            data:{
              name:that.name,//角色名
              role_group:that.role_group,//角色组
              code:that.code,//代码
              hotel_id:that.hotel_id,//酒店id
              status:that.normal,//状态
              desc:that.desc,//中文备注
              desc_en:that.desc_en,//英文备注
            },
            //"headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                // console.log(res);
                that.part();
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },


         /*
         * 点击权限
         * */
         //点击新增权限后的保存
        saveInfo_rower(){
          let that=this;
          if(that.normal=="0"){
            that.normal=0
          }else if(that.normal=="1"){
            that.normal=1
          }
          that.$axios({
            "url": ""+that.url_api+"/v1/common/rule/add",
            "method": "post",
            data:{
              name:that.name,//角色名
              rule_group :that.rule_groups ,//权限组
              code:that.code,//代码
              status:that.normal,//状态
              desc:that.desc,//中文备注
              desc_en:that.desc_en,//英文备注
            },
            // "headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                that.power();
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },

        //点击权限上的修改弹出蒙版层
        revision(srow,id,index,list){
          this.masking=true;
          this.right_control=true;
          this.role=false
          //
          console.log(srow);
          this.permission_name=srow.name;//权限名称
            this.api=srow.url;//API
            this.status_bar=srow.status;//状态
              if(srow.status===0){
                this.status_bar="禁用"
              }else  if(srow.status===1){
                this.status_bar="可用"
              }
              if(srow.rule_group===null){
                this.rule_groups=""
              }else {
                this.rule_groups=srow.rule_group.name
              }
            // this.rule_groups=srow.rule_group.name
            this.permission_name_id=srow.id;//id
            this.chinese_name=srow.desc;//中文备注
            this.english_name=srow.desc_en;//英文备注
            // this.associated=;//关联页面
          console.log(this.permission_name_id);

        },

        //点击权限上的删除
        cance(id,index,list){
          console.log(id);
          console.log(index);
          console.log(list);
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            list.splice(index, 1);
            this.$axios({
              url:""+this.url_api+"/v1/common/rule/remove/"+id,
              method: "post",
              // params:{},
              // data:{},
              //headers: {'authorization': this.authorization_token}
            })
              .then(res=>{
                console.log(res)
                if(res.data.message==="success"){
                  this.power();
                }
                // location.reload(); // 强制刷新
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

        },

        //点击权限上的修改后的保存
        keep(){
          console.log(this.permission_name_id);
          if (this.status_bar=="可用"){
            this.status_bar=1
          }else if(this.status_bar=="禁用"){
            this.status_bar=0
          };

          console.log("保存");
          console.log(this.creator)
          this.$axios({
            url:""+this.url_api+"/v1/common/rule/update/"+this.permission_name_id,
            method: "post",
            // params:{},
            data:{
              name:this.permission_name,
              desc:this.chinese_name,
              desc_en:this.english_name,
              status: this.status_bar,
              url:this.api,
              rule_group:this.rule_groups,


            },
            //headers: {'authorization': this.authorization_token}
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                // location.reload();  //强制刷新
                this.power();
                this.masking=false;
                console.log(this.permission_name);

              }else {
                console.log(res.data.message)
              }

            })
            .catch(error=>{
              console.log(error);
            })

        },





        //点击编辑权限出现的页面
        compile_power(id,index){
          let that = this;
          console.log(id);
          that.toData=[];
          that.authority=id.name;
          that.role_id=id.id;
         that.rolePrivileges();//获取所有权限
         that.role_referrer();//查询角色已有权限

        },

        //封装获取角色权限--树形格式
        rolePrivileges(){
          let that = this;
          that.$axios({
            url: ""+that.url_api+"/v1/common/rule_group/get_tree",
            method: "get",
            //headers: {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                that.bind_list=res.data.data;
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
    //查看角色已有的权限
        role_referrer(){
          let that = this;
          console.log(that.role_id);
          that.$axios({
            url: ""+that.url_api+"/v1/common/role/get_tree",
            method: "post",
            data:{
              role_id:that.role_id,
            },
            //headers: {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                that.toData=res.data.data;
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        },

        //点击编辑权限后的保存
        ensure(){
          console.log(this.role_id);
          let that=this;
          //传给后台两个值
          //1：所点击的角色的id   that.role_id
          //2：所选中的权限组    that.role_checked
         that.toData.forEach(item =>{
            console.log(item.id)
          });
            that.$axios({
              url: ""+that.url_api+"/v1/common/role/bind_rule",
              method: "post",
              data:{
                role_id:that.role_id,//所点击的id
                rules:JSON.stringify(that.toData),//选中的api
              },
              //headers: {"authorization": that.authorization_token,}
            })
              .then(res => {
                if (res.data.message=="success"){
                  console.log(res.data);
                }
                else{
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });



        },

















        //点击API出现的页面
        compile(id,index){
          console.log(id);
          let that= this;
          that.checkedNames=[];
         that.authority=id.name;
         that.permission_id=id.id;
         // console.log( that.permission_id)
         that.api_methodes();
         that. bind_api();

        },


        //封装获得已有的api

        bind_api(){
          let that = this;
          that.$axios({
            url: ""+that.url_api+"/v1/common/api/info_list",
            method: "post",
            data:{
              rule_id:that.permission_id,
            },
            //headers: {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data);
                // 遍历拿到所需要API
                res.data.data.list.forEach(item =>{
                  that.checkedNames.push(item.id)
                });
              }
              else{
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },


        //点击编辑Api后到的保存
        saveInfo_api(){
          console.log(this.checkedNames);
          let that=this;
            that.$axios({
              url: ""+that.url_api+"/v1/common/rule/bind_api",
              method: "post",
                data:{
                rule_id:that.permission_id,//所点击的id
                apis:JSON.stringify(that.checkedNames),//选中的api
          },
              //headers: {"authorization": that.authorization_token,}
            })
              .then(res => {
                if (res.data.message=="success"){
                  console.log(res.data);
                  that.checkedNames=[];
                }
                else{
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });

        },

        //api里的api搜索
        searches(){
          let that=this;
          that.$axios({
            url: ""+that.url_api+"/v1/common/api/info_list",
            method: "post",
            data:{
              name:that.site_api,
            },
            //headers: {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res.data.data);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.api_list=res.data.data.list;
                console.log(that.rulelists)
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },

        //权限分页
        permissionPage(page){
          let that=this
          console.log(page) // 当前页}
          //获取信息列表
          that.$axios({
            "url": ""+that.url_api+"/v1/common/rule/info_list",
            "method": "get",
            params:{
              page_num:page,
              page_size:that.pagesize
            },
            // "headers": {"authorization": that.authorization_token}
          })
            .then(res => {
              if (res.data.message=="success"){
                console.log(res);
                // var resp = res.data.data;
                // var new_lists = resp['list'];
                // var total_count= resp['total_count'];
                that.rulelists=res.data.data.list
              }
              else{
                // console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

        },


    //点击取消
        cancel(){
          let that=this;
          that.permission="";
          that. power();
        },

        //点击蒙版的取消
        abolish(){
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
      },

    }
</script>

<style lang="less" scoped>
  .role-privileges{
   width:calc(100% - 100px);
    margin-left: 32px;

    .paging-title{
      width: 100%;
      height: 42px;
      line-height:68px;
      margin-bottom: 20px;
       div{
         display: inline-block;
         float: right;
         button{
           width:90px;
           height:40px;
           border: none;
           outline: none;
           margin-right: 28px;
           background:rgba(68,136,233,1);
           border-radius:4px;
           color: white;
         }
       }
      .dialog-style{
        .mask_information{
          overflow: hidden;
          li{
            float: left;
            margin-right: 10%;
            height: 60px;
            span{
              display: inline-block;
              width: 100px;
              text-align:left ;

            }
          }
        }
      }
      .dialog-api{
        ul{
          width: 660px;
         overflow: hidden;
          .permissionName{
            width: 300px;
            height: 400px;
            /*background: forestgreen;*/
            border: 1px solid #CCCCCC;
           float: left;
            margin-left: 30px;
            p{
              width: 298px;
              height: 40px;
              text-align: center;
              line-height: 40px;
              background: #CCCCCC;
            }
            ul{
              width: 292px;
              height: 287px;
              overflow: hidden;
              overflow-y: scroll;
              li{
                width: 292px;
                height: 30px;
                float: left;
                border-bottom: 1px solid #eeeeee;
                line-height: 30px;
                padding-left: 20px;

              }
            }
          }
          .site{
            width: 300px;
            height: 400px;
            /*background: forestgreen;*/
            border: 1px solid #CCCCCC;
             float: left;
            margin-left: 30px;
            p{
              width: 300px;
              height: 40px;
              text-align: center;
              line-height: 40px;
              background: #CCCCCC;
            }
            ul{
              width: 292px;
              height: 287px;
              overflow: hidden;
              overflow-y: scroll;
              li{
                width: 292px;
                height: 30px;
                float: left;
                border-bottom: 1px solid #eeeeee;
                line-height: 30px;
                padding-left: 20px;

              }
            }
          }
        }
      }

    }
    .paging{
      width: 100%;
      /*margin-top: 20px;*/
      overflow: hidden;
      background:rgba(255,255,255,1);

      .title{
        width: 100%;
        height: 40px;
        background: #68819EFF;
        /*margin: 0 104px  0  24px;*/
        margin-right: 104px;
        line-height: 40px;
        display: flex;

        /*min-width: 1140px;*/
        li{
          /*width: 100% ;*/
          font-size:14px;
          font-family:Adobe Heiti Std R;
          font-weight:normal;
          color:rgba(255,255,255,1);
          flex-grow: 1;
          margin-left: 20px; ;
        }
      }
      .amend ,.save{
        width: 100%;
        height: 44px;
        line-height: 44px;
        /*background:rgba(247,247,247,1);*/
        border-bottom: 1px solid #EDEDED;
        margin-bottom: 7px;
        position: relative;
        /*min-width: 1200px;*/
        input{
          width:101.7px;
          background:rgba(247,247,247,1);
          /*border: none;*/
          outline:none;
          text-align: center;
        }
        div{
          position: absolute;
          top: 0px;
          right: 0;
          span{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(104,129,158,1);
          }
        }
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
        li{
          width: 45%;
          display: inline-block;
          margin-left: 30px;
          margin-top: 20px;
          float: left;
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
<style>
  .el-pagination{
    float: right;
  }
  .el-table .cell{
    text-align:center;
  }
  /*.el-input {*/
    /*width: 300px;*/
  /*}*/
  .el-dialog__footer{
    text-align: left;
  }
  .el-dialog__body {
    padding: 0px 20px;

  }
</style>
