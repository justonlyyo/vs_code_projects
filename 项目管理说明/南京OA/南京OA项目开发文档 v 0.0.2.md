# 南京OA项目开发文档

南京OA项目已在2019-1-4 和客户签署开发合同.现对开发需求重新整理后.作出的新的详细设计和开发计划.

## 关键资料

* 用户信息字段表 用于记录用户的字段
* 组织架构表  记录企业组织架构. 总公司,分公司, 部门, 管理关系等信息
* 企业职权/职务表  记录企业员工之间领导和被领导额关系
* 公告的格式(如果有) 格式类似: 标题. 正文, 图片, word/文档, 发布时间,发布者等 可
* 会议通知的格式(如果有) 格式类似: 会议主题. 与会人员, 主要议题, 图片, word/文档,会议时间等
* 知识库的关键字段.
* 材料库字段 材料名称, 规格, 计量单位, 价格, 备注(指导价/采购价)
* 指标库需要的哪些字段? 有个照片就行了.
* 人力资源档案除了常规的基本资料外,还会记录哪些内容? (行业相关信息?) 职称信息? 获取职称的年份? 职称证书图片?....
* 造价项目的第二步"项目分配".提到需要将"唐总同意的内容截图作为凭证附件附在流程表后". 如果电脑上的截的同意界面的图的话,系统只需要记录唐总的审批状态就好了. 无需截图. 所以想问问这个操作该怎么理解?

## 系统设计

采用前后端分离设计. 后端 SpringBoot+MySQL.
后端权限管理Shiro
前端VUE2框架
前后端使用Ajax进行通讯.
前后端身份验证采用JWT.

## 一般性约定

* 字符集**utf-8**
* 接口的返回都是json格式.
* 一般情况下,返回json格式的{"message": "success"}标识请求成功,否则返回{"message": "错误原因"},如果返回的响应中有其他数据,请自行约定.

接口url的约定尽量遵循RESTFUL标准.做到望文生义.
常见的url格式为: /资源大类/资源小类(可选)/动词.
下面举例说明:
比如我们定义项目资源的根路径为/project,项目资源又分2子类型.cost(造价)和agent(代理)
每种子类型资源可以进行以下6种操作: view(查看), update(更新/编辑), delete(删除), paging_view(分页查看), batch_update(批量更新/编辑), batch_delete(批量删除).那么可以组织的url如下:

* /project/cost/view   查看造价项目的信息(可能需要参数)
* /project/cost/update   修改造价项目的信息(可能需要参数)
* /project/cost/delete   删除造价项目的信息(可能需要参数)
* /project/agent/view   查看代理项目的信息(可能需要参数)
* /project/agent/update   修改代理项目的信息(可能需要参数)
* /project/agent/delete   删除代理项目的信息(可能需要参数)
* ....
* /project/paging_view   分页查看所有项目的信息(可能需要参数)

## 身份验证约定

身份验证采用JWT实现.业务逻辑如下:

1. 客户端登录,提交用户名和密码(post方法)到服务端
2. 服务端检查账户和密码是否正确?
3. 如果用户提交的身份和密码错误,返回出错信息.

    ```javascript
    return {"message": "用户名或密码错误"}
    ```

4. 如果用户提交的身份和密码,则生成一条用户登录记录.用户登录记录至少包含以下字段:

    ```java
    public class LoginRecord{
        String token;  // 登录id.只要能保证唯一即可.其加密后的字符串作为载荷的一部分放入客户端请求头(x-auth)中.
        String userId;  // 外键, 用户id,类型同用户表的id
        Int expire;  // 到期时间,单位秒.默认应该是7200
        Date loginTime;  // 登录时间
    }
    ```

   添加登录记录用,将记录中的token使用jwt打包后(打包方法详见下面的使用**jwt加密登录信息)返回给客户端 {"message": "success", "x-auth": x-auth}

## 模块划分

* 日常工作

  * **公告系统**.接受系统消息.包括: 公告, 会议.
  * 知识库 任何人都可提交. 需要审核. 关键字:标题, 说明, 分类,标签, 文档(图片/文件)
  * **待办事宜**.包括: 工作计划, 会议提醒,领导分配的这几大类型.代办事宜有提醒功能(发送到app).代办事宜有上下级权限关系.

* 个人中心

  * **个人资料**修改,查看.
  * **我的业绩** 以表格形式展示年度业绩,可以翻页

