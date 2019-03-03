<template>
<div class="organization">
    <div class="tree">
        <router-link to="/organization/basic-info">
            <div class="serialNumber" style="color: black"><span>集团信息:</span>
                <span>{{group}}</span>
                <span style=" font-size:26px; margin-left: 84px;margin-top: 10px;margin-bottom: 20px"  @click="group_add" >+</span>
            </div>

        </router-link>
        <el-select v-model="group" placeholder="请选择集团" clearable>
            <el-option v-for="item in group_list" :key="item.value" :label="item.full_name" value-key="id" :value="item.id">
            </el-option>
        </el-select>
        <div class="btn" style="margin-top: 30px">
            <button @click="group_add" >新增集团</button>
            <button @click="hotel_add">新增酒店</button>
        </div>
        <!--<div class="moduleTree" style="margin-top: 60px"><router-link to="/organizationchart/hotel"><span style="color: black">添加酒店</span></router-link></div>-->
        <div class="content">
            <div class="control">
                <router-link to="/organizationchart/sections">
                    <el-tree :data="data4" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
                    </el-tree>
                </router-link>
            </div>
        </div>

    </div>
    <!--子路由-->
    <div class="router">
        <router-view :group="group"></router-view>
        <div class="ini">
            <logon-view></logon-view>
        </div>
    </div>
    <!--点击集团下的加号 显示的添加蒙版-->
    <div class="masking" v-show="masking">
        <div class="basicInfo">
            <div class="left">
                <div class="message">
                    <p>基本信息</p>

                    <ul>
                        <li>
                            <span>选择集团</span>
                            <el-select v-model="group" placeholder="请选择集团" clearable>
                                <el-option v-for="item in group_list" :key="item.value" :label="item.full_name" value-key="id" :value="item.id">
                                </el-option>
                            </el-select>
                        </li>
                        <li v-show="group_masking"> <span>集团全称：</span>
                            <el-input v-model="full_name " placeholder="请输入内容"></el-input>
                        </li>
                        <li v-show="hotel_masking"> <span>酒店全称：</span>
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </li>
                        <li v-show="group_masking"> <span>集团简称：</span>
                            <el-input v-model="short_name " placeholder="请输入内容"></el-input>
                        </li>
                        <li v-show="hotel_masking"> <span>酒店简称：</span>
                            <el-input v-model="hotel_input" placeholder="请输入内容"></el-input>
                        </li>
                        <li> <span>代码：</span>
                            <el-input v-model="code" placeholder="请输入内容"></el-input>
                        </li>
                        <li style="height: 46px;line-height: 46px">
                            <span>审核状态：</span>
                            <el-radio v-model="radio" label="1">已通过</el-radio>
                            <el-radio v-model="radio" label="2">未通过</el-radio>
                        </li>
                        <li> <span>中文描述：</span>
                            <el-input v-model="desc " placeholder="请输入内容"></el-input>
                        </li>
                        <li> <span>英文描述：</span>
                            <el-input v-model="desc_en " placeholder="请输入内容"></el-input>
                        </li>
                    </ul>

                </div>
                <div class="contact">
                    <p>联系方式</p>
                    <ul>
                        <li> <span>总机：</span>
                            <el-input v-model="office_tel " placeholder="请输入内容"></el-input>
                        </li>
                        <li> <span>国家：</span>
                            <el-input v-model="country_code " placeholder="请输入内容"></el-input>
                        </li>
                        <li> <span>订房电话：</span>
                            <el-input v-model="reserve_tel " placeholder="请输入内容"></el-input>
                        </li>
                        <li> <span>州/省：</span>
                            <el-input v-model="province" placeholder="请输入内容"></el-input>
                        </li>
                        <li> <span>服务电话：</span>
                            <el-input v-model="service_tel" placeholder="请输入内容"></el-input>
                        </li>
                        <li> <span>城市：</span>
                            <el-input v-model="city" placeholder="请输入内容"></el-input>
                        </li>
                        <li> <span>传真：</span>
                            <el-input v-model="fax" placeholder="请输入内容"></el-input>
                        </li>
                        <li style="height: 46px;vertical-align: top">
                            <span style="width: 132px;vertical-align: top;margin-top: 5px">地理位置经纬度：</span>
                            <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 50px;display: inline-block" >东经：</span>
                            <input style="width: 55px;height: 40px; border: 1px solid rgba(204,204,204,1);" v-model="position_east">
                            <span style="font-size: 16px;vertical-align: top;margin-top: 5px;margin-left: 15px;width: 50px;display: inline-block">北纬：</span>
                            <input style="width: 55px;height: 40px; border: 1px solid rgba(204,204,204,1);" v-model="position_west">

              </li>
                        <li style="height: 46px;line-height: 46px">
                            <span>状态：</span>
                            <el-radio v-model="normal" label="1">正常</el-radio>
                            <el-radio v-model="normal" label="2">停用</el-radio>
                        </li>
                        <li> <span>官网：</span>
                            <el-input v-model="web_site " placeholder="请输入内容"></el-input>
                        </li>
                        <li> <span>邮箱：</span>
                            <el-input v-model="email" placeholder="请输入内容"></el-input>
                        </li>
                    </ul>

                </div>
                <div class="phone">
                    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将集团照片拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>
            </div>
            <div class="right">
                <div class="log">
                    <el-upload style="margin-left: 5px;margin-top: 40px" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <i class="el-icon-plus" style="font-size: 16px">上传集团log</i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

                </div>
                <ul class="site">
                    <li>
                        <span>DNS ： </span>
                        <el-input v-model="dns " placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                        <span>邮编 ： </span>
                        <el-input v-model="postal_code" placeholder="请输入内容"></el-input>
                    </li>
                    <li>
                        <span style="vertical-align: top">地址1 ：</span>
                        <textarea style="width: 300px; height: 100px;resize: none" v-model="address_1 "></textarea>
                    </li>
                    <li>
                        <span style="vertical-align: top">地址2 ：</span>
                        <textarea style="width: 300px; height: 100px;resize: none" v-model="address_2 "></textarea>
                    </li>
                </ul>
                <ul class="establish">
                    <!--<li><span>创建人 ： </span><el-input v-model="dns " placeholder="请输入内容"></el-input></li>-->
                    <!--<li><span>创建日期 ： </span><el-input v-model="dns " placeholder="请输入内容"></el-input></li>-->
                    <!--<li><span>修改日期 ： </span><span>2019.2.15</span></li>-->
                    <!--<li><span>修改人 ： </span><span>admin</span></li>-->
                    <li v-show="group_masking">
                        <button @click="save">保存</button>
                        <button style="margin-left: 30px">重置</button>
                        <button style="margin-left: 30px" @click="cancel">取消</button>
                    </li>
                    <li v-show="hotel_masking">
                        <button @click="hold">保存</button>
                        <button style="margin-left: 30px">重置</button>
                        <button style="margin-left: 30px" @click="cancel">取消</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Son from "./basic-info";
