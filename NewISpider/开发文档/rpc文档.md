#rpc文档

-----

## 简单示范

一般来说,rpc的远程调用可以分三部分执行.

* 获取一个rpc的客户端实例.
* 执行远程调用函数.
* 关闭rpc客户端

example:

```python
from rpc_client import get_client

client = get_client()  # 获取一个rpc的客户端实例.
mes = client.hello()   # 执行远程调用函数
print(mes)
client.close()         # 关闭客户端
```

有些远程调用的函数或者与类,内部封装了rpc的客户. 调用的时候无需自行创建和关闭客户端.这样的函数和类,我们会标注上**depend client(客户端依赖)**为False.

### 提醒

对于原生的rpc函数,如果此函数具有多个参数的话.建议
推荐的写法是

```python
result = func(arg1, arg2)           # good
```

不推荐的写法是

```python
result = func(arg1=aeg1, arg2=arg2)  # bad
```

对于这样的函数,标注为 **native rpc**为True进行提醒.更多的情况下,我们会把原生的rpc函数进行本地化包装,再交给使用者调用.这样的函数.我们会标注为**native rpc: False**.后者的情况比较普遍.

## rpc 函数和类列表

### get_client

获取rpc客户端.

* type(类型): function
* depend client(客户端依赖): No
* native rpc(原生rpc函数): No
* arguments(参数): No
* return(返回): zerprpc.Client的实例(rpc客户端)

example

```python
from rpc_client import get_client

client = get_client()  
```

### RPC

* type(类型): class
* depend client(客户端依赖): No
* native rpc(原生rpc函数): No
* arguments(参数): No
* return(返回): zerprpc.Client的实例(rpc客户端)

远程调用基础类.目前主要提供的服务是:

* 提供authorization验证服务(鉴权服务)
* 接口请求日志(透明)
* 注册API接口

#### 方法说明

##### before(req)

类方法,用于记录请求和鉴权

参数:

req: flask的request对象

行为:

1. 记录请求体信息.
2. 根据请求体的头部的authorization和请求体的path路径,判断此请求是否合法.
3. 返回一个RPC的实例.如果用户的请求合法,那么这个实例的if判断就是True,并且携带用户信息字典和下一个可用的authorization.否则这个实例的if判断就是False.

返回:

字典格式对象.携带如下三类信息:

* **message**: str类型,鉴权结果, success表示鉴权成功,否则携带错误消息返回.
* **new_authorization**: str类型,仅在鉴权成功时返回,是下一个可用的authorization.
* **user_info**: dict类型,里面包含用户的身份信息(uuser_id/用户id, hotel_id酒店id,hotel_group_id/集团id)

##### after(response, to_json)

实例方法.用于记录请求的结果.

参数:

response: 视图(将要)返回的结果,可以是dict或者json格式化后的dict
to_json: 布尔值 ,默认True,返回的结果是否进行json序列化?

行为:

* 将视图的将要返回的结果记录下来.
* 在返回体中加入new_authorization字段.
* 返回加入new_authorization字段.返回体.

返回:

字典格式对象.携带如下三类信息:

* **message**: str类型,鉴权结果, success表示鉴权成功,否则携带错误消息返回.
* **new_authorization**: str类型,仅在鉴权成功时返回,是下一个可用的authorization.
* **data**: dict类型,里面包含视图返回的数据.此data不是必须的.由视图的实际返回结果确定

##### reg_api(url, name, desc, forece)

类方法.用于注册api

参数:

url: str类型,注册的api的url.全局唯一.
name: str,注册的api的名字,必须
desc: str, 备注.非必须
forece: boolean, 是否强制覆盖已存在的数据? 默认是False,如果你要修改一个已注册的api的name或者desc,请把此参数设置为True

行为:

* 将api的url注册到数据库

返回:

字典格式对象.携带如下三类信息:

* **message**: str类型,注册结果, success表示鉴权成功,否则携带错误消息返回.

#### 实例

本例的使用说明以flask框架为例子.django的实例请以任京发布的django版本为准.

一个原始的视图模型:

```python
from flask import Flask
from flask import request
import json
from module import User

app = Flask(__name__)

@app.route("/user/view")
def view_user():
    user_id = request.args.get("user_id",None)
    user_info = User.find_by_id(user_id=user_id)  # 查询用户信息的字典
    mes = {"message": "success"}
    mes['data'] = user_info
    return json.dumps(mes)

if __name__ == "__main__":
    app.run()

```

给这个视图**加上身份验证和日志记录功能**

```python
from flask import Flask
from flask import request
import json
from module import User
from rpc_client import RPC

app = Flask(__name__)

@app.route("/user/view")
def view_user():
    checked = RPC.before(request)  # 检查请求权限,记录请求参数
    if checked:
        user_id = request.args.get("user_id",None)
        user_info = User.find_by_id(user_id=user_id)  # 查询用户信息的字典
        mes = {"message": "success"}
        mes['data'] = user_info
        mes = checked.after(mes)   # 记录请求的结果并返回response
    else:
        mes = checked  # 鉴权不通过的请求直接鉴权结果就好了.
    return json.dumps(mes)

RPC.reg_api(url="/user/view", name="查看单个用户信息", desc="提交用户id,查看对应的用户信息")

if __name__ == "__main__":
    app.run()

```

提醒:

> api必须注册方可使用鉴权服务,否则在此api对应的视图函数上调用RPC.before(request)会始终返回失败