* 行政管理

  * **物品领用**  申请软件狗, 烟酒, 办公用品. 物品后台可添加.包括名称. 规格,说明. 申请需要审批.
  * **行政合同**(非项目合同)  添加/修改/删除/查询/过滤
  * **人力资源管理**  人事档案的添加, 修改,删除,晋升.需要有晋升提醒.
  * **制度管理** 公司制度的添加, 删除,修改, 发布. 制度的有审核流程.审核后才可以发布.
  * **固定资产管理** 固定资产的档案管理. 固定资产的档案包括: 固定资产编号, 固定资产的基本信息, 使用部门/人, 保管人,责任人, 已使用时间, 使用年限, 折旧情况等.管理人员可以分类的查看固定资产的档案.进行相应的操作.
  * **原件,印章管理** 企业在业务运作的过程中,经常会发生.需要借阅/借用原件或者印章的情况.而原件/印章往往都是独此一件.在频繁的借用和流转的过程中.如果进行跟踪和管理是本部分的核心任务.用户可以在页面/App上提出对原件/印章的借用申请.在操作的时候,用户可以查看到物品是否已被借出,对于未被借出的物品.用户在填写借用目的, 预计借出日期和预计归还日期后即可提交借出申请了;对于已被借出的物品,系统则会显示最早的预计归还时间.以便用户评估是排队申请还是选择其他办法.管理员人可以查看,评估借用申请.决定是同意借出或是拒绝借出.根据公司实际的业务情况.管理人员也可以调整物品借用的优先级以满足业务需要.物品必须归还后方可继续借出.不得在借用人之间流转.

* 财务管理

  * **项目结算**, 又分为**对外结算,对内结算**.在设计的时候采用2个页面也可以.

    > * 查询项目 查询条件,过滤条件,(项目可以是造价项目也可以是代理项目)
    > * 分单项目结算表和多项汇总表(针对某公司)针对单个项目, 针对公司, 汇总改公司名下得全部项目得结算信息.
    > * 项目收费标准会在项目登记步骤中注明,
    > * 收费标准也可以后来补上.
    > * 收费标准可以手动填写和依赖公式生成.
    > * 项目结算必须有已收回款项的数额.

  * **公司财务**, 又分为**财务流水账和开票**.在设计的时候采用2个页面也可以.

    > * 财务流水账 需要参考一下其他财务流水系统的模式.相对来说这一部分比较简单.仅仅实现一个记账和汇总统计功能.目前具体设计未明确,可以稍后开发.
    > * 开票流程 开票就是开(发)票的一个过程. 过程一般如下: $$\text{开票申请}\rightarrow\text{审核}\rightarrow\text{开票}$$
    > * 开票申请 开票申请需要填写申请资料. 申请资料包含: 申请人id,申请人名字, 部门. 关联的项目id, 关联的项目名字, 关联的项目总额和已经开出的发票的数额.本次申请的开票额度. 备注信息(开票事由),申请时间等.
    > * 开票审核 开票审核的权限后台可以在系统管理中设置.


* 造价咨询

    ```javascript
    // 造价咨询的步骤
    1. 项目登记 办公室 陈晓清 
    2. 项目分配 造价部 戴明洲
    3. 领导批阅 唐总
    4. 填写流程表 办公室 陈晓清
    5. 核对资料清单 造价部&办公室 项目负责人&陈晓清
    6. 项目计划表 造价部&办公室 项目负责人&陈晓清
    7. 项目执行 造价部 项目负责人
    8. 项目初步结果 造价部 项目负责人
    9. 项目会办 造价部&办公室 相关人员
    10. 项目复核 造价部 项目负责人&陈晓清
    11. 项目整改 造价部 审计人员
    12. 项目完成          陈晓清
    13. 用印填写  造价部  项目负责人  
    14. 项目盖章 办公室 陈晓清
    15. 网报 项目部&办公室 项目负责人&茅夏清
    16. 归档 项目部&办公室 项目负责人&陈爱红
    17. 财务收费单据 办公室 项目负责人&陈爱红
    18. 总结  办公室&相关部门 李总

    // 各个步骤所需的文件和字段请查看纸质文件
    ```

    造价项目主要是5类:

  * 概算评审
  * 预算编制 和招标项目 可以选择关联
  * 跟踪审计
  * 结算审核
  * 司法鉴定