import Childen from "./sections";
import HotelSon from "./hotel"
let id = 1000;
export default {
    name: "organization",
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
            son: false,
            hotelson: false,
            childen: false,
            activeName2: 'first',
            data4: JSON.parse(JSON.stringify(data)),
            data5: JSON.parse(JSON.stringify(data)),
            masking: false, //蒙版的显示隐藏
            input: '', //酒店的全称
            hotel_input: '', //酒店的简称
            // checked:'',//状态
            options: [{
                value: '0',
                name: '无登陆入口'
            }, {
                value: '1',
                name: '有登录入口'
            }, ],
            value: '',
            authorization_token: '', //获取token
            group: '', //集团信息的选择框
            hotel_masking: false, //酒店添加的蒙版显示
            group_masking: false, //集团添加的蒙版显示
            group_list: [], //获取后台的集团信息
            group_full_name: '', //集团信息
            id: '', //选取集团信息的id
            //集团蒙版的基本信息
            full_name: '', //集团全称
            short_name: '', //集团简称
            code: '', //代码
            radio: "1", //审核状态
            desc: '', //中文描述
            desc_en: '', //英文描述
            // 集团蒙版的联系方式
            office_tel: '', //总机
            country_code: '', //国家
            reserve_tel: '', //订房电话
            province: '', //州/省
            service_tel: '', //服务电话
            city: '', //城市
            fax: '', //传真
            //地理位置
            position_east: '', // 东经
            position_west: '', // 北纬
            //状态
            normal: '1', //正常
            web_site: '', //官网
            email: '', //邮箱
            photo: '', //集团照片
            log: '', //log
            dns: '', //DNS
            postal_code: '', //邮编
            address_1: '', //地址1
            address_2: '', //地址二
            //创建人
            //创建日期
            //修改日期
            //修改人
            //log里的东西
            dialogImageUrl: '',
            dialogVisible: false,

        };
    },
    created: function () {
        let that = this;
        //执行获取token值
        var test_1 = function () {
            console.log("authorization success");
        };
        //执行获取token值的函数
        this.authorization(test_1);
        setTimeout(function () {
            that.full();
        }, 1000)

    },
    watch: {

    },

    methods: {
        //封装获取集团信息
        full() {
            let that = this;
            that.$axios({
                    "url": "/api/v1/common/hotel_group/info_list",
                    "method": "get",
                    "headers": {
                        "authorization": that.authorization_token
                    }
                })
                .then(res => {
                    let resp = res.data;  // 返回体
                    if (resp.message == "success") {
                        console.log(resp);
                        let payload = resp.data;  // 返回体中的数据(有效载荷)
                        that.group_list = payload.list;
                        let selected_hotel_group = that.group_list[0];  // 被选中的集团
                        if(selected_hotel_group === undefined){
                          console.warn("获取的集团数据为空,无法选择默认集团");
                        }
                        else{
                          that.selected_group = selected_hotel_group.id;      // 被选中的集团id
                          that.selected_group_full_name = selected_hotel_group.full_name;  // 被选中的集团全名
                        }
                    } else {
                        console.log(resp.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //动态获取authorization
        authorization() {
            let that = this;
            //&hotel_id=&hotel_group_id=3
            this.$axios.get('/api/v1/common/employee/create_token?user_id=1&user_name=super_root', )
                .then(res => {
                    if (res.data.message == "success") {
                        console.log(res.data.authorization);
                        that.authorization_token = that.authorization_token === "" ? res.data.authorization : that.authorization_token;
                        that.new_authorization(res.data.message)
                    } else {
                        console.log(res.data.message)
                    }

                })
                .catch(error => {
                    console.log(error);
                })
        },
        //如果认证错误
        new_authorization(msg) {
            let that = this;
            if (msg === "authorization invalid") {
                that.authorization()
            }
        },
        //  点击集团下的加号显示蒙版 添加集团信息
        group_add() {
            this.masking = true;
            this.hotel_masking = false;
            this.group_masking = true;
        },
        //点击集团下的加号显示蒙版后的保存
        save() {
            if (this.radio == "1") {
                this.radio = 1
            } else if (this.radio == "2") {
                this.radio = 0
            }
            if (this.normal == "1") {
                this.normal = 1
            } else if (this.normal == "2") {
                this.normal = 0
            }
            this.$axios({
                    url: `/api/v1/common/hotel_group/add`,
                    method: "post",
                    // params:{},
                    data: {
                        //集团蒙版的基本信息
                        full_name: this.full_name, //集团全称
                        short_name: this.short_name, //集团简称
                        code: this.code, //代码
                        audit: this.radio, //审核状态
                        desc: this.desc, //中文描述
                        desc_en: this.desc_en, //英文描述
                        // 集团蒙版的联系方式
                        office_tel: this.office_tel, //总机
                        country_code: this.country_code, //国家
                        reserve_tel: this.reserve_tel, //订房电话
                        province: this.province, //州/省
                        service_tel: this.service_tel, //服务电话
                        city: this.city, //城市
                        fax: this.fax, //传真
                        position: this.position_west + ',' + this.position_east,
                        //地理位置
                        // position_east:'',// 东经
                        // position_west:'',// 北纬

                        status: this.normal, //状态
                        web_site: this.web_site, //官网
                        email: this.email, //邮箱
                        photo: '', //集团照片
                        log: '', //log
                        dns: this.dns, //DNS
                        postal_code: this.postal_code, //邮编
                        address_1: this.address_1, //地址1
                        address_2: this.address_2, //地址二
                    },
                    headers: {
                        'authorization': this.authorization_token
                    }
                })
                .then(res => {
                    if (res.data.message === "success") {
                        console.log(res);
                        this.masking = false;
                        this.full();
                    } else {
                        console.log(res.data.message)
                    }

                })
                .catch(error => {
                    console.log(error);
                })
        },
        //点击log上传的方法
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;

        },
        //点击log上传的方法结束

        //点击蒙版里的取消
        cancel() {
            this.masking = false;
            //集团蒙版的基本信息
            this.full_name = '', //集团全称
                this.short_name = '', //集团简称
                this.code = '', //代码
                this.radio = "1", //审核状态
                this.desc = '', //中文描述
                this.desc_en = '', //英文描述
                // 集团蒙版的联系方式
                this.office_tel = '', //总机
                this.country_code = '', //国家
                this.reserve_tel = '', //订房电话
                this.province = '', //州/省
                this.service_tel = '', //服务电话
                this.city = '', //城市
                this.fax = '', //传真
                //地理位置
                this.position_east = '', // 东经
                this.position_west = '', // 北纬
                //状态
                this.normal = '1', //正常
                this.web_site = '', //官网
                this.email = '', //邮箱
                this.photo = '', //集团照片
                this.log = '', //log
                this.dns = '', //DNS
                this.postal_code = '', //邮编
                this.address_1 = '', //地址1
                this.address_2 = '' //地址二
        },

        //点击酒店下的加号显示蒙版，添加酒店
        hotel_add() {
            this.masking = true;
            this.hotel_masking = true;
            this.group_masking = false;
            this.group = '', //集团信息的选择框
                //集团蒙版的基本信息
                this.full_name = '', //集团全称
                this.short_name = '', //集团简称
                this.code = '', //代码
                this.desc = '', //中文描述
                this.desc_en = '', //英文描述
                // 集团蒙版的联系方式
                this.office_tel = '', //总机
                this.country_code = '', //国家
                this.reserve_tel = '', //订房电话
                this.province = '', //州/省
                this.service_tel = '', //服务电话
                this.city = '', //城市
                this.fax = '', //传真
                //地理位置
                this.position_east = '', // 东经
                this.position_west = '', // 北纬
                //状态
                this.web_site = '', //官网
                this.email = '', //邮箱
                this.photo = '', //集团照片
                this.postal_code = '', //邮编
                this.address_1 = '', //地址1
                this.address_2 = '', //地址二
                this.full();
        },

        //点击酒店下的加号显示蒙版，添加酒店后的保存
        hold() {
            this.$axios({
                    url: "/api/v1/common/hotel/add",
                    method: "post",
                    data: {
                        //集团蒙版的基本信息
                        full_name: this.input, //酒店全称
                        short_name: this.hotel_input, //酒店简称
                        code: this.code, //代码
                        audit: this.radio, //审核状态
                        desc: this.desc, //中文描述
                        desc_en: this.desc_en, //英文描述
                        // 集团蒙版的联系方式
                        office_tel: this.office_tel, //总机
                        country_code: this.country_code, //国家
                        reserve_tel: this.reserve_tel, //订房电话
                        province: this.province, //州/省
                        service_tel: this.service_tel, //服务电话
                        city: this.city, //城市
                        fax: this.fax, //传真
                        position: this.position_west + ',' + this.position_east,
                        //地理位置
                        // position_east:'',// 东经
                        // position_west:'',// 北纬

                        status: this.normal, //状态
                        web_site: this.web_site, //官网
                        email: this.email, //邮箱
                        photo: '', //集团照片
                        log: '', //log
                        dns: this.dns, //DNS
                        postal_code: this.postal_code, //邮编
                        address_1: this.address_1, //地址1
                        address_2: this.address_2, //地址二
                    },
                    headers: {
                        "authorization": this.authorization_token
                    }
                })
                .then(res => {
                    if (res.data.message == "success") {
                        console.log(res)
                        this.masking = false;
                        //  console.log(this.module_list);

                    } else {
                        console.log(res.data.message);
                    }

                    // that.newlists=res.data.data
                })
                .catch(error => {
                    console.log(error);
                })
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

        renderContent(h, {
            node,
            data,
            store
        }) {
            return ( <
                span class = "custom-tree-node" >
                <
                span > {
                    node.label
                } < /span> <
                /span>);
            }

        }
    }
</script>

<style lang="less" scoped>
.organization {
    width: 100%;
    /*height: 100%;*/
    height: calc(100% - 60px);
    min-width: 1000px;

    .tree {
        height: 100%;
        overflow-y: scroll;
        /*min-height: 1000px;*/
        background: rgba(247, 247, 247, 1);
        float: left;

        .serialNumber {
            height: 60px;
            line-height: 60px;
            font-size: 18px;
            padding-left: 10px;

            span {
                margin-left: 20px;
            }
        }

        .btn {
            button {
                outline: none;
                width: 90px;
                height: 40px;
                background: rgba(68, 136, 233, 1);
                border-radius: 4px;
                color: white;
            }

        }

        .moduleTree {
            width: 286px;
            height: 40px;
            background: rgba(238, 238, 238, 1);
            font-size: 16px;
            font-family: Adobe Heiti Std R;
            font-weight: normal;
            color: black;
            line-height: 40px;
            margin-left: -15px;
            padding-left: 98px;
        }

        .content {
            width: 100%;
            /*height: 100% ;*/
            background: rgba(247, 247, 247, 1);

            /*overflow-y: scroll;*/
            .control {
                width: 100%;

                p {
                    font-size: 26px;
                    background: rgba(247, 247, 247, 1);
                    padding-left: 84px;

                }
            }
        }

    }

    .router {
        width: calc(100% - 390px);
        height: 100%;
        font-size: 20px;
        float: left;
        min-width: 50px;
        /*min-height: 1000px;*/
        white-space: nowrap;
        background: rgba(247, 247, 247, 1);

        .ini {
            height: 97%;
            position: absolute;
            right: 0;
            top: 30px;

        }
    }

    .masking {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 13, 32, 0.3);
        z-index: 9000;

        .basicInfo {
            width: 78%;
            height: 90%;
            background: white;
            margin: 4% 10% 0 10%;

            .left {
                width: 1000px;

                float: left;

                .message {
                    padding-left: 29px;

                    p {
                        width: 80px;
                        font-size: 16px;
                        /*height: 60px;*/
                        /*line-height: 60px;*/
                        margin-top: 16px;
                        margin-bottom: 10px;
                        font-weight: bold;
                    }

                    ul {
                        overflow: hidden;

                        li {
                            float: left;
                            width: 480px;
                            font-size: 16px;
                            margin-bottom: 5px;

                            span {
                                width: 80px;
                                display: inline-block;
                                vertical-align: top;
                            }

                        }
                    }
                }

                .contact {
                    padding-left: 29px;

                    p {
                        font-size: 16px;
                        margin: 10px 0;
                        font-weight: bold;
                    }

                    ul {
                        overflow: hidden;

                        li {
                            float: left;
                            width: 480px;
                            font-size: 16px;
                            margin-bottom: 5px;

                            span {
                                width: 80px;
                                display: inline-block;
                                vertical-align: top;
                            }

                        }
                    }
                }

                .phone {
                    width: 915px;
                    height: 270px;
                    /*line-height: 398px;*/
                    text-align: center;
                    background: white;
                    margin-left: 31px;
                    margin-top: 15px;
                    margin-bottom: 24px;
                    border: 1px solid rgb(204, 204, 204);
                }

            }

            .right {
                float: left;

                .log {
                    width: 227px;
                    height: 227px;
                    background: white;
                    margin-left: 180px;
                    line-height: 227px;
                    text-align: center;
                    margin-bottom: 22px;
                    border: 1px solid rgb(204, 204, 204);
                    margin-top: 50px;

                }

                .site {
                    margin-left: 60px;
                    font-size: 16px;
                    margin-top: 60px;

                    li {
                        margin-bottom: 10px;

                        span {
                            width: 70px;
                            display: inline-block;
                            text-align: left;
                            vertical-align: top;
                        }

                    }
                }

                .establish {
                    margin-left: 132px;
                    margin-top: 100px;
                    font-size: 16px;

                    li {
                        margin-bottom: 22px;

                        button {
                            outline: none;
                            width: 90px;
                            height: 40px;
                            background: rgba(68, 136, 233, 1);
                            border-radius: 4px;
                            color: white;
                        }
                    }
                }
            }
        }
    }

}
</style>
<style>
.expanded {
    display: none;
}

.el-checkbox {
    display: none;
}
</style>