* 招标代理 (各个步骤所需的文件和字段请查看纸质文件)

  招标代理有2类:

  * 招标项目 和预算编制可以选择关联
  * 投标项目 和原件管理关联(投标需要原件和其他的投标文件)

  代理项目的要点:

  * (投标的)方案模板.方便用户新建投标文件.
  * 投标和招标都需要过程控制,状态.总结

* 数据中心

  * 指标库
  * 材料库

* 系统管理

  > * 权限管理
  > * 用户管理
  > * 审核流程设定

### 前端部分

前端部分可以参考早前曹至设计的<<宝山生产线条码管理系统>>的后台页面

* http://www.middear.cn:7012/manage/login
* root/Ems@123457

### 司少杰负责部分

* 日常工作
* 个人中心
* 系统管理
* 财务管理
* 数据中心

#### 系统管理

> 开发周期 2019-1-8--2018-1-11

用户管理,权限管理,部门管理,职务管理.需要实现的功能如下(暂定):

* 添加权限组
* 修改权限组
* 删除权限组
* 查看权限信息(单个查询/分页查询)
* 添加用户
* 修改用户
* 删除用户
* 查看用户信息(单个查询/分页查询)
* 添加部门
* 修改部门
* 删除部门
* 查看部门信息(单个查询/分页查询)
* 添加职务
* 修改职务
* 删除职务
* 查看职务信息(单个职务/分页查询)
* 查询单个用户的权限信息

> 接口和功能并非是一对一的关系,可以自由安排和组合. 接口文档请自行完善,格式如下

```markdown
##### 接口名称

接口功能说明(文本描述)

* url:
* methods:
* request args:
* requests example
* return type:
* return args:
* return example
```

##### 权限部分

###### 查看权限

* url: http://127.0.0.1:8080/role/role
* 请求方式: get
* 请求参数: roleName(String,可以为空)
* 返回类型: json
* 返回参数:tbrole(json(roleId(int),roleName(String))),code(int),message(String)

###### 添加权限

* url: http://127.0.0.1:8080/roel/addrole
* 请求方式: GET
* 请求参数: roleId(int[] a),userId(int)
* 请求例子:http://127.0.0.1:8080/role/addrole?userId=2&roleId=1,2,3,4
* 返回类型: json
* 返回参数: code(int),message(String)

###### 修改权限信息

* url: http://127.0.0.1:8080/role/uprole
* 请求方式: GET
* 请求参数: dpName(String),dpId(int),state(int)
* 请求例子: http://127.0.0.1:8080/role/uprole?userId=2&roleId=1,2,3,4&state=0
* 返回类型: json
* 返回参数: code(int),message(String)

###### 删除权限

* url: http://127.0.0.1:8080/role/delrole
* 请求方式: GET
* 请求参数: userId(int),roleId(int[] a)
* 请求例子: http://127.0.0.1:8080/role/delrole?userId=2&roleId=2,3,4
* 返回参数: code(int),message(String)

##### 工作岗位信息

###### 查看岗位信息

* url: http://127.0.0.1:8080/oa/job/jobs
* 请求方式: get
* 请求参数: jobName(String,可以为空)
* 返回类型: json
* 返回参数:tdJob(json(jobId(int),jobName(String))),code(int),message(String)

 
###### 添加岗位信息

* url: http://127.0.0.1:8080/oa/job/addjob
* 请求方式: GET
* 请求参数: jobName(String),userId(int)
* 请求例子:http://127.0.0.1:8080/oa/job/addjob?jobName=修仙经理&userId=1
* 返回类型: json
* 返回参数: code(int),message(String)

###### 修改岗位信息

* url: http://127.0.0.1:8080/oa/job/upjob
* 请求方式: GET
* 请求参数: jobName(String),jobId(int),uId(int)
* 请求例子: http://127.0.0.1:8080/oa/job/upjob?jobName=修仙经理&jobId=6&uId=1
* 返回类型: json
* 返回参数: code(int),message(String)

###### 删除岗位

* url: http://127.0.0.1:8080/oa/job/deljob
* 请求方式: GET
* 请求参数: jobId(int),uId(int)
* 请求例子: http://127.0.0.1:8080/oa/job/deljob?jobId=6&uId=1
* 返回参数: code(int),message(String)

##### 部门信息

###### 查看部门

* url: http://127.0.0.1:8080/oa/dp/dept
* 请求方式: get
* 请求参数: dpName(String,可以为空)
* 返回类型: json
* 返回参数:tdDept(json(dpId(int),dpName(String))),code(int),message(String)

###### 添加部门信息

* url: http://127.0.0.1:8080/oa/dp/addDept?dpName=修仙&userId=1
* 请求方式: GET
* 请求参数: dpName(String),userId(int)
* 请求例子:http://127.0.0.1:8080/oa/dp/addDept?dpName=修仙&userId=1
* 返回类型: json
* 返回参数: code(int),message(String)

###### 修改部门信息

* url: http://127.0.0.1:8080/oa/dp/upDept
* 请求方式: GET
* 请求参数: dpName(String),dpId(int),uId(int)
* 请求例子: http://127.0.0.1:8080/oa/dp/upDept?dpName=修仙aaa&uId=1&dpId=10
* 返回类型: json
* 返回参数: code(int),message(String)

###### 删除部门

* url: http://127.0.0.1:8080/dp/delDept
* 请求方式: GET
* 请求参数: dpId(int),uId(int)
* 请求例子: http://127.0.0.1:8080/oa/dp/delDept?uId=1&dpId=10
* 返回参数: code(int),message(String)

##### 用户中心

###### 查看用户信息

* url: http://127.0.0.1:8080/oa/users/user
* 请求方式: get
* 请求参数: dpName(String,可以为空),jobName(String,可以为空)
* 请求例子:http://127.0.0.1:8080/users/user  或者  http://127.0.0.1:8080/users/user?dpName=策划&jobName=策划(模糊查询专用)
* 返回类型: json
* 返回参数: tbUsers(json(userName(String),loginName(String),pwd(String),userSex(String),userPhone(int),userEmail(String,可以为空),dpId(int),jobId(int),dpName(String),jobName(String))code(int),message(String)

###### 添加用户信息

* url: http://127.0.0.1:8080/users/adduser
* 请求方式: GET
* 请求参数: userName(String),loginName(String),pwd(String),userSex(String),userPhone(int),userEmail(String,可以为空),dpId(int),jobId(int),userId(int)
* 请求例子: http://127.0.0.1:8080/oa/users/adduser?userName=李小璐&loginName=lilu&pwd=123&userSex=女&userPhone=1233213213&userEmail=12222@123.com&dpId=2&jobId=2&userId=1
* 返回参数: code(int),message(String)

###### 修改用户信息

* url: http://127.0.0.1:8080/users/upuser
* 请求方式: GET
* 请求参数: userName(String),pwd(String),userSex(String),userPhone(int),userEmail(String,可以为空),dpId(int),jobId(int),userId(int),uId(int)
* 请求例子: http://127.0.0.1:8080/oa/users/upuser?userName=李小璐1111&loginName=lilu&pwd=123&userSex=女&userPhone=1233213213&userEmail=12222@123.com&dpId=2&jobId=2&userId=1&uId=1
* 返回类型: json
* 返回参数: code(int),message(String)

###### 删除用户

* url: http://127.0.0.1:8080/oa/users/deluser
* 请求方式: GET
* 请求参数: userId(int),uId(int)
* 请求例子: http://127.0.0.1:8080/oa/users/deluser?uId=1&userId=15
* 返回参数: code(int),message(String)

### 全天龙负责部分

* 行政管理
* 造价咨询
* 招标代理

#### 行政管理

物品领用,行政合同.人力资源管理 需要实现的功能如下:

* 物品添加
* 物品修改
* 物品查询(分页查询/显示)
* 物品领用申请
* (领用)申请审核
* 行政合同添加/删除/修改/分页查询(显示)
* 公司制度得添加/删除/修改/分页查询(显示)和审核流程
* 人事档案的添加, 修改,删除/分页查询(显示)
* 人事有晋升制度.(一定工作年限达到后会升级).需要有晋升提醒.

数据模型

物品

* id
* 名称
* 类别 
* 说明
* 数量
* 状态

物品申请记录

* id
* 申请物品id
* 申请人id
* 申请理由
* 申请批复
* 申请结果
* 审批流程id

行政和同

* id
* 合同名称
* 合同备注
* 合同签署日期
* 关联部门id
* 附件(合同正文的word/pdf文档,图片,可能有多个)

人事档案

* 档案id
* 人名
* 头像
* 性别
* 联系方式
* 电子邮件
* 最高学历
* 学历证书图片(可能有多个)
* 简历文档(附件)
* 荣誉证书
* 荣誉证书图片(可能多个)
* 职称(可能有多个, 需要能以此为条件查询, 职称对应的有证书原件对象)
* 入职时间

人事上的谨慎指的是员工在某一个职称/级别的岗位上,工作年限达到一定级别后,就享有晋升到下一级别的权力.由于是否可以晋升是计算出来的,所以不适合保存在数据库中.而是每次查询信息的时候计算出来的.另外,需要以是否可以晋升或者可晋升到某个职称/级别为条件进行查询.

> 接口和功能并非是一对一的关系,可以自由安排和组合. 接口文档请自行完善,

##### 物品申请

#####分页查询物品
* url: http://localhost:8080/oa/goods/goods
* 请求方式: GET/POST
* 请求参数: pageNum(int,可以为空)，pageSize(int,可以为空)
* 请求例子：http://localhost:8080/oa/goods/goods?pageNum=1&pageSize=3
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string，返回信息),data(object，数据源)
* 返回例子：

  ```javascript
   {
    "code": 200,
    "msg": "success",
    "data": {
        "list": [
            {
                "id": "用户id（int）",
                "name": "物品名（string）",
                "goodstypeId": "分类id（int）",
                "description": "说明（string）",
                "number": 数量（int）,
                "state": "状态（stirng）"，
				 "tbGoodsType": {
                    "id": 类别id（int）,
                    "name": "类别名称（string）"
                }
            }
        ]      
    }
    }
  ```  


##### 修改物品

* url: http://localhost:8080/oa/goods/upgoods
* 请求方式: GET/POST
* 请求参数：
* id（int,物品id，必填），name(string,物品名称,可为空)，
* goodstypeId（int，物品分类id，可为空），number（int，数量，可为空）
* state(string,状态，可为空)，description（string，说明，可为空）
* 请求例子：http://localhost:8080/oa/goods/upgoods?name=物品1水电费&number=6&id=1&goodstypeId=4&description=说明&state=无
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string,返回信息)

##### 添加物品

* url: http://localhost:8080/oa/goods/addgoods
* 请求方式: GET/POST
* 请求参数:
* id（int,物品id，必填），name(string,物品名称,必填)，
* goodstypeId（int，物品分类id，必填），number（int，数量，必填）
* state(string,状态，可为空)，description（string，说明，可为空）
* 请求例子：http://localhost:8080/oa/goods/addgoods?name=物品1&number=3&goodstypeId=6&state=1&description=说明
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string,返回信息)

##### 申请物品

* url: http://localhost:8080/oa/goods/add_Apply_for_goods
* 请求方式: GET/POST
* 请求参数: 
* userId（int，申请人id，必填）,article_id（int，物品的id，必填）
* 请求例子：http://localhost:8080/oa/goods/add_Apply_for_goods?userId=1&goodsId=3
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string,返回信息)


##### 删除物品

* url: http://localhost:8080/oa/goods/delgoods
* 请求方式: GET/POST
* 请求参数:id（int，不能为空）
* 请求例子：http://localhost:8080/oa/goods/delgoods?id=12
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string,返回信息)

##### 分页查询全部合同

* url: http://localhost:8080/oa/contract/contract
* 请求方式: GET/POST
* 请求参数: pageNum(int,可以为空)，pageSize(int,可以为空)
* 请求例子：http://localhost:8080/oa/contract/contract?pageNum=1&pageSize=10
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string，返回信息)，data（object,返回数据）
* 返回例子：``` {
    "code": 200,
    "msg": "success",
    "data": {
        "list": [
            {
                "id": 合同id（int）,
                "name": "合同名（string）",
                "remark": "备注（string）",
                "date": "时间（date）",
                "deptId": 部门id（int）,
                "attachmentUrl": "附件url（string）"
            }
        ]
    }
} ```

##### 删除合同

* url： http://127.0.0.1:8080/oa/contract/delcontract
* 请求方式： GET/POST
* 请求参数： id（int，合同id，必填）
* 请求例子：http://127.0.0.1:8080/oa/contract/delcontract?id=12
* 返回类型：JSON
* 返回参数： code(int,状态码),message(string,返回信息)

##### 添加合同

* url: http://127.0.0.1:8080/oa/contract/addcontract
* 请求方式: GET/POST
* 请求参数: name(string，合同名称，必填)，remark(string，备注，可空)，date（date，部署时间，必填），deptId（int，部门id，必填）,files（file，多个附件提交多个名为files的附件，必填），
* 请求例子：http://127.0.0.1:8080/oa/contract/addContract?name=312&remark=123&date=2017/5/6&deptId=1
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string,返回信息)
  
##### 修改合同

* url: http://127.0.0.1:8080/oa/administrative/contract/edit/editContra
* 请求方式: POST
* 请求参数: 
* id（int，合同id，必填），name（string，合同名，必填），
* remark（int，备注，可空），date（date，部署日期,必填）
* deptId（int，部门id,必填）
* 请求例子：http://127.0.0.1:8080/oa/contract/upcontract?id=22&name=1&remark=1&date=2017/2/5&deptId=2
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string,返回信息)

#### 人事档案模块

##### 分页查询档案全部信息

* url: http://127.0.0.1:8080/oa/archives/archives
* 请求方式: GET
* 请求参数: pageNum(int,可以为空)，pageSize(int,可以为空)
* 请求例子：http://127.0.0.1:8080/oa/archives/archives?pageNum=1&pageSize=2
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string，状态信息),data(object,数据源)
* 返回例子：

```javascript
{
    "code": 200,
    "msg": "success",
    "data": {
        "list": [
            {
                "id": 编号（int）,
                "name": "张三(string)",
                "headPortrait": "头像url(string)",
                "sex": 性别（int）,
                "mobile": "手机号（string）",
                "email": "邮箱(string)",
                "diploma": "学历(string)",
                "diplomaPictureUrl": "学历图片url(string)",
                "resumeUrl": "简历url(string)",
                "honorUrl": "荣誉证书url(string)",
                "createDate": 创建时间（date）,
                "rzDate": 入职时间（date）,
                <!-- 职位信息 -->
                "tbStaffOnJobList"：[
                    {
                        "jobId": 1,
                        "tbJobs": [
                            {
                                "jobId": 1,
                                "jobName": "董事长"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

##### 查询人员入职日期到现在距离多少天

* url: http://127.0.0.1:8080/oa/archives/getEmployeeRZDate
* 请求方式: GET/POST
* 请求参数: id(int,用户id)
* 请求例子：http://127.0.0.1:8080/oa/archives/getEmployeeRZDate?id=47
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string，状态信息),data(string,数据源)
* 返回例子：
  ```
    {"code": 200,"msg": "success","data": "707天"}
  ```

###### 删除人事档案

* url： http://127.0.0.1:8080/oa/archives/delarchives
* 请求方式: GET/POST
* 请求参数： id（int，不能为空）
* 请求例子：http://127.0.0.1:8080/oa/archives/delarchives?id=21
* 返回类型：JSON
* 返回参数： code(int,状态码),message(string,返回信息)

##### 添加人事档案

* url: http://127.0.0.1:8080/oa/archives/addarchives
* 请求方式: GET/POST
* 请求参数: 
* name(string，人名，必填)，sex（int，性别，必填）
* mobile（string，手机号，必填），email（String，邮箱，可为空）
* diploma（string，最高学历，必填），rzDate（date，入职时间,写法为yyyy/MM/dd，必填）
* headPortraitFile（file,头像图片，可空），diplomaPictureFiles（file,最高学历证书如果有多个使用相同参数名上传多个图片，可空）
* resumeFile（file,简历，可为空），honorFiles（file,荣誉证书，如果有多个使用相同的文件名上传多个，可以为空）
 
* 请求例子：http://127.0.0.1:8080/oa/archives/addarchives?name=张三&sex=1&mobile=11111111111&diploma=本科&rzDate=2017/02/05&email=23423@qq.com
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string,返回信息)



###### 修改人事档案

* url: http://127.0.0.1:8080/oa/archives/uparchives
* 请求方式: GET/POST
* id（int，人事档案id，必填）name(string，人名，可为空)，sex（int，性别，可为空）
* mobile（string，手机号，可为空），email（String，邮箱，可为空）
* diploma（string，最高学历，可为空），rzDate（date，入职时间,写法为yyyy/MM/dd，可为空）
 
* 请求例子：http://127.0.0.1:8080/oa/archives/uparchives?name=张三&sex=1&mobile=11111111111&diploma=本科&rzDate=2017/02/06&email=131@qq.com&id=47
* 返回类型:JSON
* 返回参数:code(int,状态码),message(string,返回信息)